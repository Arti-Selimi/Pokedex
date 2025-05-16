"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_ID } from "@/api/FetchPokemon";
import mapPokemon from "@/functions/functions";
import Image from "next/image";
import CurrentPokemon from "@/components/currentPokemon/CurrentPokemon";

export default function FightingPage() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { data, loading, error } = useQuery(GET_POKEMON_BY_ID, {
    variables: { limit: 1, offset: id - 1 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon</p>;

  const pokemon = mapPokemon(data.pokemon_v2_pokemon[0]);

  console.log(pokemon);
  return (
    <div>
      <CurrentPokemon pokemon={pokemon} />
      <CurrentPokemon pokemon={pokemon} />
    </div>
  );
}
