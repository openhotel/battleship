import { useContext } from "react";
import { PlaceShipsContext, PlaceShipsState } from "./place-ships.context";

export const usePlaceShips = (): PlaceShipsState =>
  useContext(PlaceShipsContext);
