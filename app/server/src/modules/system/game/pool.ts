import { getRandomNumber } from "shared/utils/random.utils.ts";
import { System } from "modules/system/main.ts";
import { Event } from "shared/enums/event.enum.ts";

export const pool = () => {
  let $userList: string[] = [];

  const addUser = (accountId: string) => {
    if ($userList.includes(accountId)) return;

    System.game.users.get(accountId).emit(Event.SEARCHING_MATCH);
    $userList.push(accountId);
  };
  const removeUser = (accountId: string) => {
    $userList = $userList.filter(($accountId) => $accountId !== accountId);
  };

  const getUserAt = (index: number): string | null => {
    if (1 > $userList.length) return null;

    const accountId = $userList.at(index);
    $userList = $userList.filter(($accountId) => accountId !== $accountId);
    return accountId;
  };
  const getRandomUser = (): string | null => {
    if (1 > $userList.length) return null;

    return getUserAt(getRandomNumber(0, $userList.length - 1));
  };

  const getRandomPair = (): [string, string] => {
    if (2 > $userList.length) return null;

    return [getRandomUser(), getRandomUser()];
  };

  const getLength = (): number => $userList.length;

  return {
    addUser,
    removeUser,
    getRandomPair,
    getLength,
  };
};
