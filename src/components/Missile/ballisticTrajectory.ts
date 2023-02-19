import { degreesToRadians } from "../../utils";

export type BaseBallisticTrajectoryParams = {
  left: number;
  bottom: number;
};

export type BallisticTrajectoryParams = {
  time: number;
  deg: number;
} & BaseBallisticTrajectoryParams;

const VELOCITY = 10;
const G = 9.81;

export const ballisticTrajectory = ({
  time,
  deg,
  left,
  bottom,
}: BallisticTrajectoryParams): BaseBallisticTrajectoryParams => {
  console.log("time", time);

  const x = VELOCITY * time * Math.cos(degreesToRadians(90 - deg));
  const y =
    VELOCITY * time * Math.sin(degreesToRadians(90 - deg)) -
    (G * Math.pow(time, 2)) / 2;

  return { left: x + left, bottom: y + bottom };
};
