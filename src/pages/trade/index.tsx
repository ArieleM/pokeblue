import { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import Bag from "../components/Bag";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import { api, pokeapi } from "../../services/api";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

interface IAllPokemon {
  name: string;
  url: string;
}

interface TradeProps {
  allPokemon: IAllPokemon[];
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
export default function Trade({ allPokemon }: TradeProps) {
  const [bag1, setBag1] = useState<IBag>({ sum_xp: 0, pokemon: [] });
  const [bag2, setBag2] = useState<IBag>({ sum_xp: 0, pokemon: [] });

  const handleTrade = async () => {
    if (bag1.pokemon.length >= 1 && bag2.pokemon.length >= 1) {
      const trade = await api.post("/trade", { bag1, bag2 });
      if (trade.status === 200) {
        trade.data.status === "Troca Justa"
          ? toast.success(trade.data.status)
          : toast.dark(trade.data.status);
        setBag1({ sum_xp: 0, pokemon: [] });
        setBag2({ sum_xp: 0, pokemon: [] });
        toast.info("Para mais informações, verifique o histórico.");
      }
    } else {
      toast.warning("Cada bag deve ter pelo menos 1 pokemon");
    }
  };

  return (
    <>
      <Head>
        <title>Trocas - PokeBlue</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.title}>
          <h1>Temos que trocar!</h1>
          <div>
            <Link href="/">
              <a>
                {" "}
                <HomeIcon />
                <p>Home</p>
              </a>
            </Link>
            <Link href="/historic">
              <a>
                <HistoryIcon /> Historico
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.bags}>
          <Bag allPokemon={allPokemon} bag={bag1} setBag={setBag1} />

          <div onClick={handleTrade} className={styles.trade}>
            <img
              className={styles.image}
              src="/images/transferpoke.png"
              alt="Trocar"
            />
            <p>Trocar</p>
          </div>

          <Bag allPokemon={allPokemon} bag={bag2} setBag={setBag2} />
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeapi.get("/pokemon/?limit=1118");
  const allPokemon: IAllPokemon[] = await data.results;

  return {
    props: {
      allPokemon,
    },
    revalidate: 60 * 60 * 24, //24h
  };
};
