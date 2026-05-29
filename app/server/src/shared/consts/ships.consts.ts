import { ShipType } from "shared/enums/ships.enums.ts";

export const INITIAL_SHIP_TYPES = [
  ShipType.SMALL,
  ShipType.SMALL,
  ShipType.SMALL,
  ShipType.MEDIUM,
  ShipType.MEDIUM,
  ShipType.BIG,
];

export const SHIP_SIZE: Record<ShipType, number> = {
  [ShipType.BIG]: 4,
  [ShipType.MEDIUM]: 3,
  [ShipType.SMALL]: 2,
};
