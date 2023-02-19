import React, { FC } from "react";
import MissileItem, { MissileItemProps } from "../MissileItem";

export type MissileProps = { missiles: MissileItemProps[] };

const Missile: FC<MissileProps & { isRocket?: boolean }> = ({
  isRocket = false,
  missiles,
}) => {
  return (
    <>
      {missiles.map((missile: MissileItemProps) => (
        <MissileItem isRocket={isRocket} {...missile} />
      ))}
    </>
  );
};

export default Missile;
