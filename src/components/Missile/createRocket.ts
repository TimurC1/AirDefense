import { MissileItemProps } from "../MissileItem";
import { BaseBallisticTrajectoryParams } from "./ballisticTrajectory";
import { BaseMissileParams } from "./addMissile";

const generateStartPoint = (): BaseBallisticTrajectoryParams => {
  const left = Math.floor(Math.random() * 1000);
  return {
    left,
    bottom: 610,
  };
};

export const createRocket = (
  rockets: MissileItemProps[],
  { count, startTime, deg }: BaseMissileParams
): MissileItemProps[] => {
  const { left, bottom } = generateStartPoint();
  console.log("left", left);
  console.log("bottom", bottom);

  return [
    ...rockets,
    {
      left,
      bottom,
      startLeft: left,
      startBottom: bottom,
      key: String(count),
      startTime: startTime,
      deg,
    },
  ];
};
