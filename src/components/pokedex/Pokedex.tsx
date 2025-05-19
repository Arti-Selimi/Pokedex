"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME } from "@/api/FetchPokemon";
import PokedexCard from "./PokedexCard";
import PokedexNavbar from "./PokedexNavbar";
import { RawPokemon } from "@/types/pokemon";
import mapPokemon from "@/functions/functions";
import Loading from "../loading/Loading";
import { useGlobalStore } from "@/store/useGlobalStore";

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

  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="flex flex-col lg:w-full h-full bg-red-600 text-white rounded-3xl shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border-4 border-black">
      <div className="flex gap-2 border-b-4 border-black p-2">
        <div className="bg-blue-400 rounded-full h-10 w-10 border-2 border-white shadow-[inset_0_0_5px_rgba(0,0,0,0.3)]"></div>
        <div className="flex gap-1 pt-2">
          <div className="w-3 h-3 bg-red-800 rounded-full border-1 border-black shadow" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full border-1 border-black shadow" />
          <div className="w-3 h-3 bg-green-700 rounded-full border-1 border-black shadow" />
        </div>
      </div>
      <div className="flex items-center justify-center p-1">
        <div className="flex flex-col items-center justify-start px-10 pb-2 bg-metal w-full rounded-bl-3xl border-4 border-background">
          <div className="flex w-full gap-5 items-center justify-center p-2">
            <div className="w-3 h-3 rounded-full bg-foreground border-2 border-background"></div>
            <div className="w-3 h-3 rounded-full bg-foreground border-2 border-background"></div>
          </div>
          <div className="w-full">
            <div className="flex flex-col items-center min-w-full gap-1 p-2 bg-background text-foreground rounded-[5px] shadow-lg border border-foreground max-w-md">
              {loading ? (
                <Loading />
              ) : data?.pokemon_v2_pokemon?.length === 0 ? (
                <div className="flex flex-col items-center text-center p-10 gap-2">
                  <h1 className="text-3xl">ERROR</h1>
                  <p>
                    Sorry user, no pokemon could be found with that name, please
                    try a different name or just use the pagination buttons on
                    the right side of the input
                  </p>

                  
                </div>
              ) : (
                data.pokemon_v2_pokemon.map((raw: RawPokemon) => {
                  const pokemon = mapPokemon(raw);
                  return <PokedexCard key={pokemon.id} pokemon={pokemon} />;
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <PokedexNavbar page={page} setPage={setPage} setName={setName} />
    </div>
  );
}
