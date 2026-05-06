import React from "react";
import {
  ContainerComponent,
  Cursor,
  EventMode,
  FLEX_ALIGN,
  FLEX_JUSTIFY,
  FlexContainerComponent,
} from "@openhotel/pixi-components";
import { LoopBarComponent, TextComponent } from "shared/components";
import { useProxy } from "shared/hooks";
import { GREEN_COLOR } from "shared/consts";

export const SandboxComponent: React.FC = () => {
  const { emit, exit } = useProxy();

  console.log("?");
  return (
    <ContainerComponent eventMode={EventMode.STATIC} cursor={Cursor.POINTER}>
      {/*<GraphicsComponent*/}
      {/*  type={GraphicType.RECTANGLE}*/}
      {/*  width={(50 * (MAX_COUNT - count)) / MAX_COUNT}*/}
      {/*  height={(50 * (MAX_COUNT - count)) / MAX_COUNT}*/}
      {/*  tint={0x6abe30}*/}
      {/*  position={{*/}
      {/*    x: count ? getRandomNumber(0, 100) : 0,*/}
      {/*    y: count ? getRandomNumber(0, 100) : 0,*/}
      {/*  }}*/}
      {/*/>*/}

      <FlexContainerComponent
        align={FLEX_ALIGN.CENTER}
        justify={FLEX_JUSTIFY.CENTER}
        direction="y"
      >
        <TextComponent text="Searching for a match..." pivot={{ y: 4 }} />
        <LoopBarComponent />
      </FlexContainerComponent>
    </ContainerComponent>
  );
};
