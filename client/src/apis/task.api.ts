import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import type { Task } from "../interfaces/task.interface";

export const getAllTask = createAsyncThunk("task/getAllTask", async () => {
  const res = axiosInstance.get("tasks");
  return (await res).data;
});

export const addTask = createAsyncThunk(
  "task/addTask",
  async (task: Omit<Task, "id">) => {
    const response = await axiosInstance.post("/tasks", task);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (task: Task) => {
    const response = await axiosInstance.put(`/tasks/${task.id}`, task);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: string | number) => {
    await axiosInstance.delete(`/tasks/${id}`);
    return id;
  }
);
