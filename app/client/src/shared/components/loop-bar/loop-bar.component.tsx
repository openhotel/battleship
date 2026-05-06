import React, { useEffect, useMemo, useState } from "react";
import {
  ContainerComponent,
  GraphicsComponent,
  GraphicType,
} from "@openhotel/pixi-components";
import { GREEN_COLOR } from "shared/consts";
import { TickerQueue } from "@oh/queue";
import { useTasks } from "shared/hooks";

type Props = {
  width?: number;
  height?: number;
  padding?: number;
  color?: number;
};

export const LoopBarComponent: React.FC<Props> = ({
  color = GREEN_COLOR,
  padding = 1,
  width = 100,
  height = 6,
}) => {
  const { add: addTask } = useTasks();
  const [xPosition, setXPosition] = useState<number>(0);

  useEffect(() => {
    let direction = true;
    const removeTask = addTask({
      type: TickerQueue.REPEAT,
      repeatEvery: 15,
      repeats: Number.MAX_SAFE_INTEGER,
      onFunc: () => {
        console.log("repeats");
        setXPosition((x) => {
          const targetX = direction ? x + 1 : x - 1;
          if (0 >= targetX) {
            direction = true;
            return x;
          }
          if (targetX > width - padding * 2 - 6) {
            direction = false;
            return x;
          }
          return targetX;
        });
      },
    });

    return () => removeTask();
  }, [setXPosition, width]);

  return useMemo(
    () => (
      <ContainerComponent>
        <GraphicsComponent
          type={GraphicType.RECTANGLE}
          width={4}
          height={2}
          pivot={{
            x: -padding * 2,
            y: -padding * 2,
          }}
          position={{
            x: xPosition,
          }}
          tint={color}
        />
        <GraphicsComponent
          type={GraphicType.POLYGON}
          polygon={[
            0,
            0,
            //
            width,
            0,
            //
            width,
            height,
            //
            0,
            height,
            //
            0,
            padding,
            //
            padding,
            padding,
            //
            padding,
            height - padding,
            //
            width - padding,
            height - padding,
            //
            width - padding,
            padding,
            //
            0,
            padding,
          ]}
          tint={color}
        />
      </ContainerComponent>
    ),
    [width, xPosition, padding, height, color],
  );
};
