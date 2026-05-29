import React, { useCallback, useEffect, useState } from "react";
import { PlaceShipsContext } from "./place-ships.context";
import { PlaceShipsComponent } from "modules/place-ships";
import { Ship } from "shared/types";
import { Event, ShipDirection, ShipType } from "shared/enums";
import {
  arePositionsInsidePositions,
  getRandomNumber,
  getShipTargetPositions,
  isAnyPositionOutOfBounds,
} from "shared/utils";
import { useProxy } from "shared/hooks/proxy";

type GameProps = {
  ships: [string, string][];
};

export const PlaceShipsProvider: React.FunctionComponent<GameProps> = ({
  ships,
}) => {
  const { emit } = useProxy();

  const [myShips, setMyShips] = useState<Ship[]>([]);
  const [previewShipId, setPreviewShipId] = useState<string>(null);

  const initMyShips = useCallback(() => {
    setMyShips(
      ships.map(
        ([id, type], index) =>
          ({
            id,
            index,
            direction: ShipDirection.BOTTOM,
            type,
            position: null,
          }) as Ship,
      ),
    );
  }, [setMyShips, ships]);

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

  const setRandomShipPositions = useCallback(() => {
    const list = [];
    for (const ship of myShips) {
      ship.direction = null;
      ship.position = null;
    }
    for (const ship of myShips) {
      const directions = [
        ShipDirection.BOTTOM,
        ShipDirection.LEFT,
        ShipDirection.RIGHT,
        ShipDirection.TOP,
      ];

      const currentShipsPositions = list.flatMap(getShipTargetPositions);

      for (let i = 0; i < 8 * 8 * directions.length; i++) {
        ship.direction = directions[getRandomNumber(0, directions.length - 1)];
        ship.position = {
          x: getRandomNumber(0, 7),
          y: getRandomNumber(0, 7),
        };
        const shipTargetPositions = getShipTargetPositions(ship);

        if (
          !isAnyPositionOutOfBounds(shipTargetPositions) &&
          !arePositionsInsidePositions(
            currentShipsPositions,
            shipTargetPositions,
          )
        )
          break;
      }
      list.push(ship);
    }
    setMyShips(list);
  }, [myShips, setMyShips]);

  const onReady = useCallback(() => {
    emit(Event.READY_PLACING, {
      ships: myShips[0],
    });
  }, [myShips, emit]);

  return (
    <PlaceShipsContext.Provider
      value={{
        myShips,
        updateMyShip,
        previewShipId,
        setPreviewShipId,
        getLockedPositions,
        setRandomShipPositions,
        onReady,
      }}
      children={<PlaceShipsComponent />}
    />
  );
};
