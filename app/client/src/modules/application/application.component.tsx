import React, { useMemo } from "react";
import { AppComponent, CoreLoaderComponent } from "modules/application";
import { NesterComponent } from "shared/components";
import { SandboxComponent } from "modules/sandbox";
import { InitialLoaderComponent, StartComponent } from "./components";
import {
  AssetsProvider,
  LanguageProvider,
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
      LanguageProvider,
      AssetsProvider,
      CoreLoaderComponent,
      StartComponent,
      TasksProvider,
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      SandboxComponent,
    ],
    [],
  );

  return <NesterComponent components={providers} />;
};
