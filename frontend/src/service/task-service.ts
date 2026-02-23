import { RegisterTaskRequest, UpdateTaskRequest } from "@/types/task";
import { api } from "./api";

export const taskService = {
  async register(data: RegisterTaskRequest) {
    return api.post("/tasks", data);
  },

  async listAll() {
    return api.get("/tasks"); 
  },

  async getById(id: string) {
    return api.get(`/tasks/${id}`);
  },

  async update(id: string, data: UpdateTaskRequest) {
    return api.put(`/tasks/${id}`, data);
  },

  async delete(id: string) {
    return api.delete(`/tasks/${id}`);
  }
};