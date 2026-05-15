import React, { useEffect, useState } from "react";
import { PlaceShipsProvider, useProxy } from "shared/hooks";
import { SearchForMatchComponent } from "modules/match";
import { Event } from "shared/enums";
export const NavigatorComponent: React.FC = () => {
  const { ready, on } = useProxy();

  const [opponentAssigned, setOpponentAssigned] = useState<boolean>(false);

  useEffect(() => {
    on(Event.OPPONENT_ASSIGNED, () => {
      setOpponentAssigned(true);
    });
    ready();
  }, [ready, on, setOpponentAssigned]);

  return opponentAssigned ? (
    <PlaceShipsProvider />
  ) : (
    <SearchForMatchComponent />
  );
};
