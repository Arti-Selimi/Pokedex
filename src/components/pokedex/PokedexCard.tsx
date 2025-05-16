import React from "react";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import Chat from "../chat/chat";
import Ash from "../../../public/Ash.png";
import { Pointer } from "../chat/pointer";
import Link from "next/link";

interface Props {
  pokemon: Pokemon;
}

export default function PokedexCard({ pokemon }: Props) {
  return (
    <>
      <div className="flex-1">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          alt={pokemon.name}
          objectFit="fit"
          width={200}
          height={200}
        />
      </div>
      <div className="grid grid-cols-1 gap-1 w-full">
        <div className="flex flex-col flex-1 gap-1 min-h-full bg-background custom-border p-2 text-xs shadow-inner">
          <h1 className="text-sm font-bold text-center uppercase custom-border-bottom">
            Pokemon name:{" "}
            <span className="font-extrabold uppercase tracking-wide text-yellow-300 drop-shadow-md">
              {pokemon.name}
            </span>
          </h1>
          <div className="grid grid-cols-2">
            <div className="mini-container">
              <span className="attribute">Types:</span>
              <div className="flex flex-col gap-2">
                {pokemon.types.map((t, i) => {
                  return (
                    <span className="value capitalize pl-1" key={i}>
                      - {t.type.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="mini-container">
              <span className="attribute">Abilities:</span>
              <div className="flex flex-col gap-2">
                {pokemon.abilities.map((a, i) => {
                  return (
                    <span className="value capitalize pl-1" key={i}>
                      - {a.ability.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col  custom-border-top col-span-2">
              <span className="attribute custom-border-bottom w-min">
                Stats:
              </span>
              <div className="grid grid-cols-2 gap-2 py-2">
                {pokemon.stats.map((s, i) => {
                  return (
                    <div key={i}>
                      <span className="attribute capitalize">
                        {s.stat.name}:{" "}
                      </span>
                      <span className="value">{s.base_stat}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-2 min-h-full bg-background custom-border p-2 text-xs shadow-inner">
          <h1 className="text-sm font-bold uppercase text-center custom-border-bottom">
            More Info
          </h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center justify-center gap-1">
              <span className="attribute">Height: </span>
              <span className="value">{pokemon.height} f</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="attribute">Weight: </span>
              <span className="value">{pokemon.weight} lbs</span>
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <div className="flex items-center justify-center">
                <Image src={Ash} alt="Ash" width={150} height={150} />
                <Pointer position="left-2" />
              </div>
              <div>
                <Chat
                  title="Strange Fact!"
                  content={`${pokemon.description}`}
                  className="h-min!"
                />
              </div>
            </div>
          </div>
        </div>
        <Link href={`/Fighting?id=${pokemon.id}`} className="link">
            Try out in a Pokemon battle!
          </Link>
      </div>
    </>
  );
}
