import React, { useEffect } from "react";
import { useProxy } from "shared/hooks";
import { SearchForMatchComponent } from "modules/match";

export const NavigatorComponent: React.FC = () => {
  const { ready, on } = useProxy();

  useEffect(() => {
    ready();
  }, [ready]);

  return <SearchForMatchComponent />;
};
