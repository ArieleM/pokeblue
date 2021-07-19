import Head from "next/head";
import styles from "./styles.module.scss";
import Bag from "../components/Bag";
import { GetStaticProps } from "next";
import { pokeapi } from "../../services/api";

interface IAllPokemon {
  name: string;
  url: string;
}

interface TradeProps {
  allPokemon: IAllPokemon[];
}

export default function Trade({ allPokemon }: TradeProps) {
  console.log(allPokemon);

  return (
    <>
      <Head>
        <title>Trocas - PokeBlue</title>
      </Head>
      <main className={styles.container}>
        <h1>Temos que trocar!</h1>
        <div style={{ display: "flex" }}>
          <Bag allPokemon={allPokemon} />
          <button>Troca</button>
          <Bag allPokemon={allPokemon} />
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
