import React, { useEffect } from "react";
import { useProxy } from "shared/hooks";
import { SearchForMatchComponent } from "modules/match";
import { Event } from "shared/enums";

export const NavigatorComponent: React.FC = () => {
  const { ready, on } = useProxy();

  useEffect(() => {
    on(Event.CLICK, () => {
    
    });
    ready();
  }, [ready, on]);

  return <SearchForMatchComponent />;
};
