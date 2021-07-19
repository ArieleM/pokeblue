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
    </div>
  );
}
