import { MissileProps } from "./Missile";
import { degreesToRadians } from "../../utils";

type AddMissileParams = {
  deg: number;
  count: number;
  startTime: number;
} & MissileProps;

const DEFAULT_Y = 60;

export const addMissile = ({
  deg,
  missiles,
  count,
  startTime,
}: AddMissileParams) => {
  const isRight = deg > 0;
  const newDeg = deg > 0 ? deg : deg * -1;

  const preXParam = Math.cos(degreesToRadians(90 - newDeg)) * DEFAULT_Y;
  const xParam = isRight ? preXParam + 500 : -preXParam + 500;
  const yParam = Math.cos(degreesToRadians(newDeg)) * DEFAULT_Y;

  return [
    ...missiles,
    {
      left: xParam,
      bottom: yParam,
      key: String(count),
      startTime: startTime,
      deg,
    },
  ];
};
