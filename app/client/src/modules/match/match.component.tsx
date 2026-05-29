import React, { useMemo } from "react";
import {
  ContainerComponent,
  FLEX_ALIGN,
  FLEX_JUSTIFY,
  FlexContainerComponent,
  useWindow,
} from "@openhotel/pixi-components";
import { GridComponent, ShipComponent } from "shared/components";
import { useGame } from "shared/hooks";

export const MatchComponent: React.FC = () => {
  const { getSize } = useWindow();
  const { getShips } = useGame();

  const renderShips = useMemo(
    () =>
      getShips().map((ship) => (
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
    [getShips],
  );

  return (
    <ContainerComponent>
      <FlexContainerComponent
        justify={FLEX_JUSTIFY.CENTER}
        align={FLEX_ALIGN.CENTER}
        size={{ width: getSize().width, height: 12 }}
      ></FlexContainerComponent>
      <GridComponent />
      <ContainerComponent
        position={{
          x: 6,
          y: 14,
        }}
      >
        {renderShips}
      </ContainerComponent>
    </ContainerComponent>
  );
};
