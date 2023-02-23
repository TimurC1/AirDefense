import React, { useEffect, useState } from "react";
import s from "./Field.module.scss";
import Gun from "../Gun";
import Missile, { MissileItemProps, addMissile } from "../Missile";
import { useStopWatch } from "../../hooks/useStopWatch";
import { ballisticTrajectory } from "../Missile/ballisticTrajectory";
import Target from "../Target";
import { createRocket } from "../Missile/createRocket";
import { rectilinearTrajectory } from "../Missile/rectilinearTrajectory";

const KEYDOWN = "keydown";

type FieldParams = {
  missiles: MissileItemProps[];
  rockets: MissileItemProps[];
  deg: number;
  count: number;
  countRocket: number;
  modelTime: number;
};

const msToSec = (time: number) => (time * 1.0) / 1000;
const msToLaunch = (time: number) => Math.floor((time * 1.0) / 10000);

const Field = () => {
  const { time } = useStopWatch();
  const modelTime = msToSec(time);
  const launchTime = msToLaunch(time);

  const onChangeDed = (deg: number) =>
    setField((prevState) => ({
      missiles: prevState.missiles,
      rockets: prevState.rockets,
      deg,
      count: prevState.count,
      countRocket: prevState.countRocket,
      modelTime: prevState.modelTime,
    }));

  const [field, setField] = useState<FieldParams>({
    missiles: [],
    rockets: [
      {
        left: 50,
        startLeft: 50,
        bottom: 610,
        startBottom: 610,
        startTime: modelTime,
        deg: 0,
        key: "0",
      },
    ],
    deg: 0,
    count: 0,
    countRocket: 0,
    modelTime,
  });

  const shoot = (event: KeyboardEvent) => {
    if (event.code == "Space") {
      setField((prevState) => ({
        deg: prevState.deg,
        count: prevState.count + 1,
        countRocket: prevState.countRocket,
        missiles: addMissile({
          deg: prevState.deg,
          count: prevState.count,
          missiles: prevState.missiles,
          startTime: prevState.modelTime,
        }),
        rockets: prevState.rockets,
        modelTime: prevState.modelTime,
      }));
    }
  };

  useEffect(() => {
    document.addEventListener(KEYDOWN, shoot);

    return () => {
      document.removeEventListener(KEYDOWN, shoot);
    };
  }, []);

  useEffect(
    () => setField((prevState) => ({ ...prevState, modelTime })),
    [modelTime]
  );

  useEffect(() => {
    setField((prevState) => ({
      ...prevState,
      countRocket: prevState.countRocket + 1,
      // rockets: createRocket(prevState.rockets, {
      //   count: prevState.countRocket,
      //   startTime: prevState.modelTime,
      //   deg: prevState.deg,
      // }),
      rockets: prevState.rockets,
    }));
    console.log("field.rockets", field.rockets);
  }, [launchTime]);

  useEffect(() => {
    const newMissiles = field.missiles.map((missile) => {
      const newCoords =
        missile.bottom > 0 && missile.left > 0 && missile.left < 1000
          ? ballisticTrajectory({
              time: modelTime - missile.startTime,
              deg: missile.deg,
              left: missile.left,
              bottom: missile.bottom,
            })
          : { left: missile.left, bottom: missile.bottom };

      return { ...missile, ...newCoords };
    });

    const newRockets = field.rockets.map((rocket) => {
      console.log("rocket", rocket);
      const newCoords = rectilinearTrajectory({
        time: modelTime - rocket.startTime,
        rocket,
      });
      return { ...rocket, ...newCoords };
    });

    setField((prevState) => ({
      ...prevState,
      missiles: newMissiles,
      rockets: newRockets,
    }));
  }, [modelTime]);

  return (
    <div className={s.container}>
      <Missile isRocket={true} missiles={field.rockets} />
      <Missile missiles={field.missiles} />
      <Gun deg={field.deg} onChangeDed={onChangeDed} />
      <Target />
    </div>
  );
};

export default Field;
