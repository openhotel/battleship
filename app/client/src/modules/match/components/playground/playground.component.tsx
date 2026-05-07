import React from "react";
import { GridComponent } from "modules/match/components/grid";
import {
  ContainerComponent,
  FLEX_JUSTIFY,
  FlexContainerComponent,
  useWindow,
} from "@openhotel/pixi-components";
import { TextComponent } from "shared/components";
import { LifeComponent } from "../life";
import { ShipsComponent } from "../ships";
import { PlaceShipsScreenComponent } from "../place-ships-screen";

export const PlaygroundComponent: React.FC = () => {
  const { getSize } = useWindow();
  return (
    <ContainerComponent>
      <GridComponent />
      <PlaceShipsScreenComponent />
      <ShipsComponent />
      <LifeComponent />
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
