import type { Metadata } from "next";
import "@/styles/globals.css";
import ToastProvider from '@/components/Toast/ToastProvider';


export const metadata: Metadata = {
  title: "Sistema de tarefas",
  description: "Muito mais que um sistema de tarefa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <ToastProvider />
    </main>
  );
}
