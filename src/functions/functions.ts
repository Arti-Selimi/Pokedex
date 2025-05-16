import { Pokemon, RawPokemon } from "@/types/pokemon";

export default function mapPokemon(rawPokemon: RawPokemon): Pokemon {
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
    description:
      rawPokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts.find(
        (d) => d.pokemon_v2_language.name === "en"
      )?.flavor_text || "No description available",
      moves: rawPokemon.pokemon_v2_pokemonmoves.slice(4, 8).map((m) => ({
        name: m.pokemon_v2_move.name,
        power: m.pokemon_v2_move.power,
        accuracy: m.pokemon_v2_move.accuracy,
      })),
  };
}
