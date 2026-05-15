import { users } from "./users.ts";
import { matches } from "./matches.ts";
import { pool } from "./pool.ts";

export const game = () => {
  const $users = users();
  const $matches = matches();
  const $pool = pool();

  const load = () => {
    $matches.load();
  }

  return {
    users: $users,
    matches: $matches,
    pool: $pool,

    load,
  };
};
