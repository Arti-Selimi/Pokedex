"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_ID } from "@/api/FetchPokemon";
import mapPokemon from "@/functions/functions";
import CurrentPokemon from "@/components/currentPokemon/CurrentPokemon";
import SoftAlert from "@/components/alert/SoftAlert";
import GameEndAlert from "@/components/alert/GameEndAlert";
import {
  PlayerToDemo,
  DemoToPlayer,
  InvalidTurn,
} from "@/functions/Fightingfunctions";
import Loading from "@/components/loading/Loading";

export default function FightingPage() {
  const [health, setHealth] = useState<number | null>(null);
  const [staticHealth, setStaticHealth] = useState<number | null>(null);
  const [turn, setTurn] = useState<0 | 1>(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const { data, loading, error } = useQuery(GET_POKEMON_BY_ID, {
    variables: { limit: 1, offset: id - 1 },
  });

  const [staticDemoID] = useState(() => Math.floor(Math.random() * 101) + 1);

  const {
    data: staticData,
    loading: staticLoading,
    error: staticError,
  } = useQuery(GET_POKEMON_BY_ID, {
    variables: { limit: 1, offset: staticDemoID - 1 },
  });

  if (loading || staticLoading) return <Loading />;
  if (error || staticError) return <p>Error loading Pokémon</p>;

  const pokemon = mapPokemon(data.pokemon_v2_pokemon[0]);
  const staticPokemon = mapPokemon(staticData.pokemon_v2_pokemon[0]);

  if (health === null) setHealth(pokemon.stats[0].base_stat);
  if (staticHealth === null) setStaticHealth(staticPokemon.stats[0].base_stat);

  const handleTurn = (
    move: { name: string; power: number; accuracy: number },
    damageTaker: string
  ) => {
    if(gameOver) return
    if (turn === 0 && damageTaker === "health") {
      PlayerToDemo(setStaticHealth, setAlertMessage, setTurn, move);
    } else if (turn === 1 && damageTaker === "staticHealth") {
      DemoToPlayer(setHealth, setAlertMessage, setTurn, move);
    } else {
      InvalidTurn(setAlertMessage);
    }
  };

  console.log(health === 0 || staticHealth === 0 && gameOver === false )

  if((health === 0 || staticHealth === 0) && gameOver === false) setGameOver(true)
  
  return (
    <div className="grid grid-cols-2 gap-100 px-10 h-screen w-screen">
      {gameOver ? (
        <GameEndAlert
          winner={
            health !== null && health <= 0
              ? staticPokemon.name + "(computer)"
              : pokemon.name + "(you)"
          }
        />
      ) : null}
      {alertMessage && <SoftAlert content={alertMessage} />}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 border-2 border-black bg-foreground p-5 rounded-2xl text-accent text-lg shadow-2xl">
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
        turn={turn}
      />
    </div>
  );
}
