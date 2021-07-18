import Head from "next/head";
import { useEffect, useState } from "react";
import { api } from "../services/api";
interface IPokemon {
  name: string;
  base_experience: number;
}

interface IBag {
  sum_experience: number;
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
      <main>
        <h1>Histórico de trocas</h1>
        {trades.map((trade) => (
          <div key={trade.ts}>
            <div style={{ display: "flex" }}>
              <p>
                Realizada em:{" "}
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(Number(trade.ts) / 1000)}
              </p>
              <p>{trade.data.status}</p>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ border: "1px solid black" }}>
                <p>{trade.data.bag1.sum_experience}</p>
                {trade.data.bag1.pokemon.map((pokemon) => (
                  <div key={pokemon.name}>
                    <p>{pokemon.name}</p>
                    <p>{pokemon.base_experience}</p>
                  </div>
                ))}
              </div>
              <div style={{ border: "1px solid blue" }}>
                <p>{trade.data.bag2.sum_experience}</p>
                {trade.data.bag2.pokemon.map((pokemon) => (
                  <div key={pokemon.name}>
                    <p>{pokemon.name}</p>
                    <p>{pokemon.base_experience}</p>
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
