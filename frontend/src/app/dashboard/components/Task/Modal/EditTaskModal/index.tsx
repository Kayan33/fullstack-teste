import { useState, useEffect } from "react";
import styles from "../modal.module.css"; 
import { TaskResponse, TaskStatus } from "@/types/task";
import { taskService } from "@/service/task-service";
import { toast } from "react-toastify";

interface EditTaskModalProps {
  task: TaskResponse;
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdated: () => void;
}

const statusOptions: { label: string; value: TaskStatus }[] = [
  { label: "Pendente", value: "PENDING" },
  { label: "Fazendo", value: "IN_PROGRESS" },
  { label: "Completo", value: "COMPLETE" },
];

export function EditTaskModal({ task, isOpen, onClose, onTaskUpdated }: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [statusTasks, setStatusTasks] = useState<TaskStatus>(task.statusTasks);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setStatusTasks(task.statusTasks);
  }, [task]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const response = await taskService.update(task.id, { title, description, statusTasks });
      onTaskUpdated();
      onClose();
      toast.success(response.data?.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Editar Tarefa</h2>

        <div className={styles.formGroup}>
          <label>Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>Descrição</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </div>

        <div className={styles.formGroup}>
          <label>Status</label>
          <select value={statusTasks} onChange={(e) => setStatusTasks(e.target.value as TaskStatus)}>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.modalActions}>
          <button onClick={handleSave} className="btn">Salvar</button>
          <button onClick={onClose} className={styles.cancelBtn}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}