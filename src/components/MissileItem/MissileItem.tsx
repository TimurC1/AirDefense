import React, { FC } from "react";
import s from "./MissileItem.module.scss";

export type MissileItemProps = {
  left: number;
  bottom: number;
  key: string;
  startTime: number;
  deg: number;
};

const MissileItem: FC<MissileItemProps & { isRocket?: boolean }> = ({
  isRocket = false,
  ...props
}) => {
  const size = isRocket
    ? { width: "5px", height: "30px", background: "black" }
    : { width: "5px", height: "5px", background: "green" };
  return <div className={s.container} style={{ ...size, ...props }} />;
};

export default MissileItem;
