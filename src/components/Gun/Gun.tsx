import React, { useCallback, useEffect, FC, useState } from "react";
import s from "./Gun.module.scss";

const KEYDOWN = "keydown";

const convert = (deg: number) => {
  return {
    transform: `translate(-50%, 0) rotate(${deg}deg)`,
  };
};

type GunProps = { deg: number; onChangeDed(deg: number): void };

const Gun: FC<GunProps> = ({ deg, onChangeDed }) => {
  const [style, setStyle] = useState({
    transform: `translate(-50%, 0) rotate(${deg}deg)`,
  });

  const handle = useCallback(
    (event: KeyboardEvent) => {
      if (event.code == "ArrowRight" && deg < 56) {
        onChangeDed(deg++);
        setStyle(convert(deg));
      }

      if (event.code == "ArrowLeft" && deg > -56) {
        onChangeDed(deg--);
        setStyle(convert(deg));
      }
    },
    [deg]
  );

  useEffect(() => {
    document.addEventListener(KEYDOWN, handle);

    return () => {
      document.removeEventListener(KEYDOWN, handle);
    };
  }, []);

  return (
    <>
      <div className={s.base} />
      <div className={s.barrel} style={style} />
    </>
  );
};

export default Gun;
