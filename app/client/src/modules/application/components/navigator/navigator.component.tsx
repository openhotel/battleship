import React, { useEffect, useMemo, useState } from "react";
import { PlaceShipsProvider, useGame, useProxy } from "shared/hooks";

import { Event } from "shared/enums";
import { SearchForMatchComponent } from "modules/search-for-match";
import { MatchComponent } from "modules/match";

export const NavigatorComponent: React.FC = () => {
  const { on } = useProxy();
  const { clearShips } = useGame();

  const [navigate, setNavigate] = useState<[string, any]>([
    "search-match",
    null,
  ]);

  useEffect(() => {
    on(Event.OPPONENT_ASSIGNED, ({ ships }) => {
      setNavigate(["place-ship", { ships }]);
      clearShips();
    });
    on(Event.OPPONENT_READY, () => {
      setNavigate(["match", null]);
    });
    on(Event.SEARCHING_MATCH, () => {
      setNavigate(["search-match", null]);
    });
  }, [on, setNavigate, clearShips]);

  return useMemo(() => {
    switch (navigate[0]) {
      case "search-match":
        return <SearchForMatchComponent {...navigate[1]} />;
      case "place-ship":
        return <PlaceShipsProvider {...navigate[1]} />;
      case "match":
        return <MatchComponent />;
      default:
        return null;
    }
  }, [navigate]);
};
