

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
  export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStats[];
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
  }
  