import { useState } from "react";
import styles from "./styles.module.scss";

export default function Bag() {
  const [search, setSearch] = useState("");
  return (
    <div className={styles.container}>
      <h1>Bag</h1>
      <input
        type="search"
        placeholder="Digite o nome do pokemon"
        value={search}
      />
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
