interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface pokemonSpecy {
  flavorTexts: {
    flavorText: string;
  };
}

interface PokemonMove {
  name: string;
  power: number | null;
  accuracy: number | null;
}
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStats[];
  description: string;
  moves: PokemonMove[];
}

export interface FightingPokemon extends Pokemon {
  health: number,
  className?: string,
  imgClassName?: string,
}

export interface RawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
  pokemon_v2_pokemonabilities: {
    pokemon_v2_ability: {
      name: string;
    };
  }[];
  pokemon_v2_pokemonstats: {
    base_stat: number;
    pokemon_v2_stat: {
      name: string;
    };
  }[];
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemonspeciesflavortexts: {
      flavor_text: string;
      pokemon_v2_language: {
        name: string;
      };
    }[];
  };
  pokemon_v2_pokemonmoves: {
    pokemon_v2_move: PokemonMove;
  }[];
}
