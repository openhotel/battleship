import React, { ReactNode, useCallback, useRef } from "react";
import { GameContext } from "./game.context.tsx";
import { Ship } from "../../types";

type GameProps = {
  children: ReactNode;
};

export const GameProvider: React.FunctionComponent<GameProps> = ({
  children,
}) => {
  const shipsRef = useRef<Ship[]>([]);

  const setShips = useCallback((ships: Ship[]) => {
    shipsRef.current = ships;
  }, []);

  const getShips = useCallback(() => shipsRef.current, []);
  const clearShips = useCallback(() => {
    shipsRef.current = []
  }, [])

  return (
    <GameContext.Provider
      value={{
        setShips,
        getShips,
        clearShips,
      }}
      children={children}
    />
  );
};
