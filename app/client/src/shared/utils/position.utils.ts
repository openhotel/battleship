import { GRID_SIZE, SHIP_SIZE } from "../consts";
import { ShipDirection } from "../enums";
import { Point } from "@openhotel/pixi-components";
import { Ship } from "../types";

export const getShipTargetPositions = (ship: Ship): Point[] =>
  Array.from({ length: SHIP_SIZE[ship.type] }).map((_, index) => {
    switch (ship.direction) {
      case ShipDirection.BOTTOM:
      case ShipDirection.TOP:
        return {
          ...ship.position,
          y: ship.position.y + index,
        };
      case ShipDirection.LEFT:
      case ShipDirection.RIGHT:
        return {
          ...ship.position,
          x: ship.position.x + index,
        };
    }
  });

export const isAnyPositionOutOfBounds = (positions: Point[]): boolean =>
  positions.some(
    (point) =>
      0 > point.x ||
      0 > point.y ||
      point.x >= GRID_SIZE ||
      point.y >= GRID_SIZE,
  );
