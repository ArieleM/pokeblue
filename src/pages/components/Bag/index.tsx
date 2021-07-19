import { useState } from "react";
import styles from "./styles.module.scss";

interface IAllPokemon {
  name: string;
  url: string;
}
interface IBagProps {
  allPokemon: IAllPokemon[];
}

export default function Bag({ allPokemon }: IBagProps) {
  const [search, setSearch] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<IAllPokemon[]>([]);

  const handleSearchPokemon = (pokemonSearch: string) => {
    let filteredPokemon = [];
    if (pokemonSearch.length > 0) {
      filteredPokemon = allPokemon.filter((pokemon: IAllPokemon) => {
        return pokemon.name.toUpperCase().includes(pokemonSearch.toUpperCase());
      });
    }
    setFilteredPokemon(filteredPokemon);
    setSearch(pokemonSearch);
  };

  return (
    <div className={styles.container}>
      <h1>Bag</h1>
      <input
        type="search"
        placeholder="Digite o nome do pokemon"
        value={search}
        onChange={(e) => handleSearchPokemon(e.target.value)}
      />
      <div className={styles.filter}>
        {filteredPokemon?.map((pokemon) => (
          <div className={styles.filterPokemon} key={pokemon.name}>
            {pokemon.name}
          </div>
        ))}
      </div>
      <div className={styles.pokemon}>
        <p>Charmander</p>
        <div>
          <img src="pokemon.image" alt="Imagem" />
          <p>59</p>
        </div>
      </div>
      <div className={styles.pokemon}>
        <p>Caterpie</p>
        <div>
          <img src="pokemon.image" alt="Imagem" />
          <p>39</p>
        </div>
      </div>
    </div>
  );
}
