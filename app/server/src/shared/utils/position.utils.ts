import { Ship } from "shared/types/ships.types.ts";
import { GRID_SIZE } from "../consts/grid.consts.ts";
import { SHIP_SIZE } from "../consts/ships.consts.ts";
import { Point } from "../types/point.types.ts";
import { ShipDirection } from "../enums/ships.enums.ts";

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

export const arePositionsUnique = (positions: Point[]): boolean => {
  const uniquePositions = new Set(positions.map((p) => `${p.x},${p.y}`));
  return uniquePositions.size === positions.length;
};
