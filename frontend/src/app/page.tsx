import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className="containerHeader">
        <h1 className="title">Sistema de Tarefas</h1>

        <div>
          <Link href="/login" className="btn">
            LOGIN
          </Link>
        </div>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Cadastre tarefas do cotidiano para não esquecer
        </h1>

        <p className={styles.heroText}>
          muito mais que um sistema de tarefas
        </p>

        <Link href="/register" className="btn">
          CADASTRE-SE
        </Link>
      </section>
    </>
  );
}