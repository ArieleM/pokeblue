import { SetStateAction, useState } from "react";
import { pokeapi } from "../../services/api";
import styles from "./styles.module.scss";

interface IAllPokemon {
  name: string;
  url: string;
}
interface IBagProps {
  allPokemon: IAllPokemon[];
  setBag: React.Dispatch<SetStateAction<IBag>>;
  bag: IBag;
}
interface IBag {
  sum_xp: number;
  pokemon: IPokemon[];
}

interface IPokemon {
  name: string;
  base_experience: number;
  image: string;
}

export function Bag({ allPokemon, bag, setBag }: IBagProps) {
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

  const handleSelectedPokemon = async (selectedPokemon: IAllPokemon) => {
    if (bag.pokemon.length < 6) {
      const pokemon = await pokeapi.get(`${selectedPokemon.url}`);

      const newPokemon = {
        base_experience: pokemon.data.base_experience,
        image: pokemon.data.sprites.front_default,
        name: pokemon.data.name,
      };

      const newBag: IBag = {
        sum_xp: bag.sum_xp + newPokemon.base_experience,
        pokemon: [...bag.pokemon, newPokemon],
      };

      setBag(newBag);
      setSearch("");
      setFilteredPokemon([]);
    } else {
      alert("Número máximo de pokemon para troca atingido");
      setSearch("");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Bag: {bag.sum_xp}</h1>
      <input
        type="search"
        placeholder="Digite o nome do pokemon"
        value={search}
        onChange={(e) => handleSearchPokemon(e.target.value)}
        onBlur={() => {
          setTimeout(() => {
            setFilteredPokemon([]);
          }, 100);
        }}
      />
      <div className={styles.filter}>
        {filteredPokemon?.map((pokemon) => (
          <div
            className={styles.filterPokemon}
            onClick={(e) => handleSelectedPokemon(pokemon)}
            key={pokemon.name}
          >
            {pokemon.name}
          </div>
        ))}
      </div>
      <div className={styles.listPokemon}>
        {bag?.pokemon.map((pokemon, index) => (
          <div key={index} className={styles.pokemon}>
            <p>{pokemon.name}</p>
            <div>
              <img src={pokemon.image} alt="Imagem" />
              <p>{pokemon.base_experience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
