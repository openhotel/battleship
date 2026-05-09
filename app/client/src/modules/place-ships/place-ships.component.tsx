import React, { useCallback, useMemo } from "react";
import {
  ContainerComponent,
  Cursor,
  EventMode,
  FLEX_JUSTIFY,
  FlexContainerComponent,
  Point,
  useWindow,
} from "@openhotel/pixi-components";
import { GridComponent, ShipComponent, TextComponent } from "shared/components";
import { ShipsScreensComponent } from "./components";
import { useGame } from "shared/hooks";
import {
  getNextClockwiseDirection,
  getShipTargetPositions,
  getTextFirstLetterUpperCase,
  isAnyPositionOutOfBounds,
} from "shared/utils";
import { Ship } from "shared/types";

export const PlaceShipsComponent: React.FC = () => {
  const { getSize } = useWindow();
  const { previewShipId, updateMyShip, myShips, setPreviewShipId } = useGame();

  const onClickPreviewShip = useCallback(
    (ship: Ship) => () => setPreviewShipId(ship.id),
    [setPreviewShipId],
  );

  const renderShips = useMemo(
    () =>
      myShips
        .filter((ship) => ship.position)
        .map((ship) => (
          <ShipComponent
            key={ship.id}
            position={{
              x: ship.position.x * 17,
              y: ship.position.y * 17,
            }}
            type={ship.type}
            direction={ship.direction}
            selected={previewShipId === ship.id}
            eventMode={EventMode.STATIC}
            cursor={Cursor.POINTER}
            onPointerDown={onClickPreviewShip(ship)}
          />
        )),
    [myShips, previewShipId],
  );

  const selectedShip = useMemo(
    () => myShips.find((ship) => ship.id === previewShipId),
    [myShips, previewShipId],
  );

  const selectedShipPlate = useMemo(
    () =>
      selectedShip
        ? selectedShip.id.split("").toReversed().join("").substring(0, 4)
        : null,
    [selectedShip],
  );

  const remainingShipsToPlace = useMemo(
    () => myShips.filter((ship) => !ship.position),
    [myShips],
  );

  const onUnselectedSelectedShip = useCallback(() => {
    setPreviewShipId(null);
  }, [setPreviewShipId]);

  const onClickGrid = useCallback(
    (position: Point) => {
      const targetShip = {
        ...selectedShip,
        position,
      };
      if (isAnyPositionOutOfBounds(getShipTargetPositions(targetShip))) return;

      updateMyShip(targetShip);
    },
    [selectedShip, updateMyShip],
  );

  const onRotateSelectedShip = useCallback(() => {
    const targetShip = {
      ...selectedShip,
      direction: getNextClockwiseDirection(selectedShip.direction),
    };
    if (isAnyPositionOutOfBounds(getShipTargetPositions(targetShip))) return;

    updateMyShip(targetShip);
  }, [selectedShip]);

  return (
    <ContainerComponent>
      <GridComponent
        leftInteractive={Boolean(previewShipId)}
        onClickLeft={onClickGrid}
      />
      <ContainerComponent
        position={{
          x: 6,
          y: 14,
        }}
      >
        {renderShips}
      </ContainerComponent>
      {/*<PlaceShipsScreenComponent />*/}
      <ShipsScreensComponent />
      {/*<ShipsComponent />*/}
      {/*<LifeComponent />*/}
      <ContainerComponent
        position={{
          y: 17 * 8 + 18,
        }}
      >
        {previewShipId ? (
          <>
            <FlexContainerComponent
              justify={FLEX_JUSTIFY.CENTER}
              direction="x"
              size={{ width: 137, height: 10 }}
              position={{
                x: 155,
              }}
            >
              <TextComponent
                text={`${getTextFirstLetterUpperCase(selectedShip.type)} ship [${selectedShipPlate}]`}
              />
            </FlexContainerComponent>
            <FlexContainerComponent
              justify={FLEX_JUSTIFY.SPACE_EVENLY}
              direction="x"
              size={{ width: 137, height: 10 }}
              position={{
                x: 5,
              }}
            >
              {selectedShip.position ? (
                <TextComponent
                  text="Rotate"
                  eventMode={EventMode.STATIC}
                  cursor={Cursor.POINTER}
                  onPointerDown={onRotateSelectedShip}
                />
              ) : null}
              <TextComponent
                text="Done"
                eventMode={EventMode.STATIC}
                cursor={Cursor.POINTER}
                onPointerDown={onUnselectedSelectedShip}
              />
            </FlexContainerComponent>
          </>
        ) : (
          <FlexContainerComponent
            justify={FLEX_JUSTIFY.CENTER}
            direction="x"
            size={{ width: getSize().width, height: 10 }}
          >
            {remainingShipsToPlace.length ? (
              <TextComponent
                text={`Position your (${remainingShipsToPlace.length}) ships`}
              />
            ) : (
              <TextComponent
                text={`Ready to play!`}
                eventMode={EventMode.STATIC}
                cursor={Cursor.POINTER}
              />
            )}
          </FlexContainerComponent>
        )}
      </ContainerComponent>
    </ContainerComponent>
  );
};
