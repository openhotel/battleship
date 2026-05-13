import React, { useCallback, useMemo, useState } from "react";
import {
  ContainerComponent,
  Cursor,
  EventMode,
  GraphicsComponent,
  GraphicType,
} from "@openhotel/pixi-components";
import { GREEN_COLOR } from "shared/consts";
import { ShipComponent } from "shared/components";
import { usePlaceShips } from "shared/hooks";
import { Ship } from "shared/types";

export const ShipsScreensComponent: React.FC = () => {
  const { myShips, previewShipId, setPreviewShipId } = usePlaceShips();

  const onPointerDownShip = useCallback(
    (ship: Ship) => () => {
      setPreviewShipId(ship.id);
    },
    [setPreviewShipId],
  );

  const renderShips = useMemo(() => {
    return myShips
      .filter((ship) => !ship.position && ship.id !== previewShipId)
      .toSorted((shipA, shipB) => (shipA.index > shipB.index ? 1 : -1))
      .map((ship) => (
        <ShipComponent
          key={ship.id}
          type={ship.type}
          direction={ship.direction}
          // visible={selectedShip !== index}
          onPointerDown={onPointerDownShip(ship)}
          eventMode={EventMode.STATIC}
          cursor={Cursor.GRAB}
          position={{
            x: (ship.index + 1) * 17,
            y: 1 * 17,
          }}
        />
      ));
  }, [myShips, previewShipId]);

  return (
    <ContainerComponent
      position={{
        x: 155,
        y: 14,
      }}
    >
      <GraphicsComponent
        type={GraphicType.RECTANGLE}
        width={133}
        height={133}
        tint={0}
      />
      <GraphicsComponent
        type={GraphicType.RECTANGLE}
        width={131}
        height={131}
        position={{
          x: 1,
          y: 1,
        }}
        tint={GREEN_COLOR}
      />
      <GraphicsComponent
        type={GraphicType.RECTANGLE}
        width={129}
        height={129}
        position={{
          x: 2,
          y: 2,
        }}
        tint={0}
      />
      <ContainerComponent>{renderShips}</ContainerComponent>
    </ContainerComponent>
  );
};
