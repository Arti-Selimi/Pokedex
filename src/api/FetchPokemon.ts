import { gql } from "@apollo/client";

export const GET_POKEMON_BY_ID = gql`
  query GetPokemonPage($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 } }
        ) {
          flavor_text
          pokemon_v2_language {
            name
          }
        }
      }
      pokemon_v2_pokemonmoves {
        pokemon_v2_move {
          name
          power
          accuracy
        }
      }
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  query GetPokemonPage($limit: Int!, $name: String!) {
    pokemon_v2_pokemon(limit: $limit, where: { name: { _ilike: $name } }) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 } }
        ) {
          flavor_text
          pokemon_v2_language {
            name
          }
        }
      }
      pokemon_v2_pokemonmoves {
        pokemon_v2_move {
          name
          power
          accuracy
        }
      }
    }
  }
`;
