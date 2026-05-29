import { useContext } from "react";
import { GameContext, GameState } from "./game.context.tsx";

export const useGame = (): GameState => useContext(GameContext);
