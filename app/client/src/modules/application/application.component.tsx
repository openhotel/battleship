import React, { useMemo } from "react";
import { AppComponent, CoreLoaderComponent } from "modules/application";
import { NesterComponent } from "shared/components";
import { InitialLoaderComponent, StartComponent } from "./components";
import {
  AssetsProvider,
  LanguageProvider,
  ProxyProvider,
  TasksProvider,
  GameProvider,
} from "shared/hooks";

export const ApplicationComponent = () => {
  const providers = useMemo(
    () => [
      AppComponent,
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      InitialLoaderComponent,
      ProxyProvider,
      LanguageProvider,
      AssetsProvider,
      CoreLoaderComponent,
      StartComponent,
      TasksProvider,
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      GameProvider,
    ],
    [],
  );

  return <NesterComponent components={providers} />;
};
