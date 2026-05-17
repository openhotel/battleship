export type Match = {
  id: string;
  opponents: [string, string];
};

export type MatchMutable = {
  start: () => void;
  stop: (userId: string) => void;
  getObject: () => Match;
};

export type MatchShip = {
  id: string;
  position?: [number, number];
  direction?: number;
};
