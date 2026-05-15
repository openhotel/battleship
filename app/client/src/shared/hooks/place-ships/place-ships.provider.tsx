import React, { useCallback, useEffect, useState } from "react";
import { PlaceShipsContext } from "./place-ships.context";
import { PlaceShipsComponent } from "modules/place-ships";
import { Ship } from "shared/types";
import { INITIAL_AVAILABLE_SHIPS } from "shared/consts";
import { ulid } from "ulidx";
import { ShipDirection } from "shared/enums";
import { getShipTargetPositions } from "shared/utils";

type GameProps = {};

export const PlaceShipsProvider: React.FunctionComponent<GameProps> = () => {
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

  const getLockedPositions = useCallback(
    (shipId: string) =>
      myShips
        .filter((ship) => ship.id !== shipId && ship.position)
        .flatMap(getShipTargetPositions),
    [myShips],
  );

  const onReady = useCallback(() => {}, []);

  console.log("??");
  return (
    <PlaceShipsContext.Provider
      value={{
        myShips,
        updateMyShip,
        previewShipId,
        setPreviewShipId,
        getLockedPositions,
        onReady,
      }}
      children={<PlaceShipsComponent />}
    />
  );
};
