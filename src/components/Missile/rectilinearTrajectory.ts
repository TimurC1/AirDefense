import { MissileItemProps } from "../MissileItem";

const VELOCITY = 10;

type RectilinearTrajectoryParams = { time: number; rocket: MissileItemProps };

export type BaseRectilinearTrajectoryParams = {
  left: number;
  bottom: number;
};

export const rectilinearTrajectory = ({
  time,
  rocket,
}: RectilinearTrajectoryParams): BaseRectilinearTrajectoryParams => {
  const startLeft = rocket?.startLeft || 0;
  const startBottom = rocket?.startBottom || 0;
  const left = startLeft + VELOCITY * time;
  const bottom = startBottom + VELOCITY * time;

  return { left, bottom };
};
