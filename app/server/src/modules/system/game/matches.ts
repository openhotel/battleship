import { System } from "../main.ts";
import { TickerQueue } from "@oh/queue";
import { MatchAddProps } from "shared/types/match.types.ts";
import { Event } from "shared/enums/event.enum.ts";

export const matches = () => {
  const add = ({ opponents }: MatchAddProps) => {
    const opponent1 = System.game.users.get(opponents[0]);
    const opponent2 = System.game.users.get(opponents[1]);

    console.log(
      `match: ${opponent1.getUsername()} vs ${opponent2.getUsername()}`,
    );

    opponent1.emit(Event.OPPONENT_ASSIGNED);
    opponent2.emit(Event.OPPONENT_ASSIGNED);
  };

  const load = () => {
    System.tasks.add({
      type: TickerQueue.CUSTOM,
      onFunc: (delta: number) => {
        if (2 > System.game.pool.getLength()) return;

        const opponents = System.game.pool.getRandomPair();
        if (!opponents) return;

        add({
          opponents,
        });
      },
    });
  };

  return {
    load,
  };
};
