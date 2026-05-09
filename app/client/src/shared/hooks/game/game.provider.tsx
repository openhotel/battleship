import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GameContext } from "./game.context";
import { PlaceShipsComponent } from "modules/place-ships";
import { Ship } from "shared/types";
import { INITIAL_AVAILABLE_SHIPS } from "shared/consts";
import { ulid } from "ulidx";
import { ShipDirection } from "shared/enums";
import { getShipTargetPositions } from "shared/utils";

type GameProps = {
  children: ReactNode;
};

export const GameProvider: React.FunctionComponent<GameProps> = ({
  children,
}) => {
  const [myShips, setMyShips] = useState<Ship[]>([]);
  const [previewShipId, setPreviewShipId] = useState<string>(null);

  const initMyShips = useCallback(() => {
    setMyShips(
      INITIAL_AVAILABLE_SHIPS.map((type, index) => ({
        id: ulid(),
        index,
        direction: ShipDirection.BOTTOM,
        type,
        position: null,
      })),
    );
  }, [setMyShips]);

  const updateMyShip = useCallback(
    (currentShip: Ship) => {
      setMyShips((ships) =>
        ships.map((ship) =>
          ship.id === currentShip.id
            ? {
                ...ship,
                ...currentShip,
              }
            : ship,
        ),
      );
    },
    [setMyShips],
  );

  useEffect(() => {
    initMyShips();
  }, [initMyShips]);

  const lockedPositions = useMemo(
    () =>
      myShips.filter((ship) => ship.position).flatMap(getShipTargetPositions),
    [myShips],
  );

  return (
    <GameContext.Provider
      value={{
        myShips,
        updateMyShip,
        previewShipId,
        setPreviewShipId,
        lockedPositions,
      }}
      children={<PlaceShipsComponent />}
    />
  );
};
