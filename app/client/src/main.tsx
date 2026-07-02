import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApplicationComponent } from "@oh/game-utils/client";
import { LoaderAssetsComponent } from "./shared/components";
import { GameProvider, TasksProvider } from "./shared/hooks";
import { NavigatorComponent } from "./modules/navigator";
import { AssetEnum, SpriteSheetEnum, TextureEnum } from "./shared/enums";
import LoaderComponent from "./shared/components/loader/loader.component.tsx";

const domNode = document.getElementById("root");

const root = createRoot(domNode);

root.render(
  <StrictMode>
    <ApplicationComponent
      providers={[[GameProvider, 3], TasksProvider, NavigatorComponent]}
      initialSpriteSheets={[
        SpriteSheetEnum.DEFAULT_FONT,
        SpriteSheetEnum.BOLD_FONT,
      ]}
      assets={Object.values(AssetEnum)}
      spriteSheets={Object.values(SpriteSheetEnum)}
      textures={Object.values(TextureEnum)}
      LoaderComponent={LoaderComponent}
      LoaderAssetsComponent={LoaderAssetsComponent}
    />
  </StrictMode>,
);
