import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

interface IPokemon {
  name: string;
  base_experience: number;
  image: string;
}

interface IBag {
  sum_xp: number;
  pokemon: IPokemon[];
}

interface ITrade {
  ts: string;
  data: {
    status: string;
    bag1: IBag;
    bag2: IBag;
  };
}
export default function Historic() {
  const [trades, setTrades] = useState<ITrade[]>([]);
  useEffect(() => {
    api.get("/trade").then((response) => {
      setTrades(response.data.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Histórico de Trocas - PokeBlue</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.title}>
          <h1>Histórico de trocas</h1>
          <div>
            <Link href="/">
              <a> Home</a>
            </Link>
            <Link href="/trade">
              <a> Trade</a>
            </Link>
          </div>
        </div>
        {trades.map((trade) => (
          <div key={trade.ts} className={styles.content}>
            <div className={styles.titleTrade}>
              <p>{trade.data.status}</p>
              <p>
                Realizada em:{" "}
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(Number(trade.ts) / 1000)}
              </p>
            </div>

            <div className={styles.bags}>
              <div>
                <p>Total XP: {trade.data.bag1.sum_xp}</p>
                {trade.data.bag1.pokemon.map((pokemon, index) => (
                  <div key={index} className={styles.pokemon}>
                    <p>{pokemon.name}</p>
                    <p>{pokemon.image}</p>
                  </div>
                ))}
              </div>
              <div>
                <p>Total XP: {trade.data.bag2.sum_xp}</p>
                {trade.data.bag2.pokemon.map((pokemon, index) => (
                  <div key={index} className={styles.pokemon}>
                    <p>{pokemon.name}</p>
                    <p>{pokemon.image}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
