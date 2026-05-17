import { Event } from "shared/enums/event.enum.ts";
import { EventType } from "shared/types/event.types.ts";
import { System } from "modules/system/main.ts";

export const readyPlacingEvent: EventType = {
  event: Event.READY_PLACING,
  func: ({ user, data }) => {
    const match = System.game.matches.getMatchFromOpponentId(
      user.getAccountId(),
    );
    if (!match) return;

    //check ships are placed in a coherent way
    console.log(data);
  },
};
