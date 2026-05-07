import {
  ContainerComponent,
  FLEX_JUSTIFY,
  FlexContainerComponent,
  SpriteComponent,
} from "@openhotel/pixi-components";
import React, { useMemo } from "react";
import { SpriteSheetEnum } from "shared/enums";

type Props = {
  leftLife: number;
  rightLife: number;
};

export const LifeComponent: React.FC<Props> = ({ leftLife, rightLife }) => {
  const renderLeft = useMemo(() => {
    let list = [];
    for (let i = 0; i < leftLife; i++) {
      list.push(
        <SpriteComponent
          texture="ship_icon"
          spriteSheet={SpriteSheetEnum.SPRITE}
        />,
      );
    }
    return list;
  }, [leftLife]);
  const renderRight = useMemo(() => {
    let list = [];
    for (let i = 0; i < rightLife; i++) {
      list.push(
        <SpriteComponent
          texture="ship_icon"
          spriteSheet={SpriteSheetEnum.SPRITE}
          angle={180}
          anchor={{
            x: 1,
          }}
        />,
      );
    }
    return list;
  }, [rightLife]);

  return (
    <ContainerComponent>
      <FlexContainerComponent
        position={{
          x: 4,
          y: 2,
        }}
        size={{
          width: 137,
        }}
        justify={FLEX_JUSTIFY.END}
        gap={2}
      >
        {renderLeft}
      </FlexContainerComponent>
      <FlexContainerComponent
        position={{
          x: 154,
          y: 2,
        }}
        justify={FLEX_JUSTIFY.START}
        gap={2}
      >
        {renderRight}
      </FlexContainerComponent>
    </ContainerComponent>
  );
};
