import { System } from "../main.ts";
import { TickerQueue } from "@oh/queue";
import { Match, MatchMutable } from "shared/types/match.types.ts";
import { Ship } from "shared/types/ships.types.ts";
import { Event } from "shared/enums/event.enum.ts";
import { ulid } from "@std/ulid";
import { UserMutable } from "shared/types/user.types.ts";
import { INITIAL_SHIP_TYPES } from "shared/consts/ships.consts.ts";
import {
  arePositionsUnique,
  getShipTargetPositions,
  isAnyPositionOutOfBounds,
} from "shared/utils/position.utils.ts";

export const matches = () => {
  let $matchMap: Record<string, MatchMutable> = {};

  const $getMatch = (match: Match): MatchMutable => {
    const $ships: Record<string, Ship[]> = {};

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
        $ships[opponent.getAccountId()] = [];
        for (let i = 0; i < 6; i++) {
          $ships[opponent.getAccountId()].push({
            id: ulid(),
            type: INITIAL_SHIP_TYPES[i],
            direction: null,
            position: null,
          });
        }
        opponent.emit(Event.OPPONENT_ASSIGNED, {
          ships: $ships[opponent.getAccountId()].map((ship) => [
            ship.id,
            ship.type,
          ]),
        });
      });

      placingSipsDelayTaskId = System.tasks.add({
        type: TickerQueue.DELAY,
        delay: 62_000,
        onDone: () => {
          const areShipsValid = checkIfShipsAreValid();
          if (!areShipsValid) return stop();

          broadcast(Event.OPPONENT_READY);
        },
      });
    };
    const checkIfShipsAreValid = () => {
      let invalidOpponents: UserMutable[] = [];

      for (let opponent of getOpponents()) {
        const ships = $ships[opponent.getAccountId()];
        //check ships are length and type INITIAL_SHIP_TYPES
        if (ships.length !== INITIAL_SHIP_TYPES.length) {
          invalidOpponents.push(opponent);
          continue;
        }
        // if any ship has no position neither direction
        if (ships.find((ship) => !ship.position || !ship.direction)) {
          invalidOpponents.push(opponent);
          continue;
        }

        const shipsPositions = ships.flatMap(getShipTargetPositions);

        if (isAnyPositionOutOfBounds(shipsPositions)) {
          invalidOpponents.push(opponent);
          continue;
        }
        if (!arePositionsUnique(shipsPositions)) {
          invalidOpponents.push(opponent);
          continue;
        }
      }
      for (const invalidOpponent of invalidOpponents) invalidOpponent.close();

      return invalidOpponents.length === 0;
    };

    const stop = (userId?: string) => {
      System.tasks.remove(placingSipsDelayTaskId);

      delete $matchMap[match.id];

      if (userId) {
        const opponentId = match.opponents.find(
          (opponentId) => userId !== opponentId,
        );
        System.game.pool.addUser(opponentId);
      } else {
        match.opponents.forEach((opponentId) => {
          System.game.pool.addUser(opponentId);
        });
      }
    };

    const setShips = (opponentId: string, ships: Ship[]) => {
      $ships[opponentId] = $ships[opponentId].map((ship) => {
        const foundShip = ships.find(($ship) => $ship.id === ship.id);
        //only update position and direction to prevent changing id, type, ...
        return foundShip
          ? {
              ...ship,
              position: foundShip.position,
              direction: foundShip.direction,
            }
          : ship;
      });
    };

    const getObject = (): Match => match;

    return {
      start,
      stop,
      getObject,
      setShips,
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
