import React from "react";
import { Ship } from "shared/types";

export type GameState = {
  myShips: Ship[];
  updateMyShip: (ship: Partial<Ship>) => void;
  previewShipId: string;
  setPreviewShipId: (id: string) => void;
};

export const GameContext = React.createContext<GameState>(undefined);
