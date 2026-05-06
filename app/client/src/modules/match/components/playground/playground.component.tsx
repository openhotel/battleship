import React from "react";
import { GridComponent } from "modules/match/components/grid";
import {
  ContainerComponent,
  FLEX_JUSTIFY,
  FlexContainerComponent,
  GraphicsComponent,
  GraphicType,
  SpriteComponent,
  useWindow,
} from "@openhotel/pixi-components";
import { TextComponent, ShipComponent } from "shared/components";
import { GREEN_COLOR } from "shared/consts";
import { SpriteSheetEnum } from "shared/enums";
import { LifeComponent } from "../life";

export const PlaygroundComponent: React.FC = () => {
  const { getSize } = useWindow();
  return (
    <ContainerComponent>
      <GridComponent />
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
      </ContainerComponent>
      <ContainerComponent
        position={{
          x: 6,
          y: 14,
        }}
      >
        <ShipComponent
          type="big"
          direction="bottom"
          position={{
            x: 1 * 17,
            y: 1 * 17,
          }}
        />
        <ShipComponent
          type="small"
          direction="right"
          position={{
            x: 4 * 17,
            y: 1 * 17,
          }}
        />
        <SpriteComponent
          texture="explosion"
          spriteSheet={SpriteSheetEnum.SPRITE}
          position={{
            x: 1 * 17,
            y: 1 * 17,
          }}
        />
        <SpriteComponent
          texture="explosion"
          spriteSheet={SpriteSheetEnum.SPRITE}
          position={{
            x: 1 * 17,
            y: 2 * 17,
          }}
        />
        <SpriteComponent
          texture="explosion"
          spriteSheet={SpriteSheetEnum.SPRITE}
          position={{
            x: 1 * 17,
            y: 3 * 17,
          }}
        />
        <SpriteComponent
          texture="explosion"
          spriteSheet={SpriteSheetEnum.SPRITE}
          position={{
            x: 1 * 17,
            y: 4 * 17,
          }}
        />
        <SpriteComponent
          texture="water"
          spriteSheet={SpriteSheetEnum.SPRITE}
          position={{
            x: 3 * 17,
            y: 2 * 17,
          }}
        />
      </ContainerComponent>
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
