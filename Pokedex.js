import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        setPokemons(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemons();
  }, []);

  const search = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
      const pokemon = {
        name: response.data.name,
        id: response.data.id,
      };
      setPokemons([pokemon]);
    } catch (error) {
      console.error(error);
    }
  };

  const pokemonClick = async (pokemon) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Pokédex</h1>
      <div>
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={search}>Rechercher</button>
      </div>
      <h2>Liste des Pokémon</h2>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} onClick={() => pokemonClick(pokemon)}>
            {pokemon.name} 
            <button >voir details</button>
          </li>
        ))}
      </ul>
      
      {selectedPokemon && (
        <div>
          <h2>Détails du Pokémon</h2>
          <p>Nom : {selectedPokemon.name}</p>
          <p>Numéro : {selectedPokemon.id}</p>
          <p>Poids : {selectedPokemon.weight}</p>
          <p>height : {selectedPokemon.height}</p>
          <p>img : {selectedPokemon.sprites.front_default}</p>
          <img src={selectedPokemon.sprites.front_default}/>
        </div>
      )}
    </div>
  );
};

export default Pokedex;