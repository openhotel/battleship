import React, { useCallback, useMemo } from "react";
import {
  ContainerComponent,
  FLEX_JUSTIFY,
  FlexContainerComponent,
  Point,
  useWindow,
} from "@openhotel/pixi-components";
import { TextComponent, GridComponent, ShipComponent } from "shared/components";
import { ShipsScreensComponent } from "./components";
import { useGame } from "shared/hooks";

export const PlaceShipsComponent: React.FC = () => {
  const { getSize } = useWindow();
  const { previewShipId, updateMyShip, myShips } = useGame();

  const onClickGrid = useCallback(
    (position: Point) => {
      updateMyShip({
        id: previewShipId,
        position,
      });
    },
    [previewShipId, updateMyShip],
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
          />
        )),
    [myShips],
  );

  return (
    <ContainerComponent>
      <GridComponent leftInteractive={true} onClickLeft={onClickGrid} />
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
        <FlexContainerComponent
          justify={FLEX_JUSTIFY.CENTER}
          direction="x"
          size={{ width: getSize().width, height: 10 }}
        >
          <TextComponent text="Position your ships" />
          {/*<GraphicsComponent type={GraphicType.CIRCLE} radius={10} />*/}
        </FlexContainerComponent>
      </ContainerComponent>
    </ContainerComponent>
  );
};
