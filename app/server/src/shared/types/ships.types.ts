import { ShipType } from "shared/enums/ships.enums.ts";
import { Point } from "./point.types.ts";

export type Ship = {
  id: string;
  type: ShipType;
  position?: Point;
  direction?: number;
};
