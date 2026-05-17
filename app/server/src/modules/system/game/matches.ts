import { System } from "../main.ts";
import { TickerQueue } from "@oh/queue";
import { Match, MatchMutable, MatchShip } from "shared/types/match.types.ts";
import { Event } from "shared/enums/event.enum.ts";
import { ulid } from "@std/ulid";
import { UserMutable } from "shared/types/user.types.ts";

export const matches = () => {
  let $matchMap: Record<string, MatchMutable> = {};

  const $getMatch = (match: Match): MatchMutable => {
    const ships: Record<string, MatchShip[]> = {};

    let placingSipsDelayTaskId;

    const getOpponents = (): [UserMutable, UserMutable] =>
      match.opponents.map(System.game.users.get) as [UserMutable, UserMutable];

    const broadcast = (event: Event, data: any = null) => {
      getOpponents().forEach((opponent) => opponent.emit(event, data));
    };

    const start = () => {
      const opponents = getOpponents();

      const [opponent1, opponent2] = opponents.map((user) =>
        user.getUsername(),
      );
      console.log(`match: ${opponent1} vs ${opponent2}`);

      opponents.forEach((opponent) => {
        ships[opponent.getAccountId()] = [];
        for (let i = 0; i < 6; i++) {
          ships[opponent.getAccountId()].push({
            id: ulid(),
            direction: null,
            position: null,
          });
        }
        opponent.emit(Event.OPPONENT_ASSIGNED, {
          ships: ships[opponent.getAccountId()].map((ship) => ship.id),
        });
      });

      placingSipsDelayTaskId = System.tasks.add({
        type: TickerQueue.DELAY,
        delay: 65_000,
        onDone: () => {
          //TODO check if opponents have already placed ships, if not, match is done
        },
      });
    };

    const stop = (userId: string) => {
      System.tasks.remove(placingSipsDelayTaskId);

      delete $matchMap[match.id];

      const opponentId = match.opponents.find(
        (opponentId) => userId !== opponentId,
      );
      System.game.pool.addUser(opponentId);
    };

    const getObject = (): Match => match;

    return {
      start,
      stop,
      getObject,
    };
  };

  const add = (match: Match) => {
    const $match = $getMatch(match);
    $matchMap[match.id] = $match;
    $match.start();
  };

  const getMatchFromOpponentId = (opponentId: string): MatchMutable | null =>
    Object.values($matchMap).find((match) =>
      match.getObject().opponents.includes(opponentId),
    ) ?? null;

  const load = () => {
    System.tasks.add({
      type: TickerQueue.CUSTOM,
      onFunc: (delta: number) => {
        if (2 > System.game.pool.getLength()) return;

        const opponents = System.game.pool.getRandomPair();
        if (!opponents) return;

        add({
          id: ulid(),
          opponents,
        });
      },
    });
  };

  const removeUser = (userId: string) => {
    const match = getMatchFromOpponentId(userId);
    if (!match) return;

    match.stop(userId);
  };

  return {
    load,
    removeUser,
    getMatchFromOpponentId,
  };
};
