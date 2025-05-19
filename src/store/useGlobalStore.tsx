import { create } from "zustand";
import type {
  SetNum,
  SetTurn,
  SetString,
  SetGameOver,
  Pokemon,
  Move,
  HandleTurn,
  HasMoved,
  TimerRef,
} from "@/types/pokemon";

type Store = {
  health: number | null;
  staticHealth: number | null;
  defense: number | null;
  staticDefense: number | null;
  turn: 0 | 1;
  alertMessage: string | null;
  gameOver: boolean;

  setHealth: SetNum;
  setStaticHealth: SetNum;
  setDefense: SetNum;
  setStaticDefense: SetNum;
  setTurn: SetTurn;
  setAlertMessage: SetString;
  setGameOver: SetGameOver;

  checkGameOver: () => number;
  playerToDemo: (pokemon: Pokemon, move: Move) => void;
  demoToPlayer: (pokemon: Pokemon, move: Move) => void;
  invalidTurn: () => void;
  chooseMove: (handleTurn: HandleTurn, move: Move) => void;
  canDemoMove: (
    hasMoved: HasMoved,
    timerRef: TimerRef,
    pokemon: Pokemon,
    handleTurn: HandleTurn
  ) => void;
};

export const useGlobalStore = create<Store>()((set, get) => {
  const functionalSetter =
    <K extends keyof Store>(key: K) =>
    (value: Store[K] | ((prev: Store[K]) => Store[K])) =>
      set((state) => ({
        [key]:
          typeof value === "function"
            ? (value as (prev: Store[K]) => Store[K])(state[key])
            : value,
      }));

  const checkGameOver = () => {
    set({ gameOver: true });
    return 0;
  };

  return {
    health: null,
    staticHealth: null,
    defense: null,
    staticDefense: null,
    turn: 0,
    alertMessage: null,
    gameOver: false,

    setHealth: functionalSetter("health"),
    setStaticHealth: functionalSetter("staticHealth"),
    setDefense: functionalSetter("defense"),
    setStaticDefense: functionalSetter("staticDefense"),
    setTurn: functionalSetter("turn"),
    setAlertMessage: functionalSetter("alertMessage"),
    setGameOver: functionalSetter("gameOver"),

    checkGameOver,

    playerToDemo: (pokemon, move) => {
      const { setStaticHealth, setTurn, setAlertMessage, checkGameOver } =
        get();
      const damage =
        (pokemon.stats[1].base_stat / pokemon.stats[2].base_stat) * move.power;
      setAlertMessage(
        `You attacked with ${move.name} for ${Math.floor(damage)} damage.`
      );
      setTimeout(() => setAlertMessage(null), 2000);
      setStaticHealth((prev) => {
        const newHP = prev! - damage;
        return newHP < 0 ? checkGameOver() : Math.floor(newHP);
      });
      setTurn(1);
    },

    demoToPlayer: (pokemon, move) => {
      const { setHealth, setTurn, setAlertMessage, checkGameOver } = get();
      const damage =
        (pokemon.stats[1].base_stat / pokemon.stats[2].base_stat) * move.power;
      setAlertMessage(
        `Enemy attacked with ${move.name} for ${Math.floor(damage)} damage.`
      );
      setTimeout(() => setAlertMessage(null), 2000);
      setHealth((prev) => {
        const newHP = prev! - damage;
        return newHP < 0 ? checkGameOver() : Math.floor(newHP);
      });
      setTurn(0);
    },

    invalidTurn: () => {
      const { setAlertMessage } = get();
      setAlertMessage("Not your turn, please wait for the other player.");
      setTimeout(() => setAlertMessage(null), 2000);
    },

    chooseMove: (handleTurn, move) => {
      handleTurn(
        {
          name: move.name,
          power: move.power ?? 0,
          accuracy: move.accuracy ?? 100,
        },
        "staticHealth"
      );
    },

    canDemoMove: (hasMoved, timerRef, pokemon, handleTurn) => {
      hasMoved.current = true;
      timerRef.current = setTimeout(() => {
        if (pokemon.moves.length > 0) {
          const randomMoveIndex = Math.floor(
            Math.random() * pokemon.moves.length
          );
          const move = pokemon.moves[randomMoveIndex];
          get().chooseMove(handleTurn, move);
        }
      }, 3000);
    },
  };
});
