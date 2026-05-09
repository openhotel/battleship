import { ShipDirection } from "../enums";

export const getNextClockwiseDirection = (
  direction: ShipDirection,
): ShipDirection => {
  switch (direction) {
    case ShipDirection.BOTTOM:
      return ShipDirection.LEFT;
    case ShipDirection.LEFT:
      return ShipDirection.TOP;
    case ShipDirection.TOP:
      return ShipDirection.RIGHT;
    case ShipDirection.RIGHT:
      return ShipDirection.BOTTOM;
  }
};
