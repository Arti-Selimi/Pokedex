import React from "react";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";

interface Props {
  pokemon: Pokemon;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PokedexCard({ pokemon, setPage }: Props) {
  console.log(pokemon);
  setPage(pokemon.id)

  return (
    <div className="flex items-center min-w-full gap-6 p-4 bg-background text-foreground rounded-2xl shadow-lg border border-foreground max-w-md">
      <div className="flex-1">
        <Image
          src={"/Ash.png"}
          alt={pokemon.name}
          className="rounded-xl object-contain"
          width={120}
          height={120}
        />
      </div>
      <div className="flex flex-3 flex-col justify-center gap-2">
        <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
        <div className="mt-2 w-full rounded-md bg-background custom-border p-2 text-xs">
          <span className="attribute">Types:</span>
          <div className="flex items-center gap-2">
            {pokemon.types.map((t, i) => {
              return <span className="value capitalize" key={i}>{t.type.name}</span>;
            })}
          </div>
        </div>
        <div className="mt-2 w-full rounded-md bg-background p-2 text-xs shadow-inner custom-border">
          <span className="attribute">Abilities:</span>
          <div className="flex items-center gap-2">
            {pokemon.abilities.map((a, i) => {
              return <span className="value capitalize" key={i}>{a.ability.name}</span>;
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 mt-2 w-full rounded-md bg-background p-2 text-xs shadow-inner custom-border">
          {pokemon.stats.map((s, i) => {
            return (
              <div key={i}>
                <span className="attribute capitalize">
                  {s.stat.name}:{" "}
                </span>
                <span className="value">
                  {s.base_stat}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col flex-2 gap-2 min-h-full bg-background rounded-md custom-border p-2 text-xs shadow-inner font-mono w-40">
        <h1 className="text-sm font-bold uppercase text-center border-b border-foreground/20 pb-1">
          More Info
        </h1>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex items-center justify-center gap-1">
            <span className="attribute">Height: </span>
            <span className="value">{pokemon.height}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="attribute">Weight: </span>
            <span className="value">{pokemon.weight}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
