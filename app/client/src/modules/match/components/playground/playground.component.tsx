import React from "react";
import { GridComponent } from "modules/match/components/grid";
import {
  ContainerComponent,
  FLEX_ALIGN,
  FLEX_JUSTIFY,
  FlexContainerComponent,
} from "@openhotel/pixi-components";
import { TextComponent } from "shared/components";

export const PlaygroundComponent: React.FC = () => {
  return (
    <ContainerComponent>
      <GridComponent />
      <ContainerComponent
        position={
          {
            // y: 17 * 8 + 18,
          }
        }
      >
        <FlexContainerComponent
          justify={FLEX_JUSTIFY.CENTER}
          // align={FLEX_ALIGN.CENTER}
          direction="x"
          size={{ width: 296, height: 10 }}
          gap={10}
        >
          <TextComponent text="test" />
          <TextComponent text="test" />
        </FlexContainerComponent>
      </ContainerComponent>
    </ContainerComponent>
  );
};
