'use client';

import Link from "next/link";
import stylesAuth from "../auth.module.css";
import { FormEvent, useState } from "react";
import { userService } from "@/service/user-service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await userService.login({ email, password });

      localStorage.setItem("@name", response.data.user.name);

      toast.success(response.data?.message);

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <header className="containerHeader">
        <h1 className="title">Sistema de Tarefas</h1>

        <div>
          <Link href="/register" className="btn">
            CADASTRE-SE
          </Link>
        </div>
      </header>

      <section className={stylesAuth.section}>
        <div className={stylesAuth.card}>
          <h2 className={stylesAuth.cardTitle}>Entrar na sua conta</h2>

          <form className={stylesAuth.form} onSubmit={handleRegister}>
            <div className={stylesAuth.formGroup}>
              <label className="label">Email</label>
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
                placeholder="••••••••"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn">
              {loading ? "Carregando..." : "Entrar"}
            </button>
          </form>

          <p className={stylesAuth.footerText}>
            Não possui conta?{" "}
            <Link href="/register" className={stylesAuth.footerLink}>
              Criar conta
            </Link>
          </p>
        </div>
      </section>

    </>
  );
}