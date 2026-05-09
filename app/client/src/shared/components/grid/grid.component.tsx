import React, { useCallback, useMemo } from "react";
import {
  ContainerComponent,
  Cursor,
  EventMode,
  Point,
  SpriteComponent,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import { GRID_SIZE } from "shared/consts";

type Props = {
  onClickLeft?: (point: Point) => void;
  onClickRight?: (point: Point) => void;
  leftInteractive?: boolean;
  rightInteractive?: boolean;
};

export const GridComponent: React.FC<Props> = ({
  onClickLeft,
  onClickRight,
  leftInteractive = false,
  rightInteractive = false,
}) => {
  const renderSide = useCallback((onPointerDown, interactive: boolean) => {
    let list = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      let x = i % GRID_SIZE;
      let y = Math.trunc(i / GRID_SIZE);

      const onClick = (event) => onPointerDown({ x, y });

      if (x === 0 && y === 0) {
        list.push(
          <SpriteComponent
            key={"corner_a_" + i}
            texture="square_corner"
            position={{
              x: x * 17,
              y: y * 17,
            }}
            onPointerDown={onClick}
            cursor={interactive ? Cursor.POINTER : null}
            eventMode={interactive ? EventMode.STATIC : null}
            spriteSheet={SpriteSheetEnum.SPRITE}
          />,
        );
        continue;
      }
      if (x === 0 && y === GRID_SIZE - 1) {
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
            onPointerDown={onClick}
            cursor={interactive ? Cursor.POINTER : null}
            eventMode={interactive ? EventMode.STATIC : null}
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
          onPointerDown={onClick}
          cursor={interactive ? Cursor.POINTER : null}
          eventMode={interactive ? EventMode.STATIC : null}
          spriteSheet={SpriteSheetEnum.SPRITE}
        />,
      );
    }
    return list;
  }, []);

  const renderMiddle = useMemo(() => {
    let list = [];
    for (let i = 0; i < GRID_SIZE; i++) {
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

  const renderLeft = useMemo(
    () => renderSide(onClickLeft, leftInteractive),
    [renderSide, onClickLeft, leftInteractive],
  );
  const renderRight = useMemo(
    () => renderSide(onClickRight, rightInteractive),
    [renderSide, onClickRight, rightInteractive],
  );

  return (
    <ContainerComponent
      position={{
        x: 4,
        y: 12,
      }}
    >
      <ContainerComponent>{renderLeft}</ContainerComponent>
      <SpriteComponent
        texture="square_middle"
        position={{
          x: GRID_SIZE * 17,
          y: 0 * 17,
        }}
        spriteSheet={SpriteSheetEnum.SPRITE}
      />
      <ContainerComponent
        position={{
          x: GRID_SIZE * 17,
        }}
      >
        {renderMiddle}
      </ContainerComponent>

      <ContainerComponent
        angle={180}
        position={{
          x: 17 * GRID_SIZE + 1 + 12,
        }}
        pivot={{
          x: 17 * GRID_SIZE + 1,
          y: 17 * GRID_SIZE + 1,
        }}
      >
        {renderRight}
      </ContainerComponent>
    </ContainerComponent>
  );
};
