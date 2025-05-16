"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME } from "@/api/FetchPokemon";
import mapPokemon from "@/functions/functions";
import CurrentPokemon from "@/components/currentPokemon/CurrentPokemon";
import SoftAlert from "@/components/alert/SoftAlert";
import GameEndAlert from "@/components/alert/GameEndAlert";

export default function FightingPage() {
  const [health, setHealth] = useState<number | null>(null);
  const [staticHealth, setStaticHealth] = useState<number | null>(null);
  const [turn, setTurn] = useState<0 | 1>(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const { data, loading, error } = useQuery(GET_POKEMON_BY_ID, {
    variables: { limit: 1, offset: id - 1 },
  });

  const {
    data: staticData,
    loading: staticLoading,
    error: staticError,
  } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { limit: 1, name: "Bulbasaur" },
  });

  if (loading || staticLoading) return <p>Loading...</p>;
  if (error || staticError) return <p>Error loading Pokémon</p>;

  const pokemon = mapPokemon(data.pokemon_v2_pokemon[0]);
  const staticPokemon = mapPokemon(staticData.pokemon_v2_pokemon[0]);

  if (health === null) setHealth(pokemon.stats[0].base_stat);
  if (staticHealth === null) setStaticHealth(staticPokemon.stats[0].base_stat);

  if (health === null || staticHealth === null) {
    return <p>Initializing health...</p>;
  }

  const handleTurn = (
    move: { name: string; power: number; accuracy: number },
    damageTaker: string
  ) => {
    console.log(move);
    if (turn === 0) {
      if (damageTaker === "health") {
        setStaticHealth((prev) => prev! - move.power);
        setAlertMessage(
          `You attacked with ${move.name} for ${move.power} damage.`
        );
        setTimeout(() => setAlertMessage(null), 2000);
        setTurn(1);
      } else {
        setAlertMessage("Not your turn, please wait for the other player.");
        setTimeout(() => setAlertMessage(null), 2000);
      }
    } else {
      if (damageTaker === "health") {
        setAlertMessage("Not your turn, please wait for the other player.");
        setTimeout(() => setAlertMessage(null), 2000);
      } else {
        setHealth((prev) => prev! - move.power);
        setAlertMessage(
          `Enemy attacked with ${move.name} for ${move.power} damage.`
        );
        setTurn(0);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-between">
      {(health !== null && health <= 0) ||
      (staticHealth !== null && staticHealth <= 0) ? (
        <GameEndAlert
          winner={
            health !== null && health <= 0 ? staticPokemon.name + "(computer)" : pokemon.name + "(you)"
          }
        />
      ) : null}
      {alertMessage && <SoftAlert content={alertMessage} />}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 border-2 border-black bg-foreground p-5 rounded-2xl text-accent text-2xl shadow-2xl">
        {turn === 0 ? "Your turn" : "Enemy turn"}
      </div>
      <CurrentPokemon
        id="dynamic"
        handleTurn={handleTurn}
        health={health}
        pokemon={pokemon}
      />
      <CurrentPokemon
        id="static"
        handleTurn={handleTurn}
        health={staticHealth}
        pokemon={staticPokemon}
        className="items-end"
        imgClassName="rotate-180 rotate-x-180"
      />
    </div>
  );
}
