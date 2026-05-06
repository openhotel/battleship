import React, { useEffect, useState } from "react";
import { useProxy } from "shared/hooks";
import { useWindow } from "@openhotel/pixi-components";

type Props = {} & React.PropsWithChildren;

export const StartComponent: React.FC<Props> = ({ children }) => {
  const { ready, on } = useProxy();
  const { setSize } = useWindow();

  const [onWindowChange, setOnWindowChange] = useState(false);

  useEffect(() => {
    on("$$settings" as any, (config) => {
      if (config.screen === "windowed") {
        setSize(config.windowSize);
        setOnWindowChange(true);
      }
    });
  }, [on, setSize, setOnWindowChange]);

  useEffect(() => {
    ready();
  }, [ready]);

  return onWindowChange ? children : null;
};
