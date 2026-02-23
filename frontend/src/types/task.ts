

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETE";

export const TaskStatusConfig: Record<TaskStatus, { label: string; color: string; }> = {
  PENDING: {
    label: "Pendente",
    color: "#f59e0b"
  },
  IN_PROGRESS: {
    label: "Fazendo",
    color: "#3b82f6",
  },
  COMPLETE: {
    label: "Completo",
    color: "#10b981", 
  }
};

export interface RegisterTaskRequest {
  title: string;
  description?: string;
}



export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  statusTasks?: TaskStatus;
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  statusTasks: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}