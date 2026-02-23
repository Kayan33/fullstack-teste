'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "./page.module.css";
import stylesAuth from "../auth.module.css";
import { userService } from "@/service/user-service";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();


    try {
      const response = await userService.register({ name, email, password });

      toast.success(response.data?.message || "Cadastro realizado com sucesso!");

      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  }

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

      <section className={stylesAuth.section}>
        <div className={styles.welcomeContent}>
          <h2 className={styles.welcomeTitle}>Crie sua conta gratuita</h2>
          <p className={styles.welcomeDescription}>
            Junte-se a milhares de usuários e organize sua rotina de forma profissional.
          </p>
        </div>

        <div className={stylesAuth.card}>
          <form className={stylesAuth.form} onSubmit={handleRegister}>
            <div className={stylesAuth.formGroup}>
              <label className="label">Nome Completo</label>
              <input
                type="text"
                placeholder="Ex: Kayan Pereira"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={stylesAuth.formGroup}>
              <label className="label">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={stylesAuth.formGroup}>
              <label className="label">Senha</label>
              <input
                type="password"
                placeholder="Crie uma senha forte"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn"
            >
              Finalizar Cadastro
            </button>
          </form>

          <p className={stylesAuth.footerText}>
            Já possui conta?{" "}
            <Link href="/login" className={stylesAuth.footerLink}>
              Faça o login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}