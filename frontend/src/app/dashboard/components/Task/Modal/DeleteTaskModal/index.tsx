import styles from "../modal.module.css";
import { TaskResponse } from "@/types/task";
import { taskService } from "@/service/task-service";
import { toast } from "react-toastify";

interface DeleteTaskModalProps {
  task: TaskResponse;
  isOpen: boolean;
  onClose: () => void;
  onTaskDeleted: () => void;
}

export function DeleteTaskModal({ task, isOpen, onClose, onTaskDeleted }: DeleteTaskModalProps) {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const response = await taskService.delete(task.id);
      onTaskDeleted();
      onClose();
      toast.success(response.data?.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Deletar Tarefa</h2>
        <p>Tem certeza que deseja deletar "{task.title}"?</p>
        <div className={styles.modalActions}>
          <button onClick={handleDelete} className={styles.deleteBtn}>Deletar</button>
          <button onClick={onClose} className={styles.cancelBtn}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}