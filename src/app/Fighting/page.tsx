"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME } from "@/api/FetchPokemon";
import mapPokemon from "@/functions/functions";
import CurrentPokemon from "@/components/currentPokemon/CurrentPokemon";

export default function FightingPage() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { data, loading, error } = useQuery(GET_POKEMON_BY_ID, {
    variables: { limit: 1, offset: id - 1 },
  });

  const { data: staticData, loading: staticLoading, error: staticError } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { limit: 1, name: "Bulbasaur" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon</p>;

  const pokemon = mapPokemon(data.pokemon_v2_pokemon[0]);
  const staticPokemon = mapPokemon(staticData.pokemon_v2_pokemon[0])

  return (
    <div className="flex h-screen w-screen items-center justify-between">
      <CurrentPokemon pokemon={pokemon} />
      <CurrentPokemon pokemon={staticPokemon} className="items-end" imgClassName="rotate-180 rotate-x-180"/>
    </div>
  );
}
