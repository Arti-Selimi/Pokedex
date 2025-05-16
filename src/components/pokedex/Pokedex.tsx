"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME } from "@/api/FetchPokemon";
import PokedexCard from "./PokedexCard";
import PokedexNavbar from "./PokedexNavbar";
import { RawPokemon } from "@/types/pokemon";
import mapPokemon from "@/functions/functions";
import LoadingGif from "../../../public/loading.gif";
import Image from "next/image";

export default function Pokedex() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const variables = name
    ? { limit: 1, name: `%${name}%` }
    : { limit: 1, offset: page - 1 };
  const { loading, error, data } = useQuery(
    name ? GET_POKEMON_BY_NAME : GET_POKEMON_BY_ID,
    {
      variables: variables,
    }
  );

  // if (loading)
  //   return (
  //     <div className="centered">
  //       <Image src={LoadingGif} alt="LoadingGif" />
  //     </div>
  //   );
  if (error) return <div>Error</div>;

  return (
    <div className="flex flex-col lg:w-full h-full bg-red-600 text-white rounded-3xl shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border-4 border-black">
      <div className="flex gap-5 border-b-4 border-black p-8">
        <div className="bg-blue-400 rounded-full h-10 w-10 border-[3px] border-white shadow-[inset_0_0_5px_rgba(0,0,0,0.3)]"></div>
        <div className="flex gap-2 pt-2">
          <div className="w-3 h-3 bg-red-800 rounded-full border-[1.5px] border-black shadow" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full border-[1.5px] border-black shadow" />
          <div className="w-3 h-3 bg-green-700 rounded-full border-[1.5px] border-black shadow" />
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center justify-start px-10 bg-metal w-full rounded-bl-3xl border-4 border-background">
          <div className="flex w-full gap-10 items-center justify-center p-4">
            <div className="w-3 h-3 rounded-full bg-foreground border-2 border-background"></div>
            <div className="w-3 h-3 rounded-full bg-foreground border-2 border-background"></div>
          </div>
          <div className="w-full">
            <div className="flex flex-col items-center min-w-full gap-6 p-4 bg-background text-foreground rounded-2xl shadow-lg border border-foreground max-w-md">
              {loading ? (
                <div className="centered">
                  <Image src={LoadingGif} alt="LoadingGif" />
                </div>
              ) : (
                data.pokemon_v2_pokemon.map((raw: RawPokemon) => {
                  const pokemon = mapPokemon(raw);
                  return <PokedexCard key={pokemon.id} pokemon={pokemon} />;
                })
              )}
            </div>
          </div>
          <div className="flex w-full gap-10 items-center justify-between py-4">
            <div className="w-5 h-5 rounded-full bg-foreground border-2 border-background"></div>
          </div>
        </div>
      </div>
      <PokedexNavbar page={page} setPage={setPage} setName={setName} />
    </div>
  );
}
