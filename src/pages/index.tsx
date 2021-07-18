import Head from "next/head";
import styles from "./home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio - PokeBlue</title>
      </Head>
      <main className={styles.contentContainer}>
        <aside>
          <img src="/images/pokeball.png" alt="Pokebola" />
        </aside>
        <aside>
          <h1>PokeBlue</h1>
          <h3>A sua calculadora de trocas.</h3>
          <p>Descubra se a troca que deseja realizar é justa!</p>
          <p>
            Cada treinador deve ofertar de 1 a 6 pokémon em cada troca. Através
            da soma das experiências de cada pokémon, a PokeBlue informará se
            uma troca é justa ou não, considerando uma margem de 7% (1% para
            cada geração) para que nenhum treinador saia perdendo!
          </p>
          <Link href="/trade">
            <a>Começar a trocar</a>
          </Link>
        </aside>
      </main>
    </>
  );
}
