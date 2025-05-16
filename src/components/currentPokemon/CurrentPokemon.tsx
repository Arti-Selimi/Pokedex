import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  pokemon: Pokemon;
  className?: string;
  imgClassName?: string;
};

export default function CurrentPokemon({
  pokemon,
  className,
  imgClassName,
}: Props) {
  const [health, setHealth] = useState(pokemon.stats[0].base_stat);

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
              <div className="w-full flex flex-col bg-foreground text-background p-2 custom-border cursor-pointer">
                <span className="capitalize" key={i}>
                  {m.name}
                </span>
                <span className="value">
                  {m.power} {m.power === null ? "Status move" : "Damage"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
