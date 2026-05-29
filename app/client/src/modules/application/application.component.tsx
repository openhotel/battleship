import React, { useMemo } from "react";
import {
  AppComponent,
  CoreLoaderComponent,
  NavigatorComponent,
} from "modules/application";
import { NesterComponent } from "shared/components";
import { InitialLoaderComponent, StartComponent } from "./components";
import {
  AssetsProvider,
  GameProvider,
  ProxyProvider,
  TasksProvider,
} from "shared/hooks";

export const ApplicationComponent = () => {
  const providers = useMemo(
    () => [
      AppComponent,
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      InitialLoaderComponent,
      ProxyProvider,
      GameProvider,
      AssetsProvider,
      CoreLoaderComponent,
      StartComponent,
      TasksProvider,
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      NavigatorComponent,
    ],
    [],
  );

  return <NesterComponent components={providers} />;
};
