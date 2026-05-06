import React, { useMemo } from "react";
import {
  ContainerComponent,
  SpriteComponent,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";

export const GridComponent: React.FC = () => {
  const renderSide = useMemo(() => {
    let list = [];
    for (let i = 0; i < 8 * 8; i++) {
      let x = i % 8;
      let y = Math.trunc(i / 8);

      if (x === 0 && y === 0) {
        list.push(
          <SpriteComponent
            key={"corner_a_" + i}
            texture="square_corner"
            position={{
              x: x * 17,
              y: y * 17,
            }}
            spriteSheet={SpriteSheetEnum.SPRITE}
          />,
        );
        continue;
      }
      if (x === 0 && y === 7) {
        list.push(
          <SpriteComponent
            key={"corner_" + i}
            texture="square_corner"
            position={{
              x: x * 17,
              y: y * 17,
            }}
            angle={-90}
            pivot={{
              x: 18,
            }}
            spriteSheet={SpriteSheetEnum.SPRITE}
          />,
        );
        continue;
      }
      list.push(
        <SpriteComponent
          key={"square" + i}
          texture="square"
          position={{
            x: x * 17,
            y: y * 17,
          }}
          spriteSheet={SpriteSheetEnum.SPRITE}
        />,
      );
    }
    return list;
  }, []);

  const renderMiddle = useMemo(() => {
    let list = [];
    for (let i = 0; i < 8; i++) {
      list.push(
        <SpriteComponent
          key={`middle_${i}`}
          texture="square_middle"
          position={{
            x: 0,
            y: i * 17,
          }}
          spriteSheet={SpriteSheetEnum.SPRITE}
        />,
      );
    }
    return list;
  }, []);

  return (
    <ContainerComponent
      position={{
        x: 4,
        y: 12,
      }}
    >
      <ContainerComponent>{renderSide}</ContainerComponent>
      <SpriteComponent
        texture="square_middle"
        position={{
          x: 8 * 17,
          y: 0 * 17,
        }}
        spriteSheet={SpriteSheetEnum.SPRITE}
      />
      <ContainerComponent
        position={{
          x: 8 * 17,
        }}
      >
        {renderMiddle}
      </ContainerComponent>

      <ContainerComponent
        angle={180}
        position={{
          x: 17 * 8 + 1 + 12,
        }}
        pivot={{
          x: 17 * 8 + 1,
          y: 17 * 8 + 1,
        }}
      >
        {renderSide}
      </ContainerComponent>
    </ContainerComponent>
  );
};
