import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import React from "react";

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
}

export default function CurrentPokemon({
  id,
  pokemon,
  health,
  handleTurn,
  className,
  imgClassName,
}: FightingPokemon) {
  return (
    <div className={`flex flex-col m-auto p-4 w-fit gap-2 ${className}`}>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
        alt={pokemon.name}
        className={`${imgClassName}`}
        width={200}
        height={200}
      />
      <h1 className="capitalize value text-2xl!">{pokemon.name}</h1>
      <div className="flex flex-col gap-2 p-4 w-full custom-border">
        <span>Health: {health}</span>
        <span>Speed: {pokemon.stats[5].base_stat}</span>
      </div>
      <div className="flex flex-col gap-2 p-4 custom-border">
        <span className="my-4">Abilities:</span>
        <div className="grid grid-cols-2 gap-4">
          {pokemon.moves.map((m, i) => {
            return (
              <div
                onClick={() =>
                  handleTurn(
                    {
                      name: m.name,
                      power: m.power ?? 0,
                      accuracy: m.accuracy ?? 100,
                    },
                    id === "dynamic" ? "health" : "staticHealth"
                  )
                }
                className="w-full flex flex-col bg-foreground text-background p-2 custom-border cursor-pointer"
              >
                <span className="capitalize" key={i}>
                  {m.name}
                </span>
                <span className="value">
                  {m.power} {m.power === null ? "Status move" : "Power"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
