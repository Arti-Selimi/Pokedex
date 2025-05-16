import { Pokemon } from "@/types/pokemon";

type SetNum = React.Dispatch<React.SetStateAction<number | null>>;
type SetString = React.Dispatch<React.SetStateAction<string | null>>;
type SetTurn = React.Dispatch<React.SetStateAction<0 | 1>>;
type Move = { name: string; power: number; accuracy: number };
type HandleTurn = (move: Move, powerTaker: string) => void;
type HasMoved = React.RefObject<boolean>;
type TimerRef = React.RefObject<ReturnType<typeof setTimeout> | null>;

export const PlayerToDemo = (
  setStaticHealth: SetNum,
  setAlertMessage: SetString,
  setTurn: SetTurn,
  move: Move
) => {
  setStaticHealth((prev) =>
    prev! - move?.power < 0 ? 0 : prev! - move?.power
  );
  setAlertMessage(`You attacked with ${move.name} for ${move?.power} damage.`);
  setTimeout(() => setAlertMessage(null), 2000);
  setTurn(1);
};

export const DemoToPlayer = (
  setHealth: SetNum,
  setAlertMessage: SetString,
  setTurn: SetTurn,
  move: Move
) => {
  setHealth((prev) => (prev! - move?.power < 0 ? 0 : prev! - move?.power));
  setAlertMessage(
    `Enemy attacked with ${move.name} for ${move?.power} damage.`
  );
  setTimeout(() => setAlertMessage(null), 2000);
  setTurn(0);
};

export const InvalidTurn = (setAlertMessage: SetString) => {
  setAlertMessage("Not your turn, please wait for the other player.");
  setTimeout(() => setAlertMessage(null), 2000);
};

export const ChooseMove = (handleTurn: HandleTurn, move: Move) => {
  handleTurn(
    {
      name: move.name,
      power: move.power ?? 0,
      accuracy: move.accuracy ?? 100,
    },
    "staticHealth"
  );
};

export const CanDemoMove = (
  hasMoved: HasMoved,
  timerRef: TimerRef,
  pokemon: Pokemon,
  handleTurn: HandleTurn
) => {
  hasMoved.current = true;
  timerRef.current = setTimeout(() => {
    if (pokemon.moves.length > 0) {
      const randomMoveIndex = Math.floor(Math.random() * pokemon.moves.length);
      const move = pokemon.moves[randomMoveIndex];
      ChooseMove(handleTurn, move);
    }
  }, 3000);
};
