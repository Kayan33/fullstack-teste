import { api } from "./api";
import { LoginCredentials, RegisterUserRequest, UpdateUserRequest } from "../types/user";

export const userService = {
  async register(data: RegisterUserRequest) {
    return api.post("/user", data);
  },

  async login(credentials: LoginCredentials) {
    return api.post("/authentication/login", credentials);
  },

  async logout() {
    return api.post("/authentication/logout");
  },

  async listAll() {
    return api.get("/user"); 
  },

  async getById(id: string) {
    return api.get(`/user/${id}`);
  },

  async update(id: string, data: UpdateUserRequest) {
    return api.put(`/user/${id}`, data);
  },

  async delete(id: string) {
    return api.delete(`/user/${id}`);
  }
};