import React from "react";
import s from "./Target.module.scss";
import { BaseBallisticTrajectoryParams } from "../Missile/ballisticTrajectory";

export const TARGET_POSITION: BaseBallisticTrajectoryParams = {
  left: 710,
  bottom: 10,
};

const Target = () => {
  return <div className={s.container} />;
};

export default Target;
