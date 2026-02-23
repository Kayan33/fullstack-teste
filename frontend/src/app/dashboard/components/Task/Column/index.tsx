import styles from "./styles.module.css";
import { TaskResponse, TaskStatus, TaskStatusConfig } from "@/types/task";

interface ColumnProps {
  status: TaskStatus;
  label: string;
  tasks: TaskResponse[];
  onEditClick: (task: TaskResponse) => void;
  onDeleteClick: (task: TaskResponse) => void;
}

export function Column({ status, label, tasks, onEditClick, onDeleteClick }: ColumnProps) {
  const config = TaskStatusConfig[status];

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h2 style={{ borderLeft: `4px solid ${config.color}`, paddingLeft: '10px' }}>
          {label}
        </h2>
        <span className={styles.countBadge}>{tasks.length}</span>
      </div>

      <div className={styles.columnList}>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div className={styles.card} key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className={styles.cardFooter}>
                <button className="btn" onClick={() => onEditClick(task)}>Editar</button>
                <button className="btn-delet" onClick={() => onDeleteClick(task)}>Deletar</button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyText}>Sem tarefas</p>
        )}
      </div>
    </div>
  );
}