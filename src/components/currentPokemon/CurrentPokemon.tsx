import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import React from "react";

type Props = {
  pokemon: Pokemon;
};

export default function CurrentPokemon({ pokemon }: Props) {
  return (
    <div>
      <div className="m-auto p-4">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          alt={pokemon.name}
          width={200}
          height={200}
        />
        <div className="flex flex-col w-fit p-4 gap-2">
          <h1 className="capitalize">{pokemon.name}</h1>
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
      </div>
    </div>
  );
}
