import { Point } from "@openhotel/pixi-components";
import { ShipDirection, ShipType } from "shared/enums";

export type Ship = {
  id: string;
  index: number;
  position?: Point | null;
  type: ShipType;
  direction: ShipDirection;
};
