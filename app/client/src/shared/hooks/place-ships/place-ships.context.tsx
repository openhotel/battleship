import React from "react";
import { Ship } from "shared/types";
import { Point } from "@openhotel/pixi-components";

export type PlaceShipsState = {
  myShips: Ship[];
  updateMyShip: (ship: Partial<Ship>) => void;
  previewShipId: string;
  setPreviewShipId: (id: string) => void;
  getLockedPositions: (ignoreShip: string) => Point[];
  setRandomShipPositions: () => void;
  onReady: () => void;
};

export const PlaceShipsContext =
  React.createContext<PlaceShipsState>(undefined);
