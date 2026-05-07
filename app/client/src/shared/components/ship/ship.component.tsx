import React, { useEffect, useMemo, useState } from "react";
import { SpriteSheetEnum, ShipDirection, ShipType } from "shared/enums";
import {
  ContainerComponent,
  ContainerProps,
  GraphicsComponent,
  GraphicType,
  Point,
  SpriteComponent,
} from "@openhotel/pixi-components";
import { GREEN_COLOR } from "../../consts";
import { useTasks } from "shared/hooks";
import { TickerQueue } from "@oh/queue";
import {} from "shared/enums/ship.enums.ts";

type Props = {
  type?: ShipType;
  direction?: ShipDirection;
  selected?: boolean;
} & ContainerProps;

const DIRECTION_TYPE_MAP = {
  small: {
    right: [{ x: 0, y: 0 }, 0],
    bottom: [{ x: 0, y: 14 }, 90],
    top: [{ x: 31, y: 0 }, 270],
    left: [{ x: 31, y: 14 }, 180],
  },
  medium: {
    right: [{ x: 0, y: 0 }, 0],
    bottom: [{ x: 0, y: 14 }, 90],
    top: [{ x: 48, y: 0 }, 270],
    left: [{ x: 48, y: 14 }, 180],
  },
  big: {
    right: [{ x: 0, y: 0 }, 0],
    bottom: [{ x: 0, y: 14 }, 90],
    top: [{ x: 65, y: 0 }, 270],
    left: [{ x: 65, y: 14 }, 180],
  },
};

export const ShipComponent: React.FC<Props> = ({
  type = ShipType.SMALL,
  direction = ShipDirection.BOTTOM,
  selected = false,
  ...containerProps
}) => {
  const { add: addTask } = useTasks();

  const [showSelection, setShowSelection] = useState<boolean>(true);

  useEffect(() => {
    if (!selected) return;

    const removeTask = addTask({
      type: TickerQueue.REPEAT,
      repeatEvery: 500,
      repeats: Number.MAX_SAFE_INTEGER,
      onFunc: () => {
        setShowSelection((show) => !show);
      },
    });

    return () => removeTask();
  }, [setShowSelection, addTask, selected]);

  const [pivot, angle] = useMemo(() => {
    return DIRECTION_TYPE_MAP[type][direction] as [Point, number];
  }, [type, direction]);

  const renderSelected = useMemo(() => {
    if (!selected) return null;
    let size = 2;
    switch (type) {
      case "big":
        size = 4;
        break;
      case "medium":
        size = 3;
        break;
    }
    const isLeftRight = angle === 0 || angle == 180;
    const $size = [17, 17 * size];
    return (
      <ContainerComponent
        pivot={{
          x: 2,
          y: 2,
        }}
      >
        <GraphicsComponent
          type={GraphicType.RECTANGLE}
          width={(isLeftRight ? $size[1] : $size[0]) + 3}
          height={(isLeftRight ? $size[0] : $size[1]) + 3}
          tint={0}
          pivot={{
            x: 1,
            y: 1,
          }}
        />
        <GraphicsComponent
          type={GraphicType.RECTANGLE}
          width={(isLeftRight ? $size[1] : $size[0]) + 1}
          height={(isLeftRight ? $size[0] : $size[1]) + 1}
          tint={GREEN_COLOR}
          visible={showSelection}
        />
        <GraphicsComponent
          type={GraphicType.RECTANGLE}
          width={(isLeftRight ? $size[1] : $size[0]) - 1}
          height={(isLeftRight ? $size[0] : $size[1]) - 1}
          tint={0}
          pivot={{
            x: -1,
            y: -1,
          }}
        />
      </ContainerComponent>
    );
  }, [selected, type, angle, showSelection]);

  return (
    <ContainerComponent {...containerProps}>
      {renderSelected}
      <SpriteComponent
        texture={`ship_${type}`}
        spriteSheet={SpriteSheetEnum.SPRITE}
        angle={angle}
        pivot={pivot}
      />
    </ContainerComponent>
  );
};
