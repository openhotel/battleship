import React from "react";
import { Ship } from "shared/types";
import { Point } from "@openhotel/pixi-components";

export type GameState = {
  myShips: Ship[];
  updateMyShip: (ship: Partial<Ship>) => void;
  previewShipId: string;
  setPreviewShipId: (id: string) => void;
  lockedPositions: Point[];
};

export const GameContext = React.createContext<GameState>(undefined);
