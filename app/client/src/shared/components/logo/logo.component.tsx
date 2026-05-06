import React from "react";
import {
  ContainerComponent,
  ContainerProps,
  SpriteComponent,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";

export const LogoComponent: React.FC<ContainerProps> = ({ ...container }) => {
  return (
    <ContainerComponent {...container}>
      <SpriteComponent
        texture="logo_battle"
        spriteSheet={SpriteSheetEnum.SPRITE}
      />
      <SpriteComponent
        position={{
          x: 104,
        }}
        texture="logo_ship"
        spriteSheet={SpriteSheetEnum.SPRITE}
      />
    </ContainerComponent>
  );
};
