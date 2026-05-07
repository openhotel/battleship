import React from "react";
import {
  ContainerComponent,
  GraphicsComponent,
  GraphicType,
} from "@openhotel/pixi-components";
import { GREEN_COLOR } from "shared/consts";

export const PlaceShipsScreenComponent: React.FC = () => {
  return (
    <ContainerComponent
      position={{
        x: 155,
        y: 14,
      }}
    >
      <GraphicsComponent
        type={GraphicType.RECTANGLE}
        width={133}
        height={133}
        tint={0}
      />
      <GraphicsComponent
        type={GraphicType.RECTANGLE}
        width={131}
        height={131}
        position={{
          x: 1,
          y: 1,
        }}
        tint={GREEN_COLOR}
      />
      <GraphicsComponent
        type={GraphicType.RECTANGLE}
        width={129}
        height={129}
        position={{
          x: 2,
          y: 2,
        }}
        tint={0}
      />
    </ContainerComponent>
  );
};
