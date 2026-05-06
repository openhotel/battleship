import React, { useMemo } from "react";
import { SpriteSheetEnum } from "shared/enums";
import {
  ContainerComponent,
  ContainerProps,
  SpriteComponent,
} from "@openhotel/pixi-components";

type Props = {
  type?: "small" | "medium" | "big";
  direction?: "right" | "top" | "left" | "bottom";
} & ContainerProps;

export const ShipComponent: React.FC<Props> = ({
  type = "small",
  direction = "right",
  ...containerProps
}) => {
  const [pivot, angle] = useMemo(() => {
    switch (direction) {
      case "right":
        return [{ x: 0, y: 0 }, 0];
      case "bottom":
        return [{ x: 0, y: 14 }, 90];
      case "top":
        return [{ x: 48, y: 0 }, 270];
      case "left":
        return [{ x: 48, y: 14 }, 180];
    }
  }, [direction]);

  return (
    <ContainerComponent {...containerProps}>
      <SpriteComponent
        texture={`ship_${type}`}
        spriteSheet={SpriteSheetEnum.SPRITE}
        angle={angle}
        pivot={pivot}
      />
    </ContainerComponent>
  );
};
