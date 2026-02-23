'use client';

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { taskService } from "@/service/task-service";
import { TaskResponse, TaskStatus } from "@/types/task";
import { Column } from "./components/Task/Column";
import { NewTaskModal } from "./components/Task/Modal/NewTaskModal";
import { EditTaskModal } from "./components/Task/Modal/EditTaskModal";
import { DeleteTaskModal } from "./components/Task/Modal/DeleteTaskModal";
import { toast } from "react-toastify";
import { userService } from "@/service/user-service";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<TaskResponse | null>(null);
  const [deleteTask, setDeleteTask] = useState<TaskResponse | null>(null);

  const columns: { status: TaskStatus; label: string }[] = [
    { status: "PENDING", label: "Pendente" },
    { status: "IN_PROGRESS", label: "Fazendo" },
    { status: "COMPLETE", label: "Completo" },
  ];

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const { data } = await taskService.listAll();
      setTasks(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      var response = await userService.logout()

      localStorage.removeItem("@name");

      toast.success(response.data?.message);
      router.push("/");
    } catch (err) {
      console.error(err);
      router.push("/");
    }
  };

  useEffect(() => {
    setUserName(localStorage.getItem("@name") || "Usuário");
    loadTasks();
  }, []);

  return (
    <>
      <header className="containerHeader">
        <h1 className="title">Sistema de Tarefas</h1>
        <h1>Bem-vindo, {userName}!</h1>
        <button onClick={handleLogout} className="logout">Logout</button>
      </header>

      <main className={styles.mainContainer}>
        <div className={styles.welcomeRow}>
          <button onClick={() => setNewTaskModalOpen(true)} className="btn">
            + Nova Tarefa
          </button>
        </div>

        <div className={styles.columnsContainer}>
          {isLoading ? (
            <p className={styles.infoText}>Carregando...</p>
          ) : (
            columns.map((col) => {
              const filteredTasks = tasks.filter(t => t.statusTasks === col.status);
              return (
                <Column
                  key={col.status}
                  status={col.status}
                  label={col.label}
                  tasks={filteredTasks}
                  onEditClick={(task) => setEditTask(task)}
                  onDeleteClick={(task) => setDeleteTask(task)}
                />
              );
            })
          )}
        </div>
      </main>

      <NewTaskModal
        isOpen={newTaskModalOpen}
        onClose={() => setNewTaskModalOpen(false)}
        onTaskCreated={loadTasks}
      />

      {editTask && (
        <EditTaskModal
          task={editTask}
          isOpen={!!editTask}
          onClose={() => setEditTask(null)}
          onTaskUpdated={loadTasks}
        />
      )}

      {deleteTask && (
        <DeleteTaskModal
          task={deleteTask}
          isOpen={!!deleteTask}
          onClose={() => setDeleteTask(null)}
          onTaskDeleted={loadTasks}
        />
      )}
    </>
  );
}