import React from "react";
import { Ship } from "../../types";

export type GameState = {
  setShips: (ships: Ship[]) => void;
  clearShips: () => void;
  getShips: () => Ship[];
};

export const GameContext = React.createContext<GameState>(undefined);
