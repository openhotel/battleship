import React, { useEffect, useMemo, useState } from "react";
import { PlaceShipsProvider, useProxy } from "shared/hooks";
import { SearchForMatchComponent } from "modules/match";
import { Event } from "shared/enums";
export const NavigatorComponent: React.FC = () => {
  const { on } = useProxy();

  const [navigate, setNavigate] = useState<[string, any]>([
    "search-match",
    null,
  ]);

  useEffect(() => {
    on(Event.OPPONENT_ASSIGNED, ({ ships }) => {
      setNavigate(["place-ship", { ships }]);
    });
    on(Event.OPPONENT_READY, () => {
      setNavigate(null);
    });
    on(Event.SEARCHING_MATCH, () => {
      setNavigate(["search-match", null]);
    });
  }, [on, setNavigate]);

  return useMemo(() => {
    switch (navigate[0]) {
      case "search-match":
        return <SearchForMatchComponent {...navigate[1]} />;
      case "place-ship":
        return <PlaceShipsProvider {...navigate[1]} />;
      default:
        return null;
    }
  }, [navigate]);
};
