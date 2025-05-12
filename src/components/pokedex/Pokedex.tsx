import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "@/api/FetchPokemon";
import PokedexCard from "./PokedexCard";
import { Pokemon } from "@/types/pokemon";

interface Props {}

export default function Pokedex({}: Props) {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { limit: 10, offset: 0 }, // Example: First 10 Pokémon
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col bg-red-600 text-white rounded-3xl shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border-4 border-black">
      <div className="flex gap-5 border-b-4 border-black p-8">
        <div className="bg-blue-400 rounded-full h-10 w-10 border-[3px] border-white shadow-[inset_0_0_5px_rgba(0,0,0,0.3)]"></div>
        <div className="flex gap-2 pt-2">
          <div className="w-3 h-3 bg-red-800 rounded-full border-[1.5px] border-black shadow" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full border-[1.5px] border-black shadow" />
          <div className="w-3 h-3 bg-green-700 rounded-full border-[1.5px] border-black shadow" />
        </div>
      </div>

      {/* Pass the fetched data to the PokedexCard */}
      {data.pokemon_v2_pokemon.map((pokemon: Pokemon) => (
        <PokedexCard key={pokemon.id} pokemon={pokemon} />
      ))}

      <div className="h-10"></div>
    </div>
  );
}
