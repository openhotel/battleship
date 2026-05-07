import React from "react";
import {
  ContainerComponent,
  GraphicsComponent,
  GraphicType,
  SpriteComponent,
} from "@openhotel/pixi-components";
import { ShipComponent } from "shared/components";
import { SpriteSheetEnum } from "shared/enums";
import { GREEN_COLOR } from "../../../../shared/consts";

export const ShipsComponent: React.FC = () => {
  return (
    <ContainerComponent
      position={{
        x: 6,
        y: 14,
      }}
    >
      <ShipComponent
        type="big"
        direction="bottom"
        selected
        position={{
          x: 1 * 17,
          y: 1 * 17,
        }}
      />
      {/*<ShipComponent*/}
      {/*  type="small"*/}
      {/*  direction="right"*/}
      {/*  position={{*/}
      {/*    x: 4 * 17,*/}
      {/*    y: 1 * 17,*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<SpriteComponent*/}
      {/*  texture="explosion"*/}
      {/*  spriteSheet={SpriteSheetEnum.SPRITE}*/}
      {/*  position={{*/}
      {/*    x: 1 * 17,*/}
      {/*    y: 1 * 17,*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<SpriteComponent*/}
      {/*  texture="explosion"*/}
      {/*  spriteSheet={SpriteSheetEnum.SPRITE}*/}
      {/*  position={{*/}
      {/*    x: 1 * 17,*/}
      {/*    y: 2 * 17,*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<SpriteComponent*/}
      {/*  texture="explosion"*/}
      {/*  spriteSheet={SpriteSheetEnum.SPRITE}*/}
      {/*  position={{*/}
      {/*    x: 1 * 17,*/}
      {/*    y: 3 * 17,*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<SpriteComponent*/}
      {/*  texture="explosion"*/}
      {/*  spriteSheet={SpriteSheetEnum.SPRITE}*/}
      {/*  position={{*/}
      {/*    x: 1 * 17,*/}
      {/*    y: 4 * 17,*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<SpriteComponent*/}
      {/*  texture="water"*/}
      {/*  spriteSheet={SpriteSheetEnum.SPRITE}*/}
      {/*  position={{*/}
      {/*    x: 3 * 17,*/}
      {/*    y: 2 * 17,*/}
      {/*  }}*/}
      {/*/>*/}
    </ContainerComponent>
  );
};
