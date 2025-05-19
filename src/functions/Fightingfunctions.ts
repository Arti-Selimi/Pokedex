import { Pokemon } from "@/types/pokemon";
import type { Move, HandleTurn, HasMoved, TimerRef } from "@/types/pokemon";
import { useGlobalStore } from "@/store/useGlobalStore";

const checkGameOver = () => {
  const {setGameOver} = useGlobalStore()
  setGameOver(true);
  return 0;
};

export const PlayerToDemo = (pokemon: Pokemon, move: Move) => {
  const {setStaticHealth, setTurn, setAlertMessage} = useGlobalStore()
  setAlertMessage(`You attacked with ${move.name} for ${move?.power} damage.`);
  setTimeout(() => setAlertMessage(null), 2000);
  console.log(
    (pokemon.stats[1].base_stat / pokemon.stats[2].base_stat) * move.power
  );
  setStaticHealth((prev) =>
    prev! -
      (pokemon.stats[1].base_stat / pokemon.stats[2].base_stat) * move.power <
    0
      ? checkGameOver()
      : Math.floor(
          prev! -
            (pokemon.stats[1].base_stat / pokemon.stats[2].base_stat) *
              move.power
        )
  );
  setTurn(1);
};

export const DemoToPlayer = (pokemon: Pokemon, move: Move) => {
  const {setHealth, setTurn, setAlertMessage} = useGlobalStore()

  setAlertMessage(
    `Enemy attacked with ${move.name} for ${move?.power} damage.`
  );
  setTimeout(() => setAlertMessage(null), 2000);
  setHealth((prev) =>
    prev! -
      (pokemon.stats[1].base_stat / pokemon.stats[2].base_stat) * move.power <
    0
      ? checkGameOver()
      : Math.floor(
          prev! -
            (pokemon.stats[1].base_stat / pokemon.stats[2].base_stat) *
              move.power
        )
  );
  setTurn(0);
};

export const InvalidTurn = () => {
  const {setAlertMessage} = useGlobalStore()
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
