import React, { useMemo } from "react";
import {
  SpriteTextComponent,
  SpriteTextProps,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import { GREEN_COLOR } from "shared/consts";

type Props = {
  bold?: boolean;
} & Omit<SpriteTextProps, "spriteSheet">;

export const TextComponent: React.FC<Props> = ({
  bold,
  tint = GREEN_COLOR,
  ...props
}) => {
  return useMemo(
    () => (
      <SpriteTextComponent
        spriteSheet={
          bold ? SpriteSheetEnum.BOLD_FONT : SpriteSheetEnum.DEFAULT_FONT
        }
        tint={tint}
        {...props}
      />
    ),
    [bold, props],
  );
};
