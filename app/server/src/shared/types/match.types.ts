import { Ship } from "./ships.types.ts";

export type Match = {
  id: string;
  opponents: [string, string];
};

export type MatchMutable = {
  start: () => void;
  stop: (userId?: string) => void;
  getObject: () => Match;
  setShips: (opponentId: string, ships: Ship[]) => void;
};
