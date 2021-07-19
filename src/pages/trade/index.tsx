import Head from "next/head";
import styles from "./styles.module.scss";
import Bag from "../components/Bag";

export default function Trade() {
  return (
    <>
      <Head>
        <title>Trocas - PokeBlue</title>
      </Head>
      <main className={styles.container}>
        <h1>Temos que trocar!</h1>
        <div style={{ display: "flex" }}>
          <Bag />
          <Bag />
        </div>
      </main>
    </>
  );
}
