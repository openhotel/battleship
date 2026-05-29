import { ShipType } from "shared/enums";

export const SHIP_SIZE: Record<ShipType, number> = {
  [ShipType.BIG]: 4,
  [ShipType.MEDIUM]: 3,
  [ShipType.SMALL]: 2,
};
