import { ShipType } from "shared/enums";

export const INITIAL_AVAILABLE_SHIPS: ShipType[] = [
  ShipType.BIG,
  ShipType.MEDIUM,
  ShipType.MEDIUM,
  ShipType.SMALL,
  ShipType.SMALL,
  ShipType.SMALL,
];

export const SHIP_SIZE: Record<ShipType, number> = {
  [ShipType.BIG]: 4,
  [ShipType.MEDIUM]: 3,
  [ShipType.SMALL]: 2,
};
