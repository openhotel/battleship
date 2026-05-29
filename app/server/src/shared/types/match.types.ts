import { Ship } from "./ships.types.ts";

export type Match = {
  id: string;
  opponents: [string, string];
};

export type MatchMutable = {
  start: () => void;
  stop: (userId?: string) => void;
  getObject: () => Match;
  //if returns false, some ship is placed illegal, so match is over
  setShips: (opponentId: string, ships: Ship[]) => boolean;
};
