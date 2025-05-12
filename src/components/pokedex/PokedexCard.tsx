import React from "react";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";

interface Props {
  pokemon: Pokemon;
}

export default function PokedexCard({ pokemon }: Props) {

  const types = pokemon.types.map((t) => t.type.name).join(", ");
  const abilities = pokemon.abilities.map((a) => a.ability.name).join(", ");
  const stats: Record<string, number> = {};
  pokemon.stats.forEach((s) => {
    stats[s.stat.name] = s.base_stat;
  });

  return (
    <div className="flex items-center w-full gap-6 p-4 bg-screen text-foreground rounded-2xl shadow-lg border border-foreground max-w-md">
      <div className="flex-1">
        <Image
          src={"/Ash.png"} // fallback to Ash
          alt={pokemon.name}
          className="rounded-xl object-contain"
          width={120}
          height={120}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2">
        <h1 className="text-xl font-bold capitalize">{pokemon.name}</h1>
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-80">{types}</h2>
        <span className="text-xs opacity-70">{abilities}</span>
        <div className="mt-2 w-full rounded-md bg-screen p-2 text-xs shadow-inner border border-foreground/30 text-background">
          <div className="flex justify-between font-mono">
            <span className="font-semibold">HP:</span>
            <span>{stats.hp ?? "---"}</span>
          </div>
          <div className="flex justify-between font-mono">
            <span className="font-semibold">Attack:</span>
            <span>{stats.attack ?? "---"}</span>
          </div>
          <div className="flex justify-between font-mono">
            <span className="font-semibold">Defense:</span>
            <span>{stats.defense ?? "---"}</span>
          </div>
          <div className="flex justify-between font-mono">
            <span className="font-semibold">Speed:</span>
            <span>{stats.speed ?? "---"}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-screen text-background rounded-md border border-foreground/30 p-2 text-xs shadow-inner font-mono w-40">
        <h1 className="text-sm font-bold uppercase text-center border-b border-foreground/20 pb-1">
          More Info
        </h1>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-[0.7rem] uppercase font-semibold opacity-80">
              Forms
            </h2>
        </div>
      </div>
    </div>
    </div>
  );
}
