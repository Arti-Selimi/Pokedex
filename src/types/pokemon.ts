

export interface PokemonStats {
    base_stat: number;
    stat: {
      name: string;
    };
  }
  
  export interface PokemonAbility {
    ability: {
      name: string;
    };
  }
  
  export interface PokemonType {
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
  