import React from "react";
import {
  ContainerComponent,
  Cursor,
  EventMode,
  FLEX_ALIGN,
  FLEX_JUSTIFY,
  FlexContainerComponent,
} from "@openhotel/pixi-components";
import {
  LogoComponent,
  LoopBarComponent,
  TextComponent,
} from "shared/components";

export const SearchForMatchComponent: React.FC = () => {
  return (
    <ContainerComponent eventMode={EventMode.STATIC} cursor={Cursor.POINTER}>
      <FlexContainerComponent
        align={FLEX_ALIGN.CENTER}
        justify={FLEX_JUSTIFY.CENTER}
        direction="y"
        position={{ y: -45 }}
      >
        <LogoComponent />
      </FlexContainerComponent>
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
