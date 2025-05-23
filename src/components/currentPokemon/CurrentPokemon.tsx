import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import React, { useRef } from "react";
import { useGlobalStore } from "@/store/useGlobalStore";

interface FightingPokemon {
  id: string;
  pokemon: Pokemon;
  health: number | null;
  handleTurn: (
    move: { name: string; power: number; accuracy: number },
    powerTaker: string
  ) => void;
  className?: string;
  imgClassName?: string;
  turn?: number;
}

export default function CurrentPokemon({
  id,
  pokemon,
  health,
  handleTurn,
  className,
  imgClassName,
  turn = 0,
}: FightingPokemon) {
  const hasMoved = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevTurn = useRef(turn);

  // ⬇️ pull canDemoMove from the Zustand store
  const { canDemoMove } = useGlobalStore();

  const executeAutomaticMove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (id === "static" && turn === 1 && !hasMoved.current) {
      canDemoMove(hasMoved, timerRef, pokemon, handleTurn);
    }

    if (turn === 0 && hasMoved.current) {
      hasMoved.current = false;
    }
  };

  if (prevTurn.current !== turn) {
    executeAutomaticMove();
    prevTurn.current = turn;
  }

  return (
    <div className={`flex flex-col m-auto p-2 w-full gap-2 ${className}`}>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
        alt={pokemon.name}
        className={`${imgClassName} w-[200px] h-[200px]`}
        width={200}
        height={200}
      />
      <h1 className="capitalize value text-lg!">{pokemon.name}</h1>
      <div className="flex flex-col gap-2 p-2 w-full custom-border">
        <span>Health: {health}</span>
        <span>Attack: {pokemon.stats[1].base_stat}</span>
        <span>Defense: {pokemon.stats[2].base_stat}</span>
      </div>
      <div className="flex flex-col w-full gap-2 p-2 custom-border">
        <span className="my-4">Abilities:</span>
        <div className="grid grid-cols-2 gap-2">
          {pokemon.moves.map((m, i) => (
            <div
              key={i}
              onClick={() =>
                id === "static"
                  ? null
                  : handleTurn(
                      {
                        name: m.name,
                        power: m.power ?? 0,
                        accuracy: m.accuracy ?? 100,
                      },
                      "health"
                    )
              }
              className="w-full flex flex-col bg-foreground text-background p-2 custom-border cursor-pointer"
            >
              <span className="capitalize">{m.name}</span>
              <span className="value">
                {m.power ?? "Status move"} {m.power !== null && "Power"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
