"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME } from "@/api/FetchPokemon";
import PokedexCard from "./PokedexCard";
import { Pokemon, RawPokemon } from "@/types/pokemon";
import PokedexNavbar from "./PokedexNavbar";

interface Props {}

export default function Pokedex({}: Props) {
  const [name, setName] = useState("")
  const [page, setPage] = useState(1);
  const variables = name
  ? { limit: 1, name: `%${name}%` }
  : { limit: 1, offset: page - 1 };
  const { loading, error, data } = useQuery(name ? GET_POKEMON_BY_NAME : GET_POKEMON_BY_ID, {
    variables: variables,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  function mapPokemon(rawPokemon: RawPokemon): Pokemon {
    return {
      id: rawPokemon.id,
      name: rawPokemon.name,
      height: rawPokemon.height,
      weight: rawPokemon.weight,
      base_experience: rawPokemon.base_experience,
      types: rawPokemon.pokemon_v2_pokemontypes.map((t) => ({
        type: { name: t.pokemon_v2_type.name },
      })),
      abilities: rawPokemon.pokemon_v2_pokemonabilities.map((a) => ({
        ability: { name: a.pokemon_v2_ability.name },
      })),
      stats: rawPokemon.pokemon_v2_pokemonstats.map((s) => ({
        base_stat: s.base_stat,
        stat: { name: s.pokemon_v2_stat.name },
      })),
    };
  }

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
      <PokedexNavbar page={page} setPage={setPage} name={name} setName={setName} />
      <div className="flex flex-col gap-8 p-8">
        {data.pokemon_v2_pokemon.map((raw: RawPokemon) => {
          const pokemon = mapPokemon(raw);
          return <PokedexCard key={pokemon.id} pokemon={pokemon} setPage={setPage} />;
        })}
      </div>

      <div className="h-10"></div>
    </div>
  );
}
