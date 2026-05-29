import { ShipType } from "shared/enums/ships.enums.ts";

export type Ship = {
  id: string;
  type: ShipType;
  position?: [number, number];
  direction?: number;
};
