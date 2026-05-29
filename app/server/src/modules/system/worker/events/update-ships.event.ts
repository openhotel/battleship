import { Event } from "shared/enums/event.enum.ts";
import { EventType } from "shared/types/event.types.ts";
import { System } from "modules/system/main.ts";

export const updateShipsEvent: EventType = {
  event: Event.UPDATE_SHIPS,
  func: ({ user, data }) => {
    const match = System.game.matches.getMatchFromOpponentId(
      user.getAccountId(),
    );
    if (!match) return;

    match.setShips(user.getAccountId(), data.ships);
  },
};
