import { createSlice } from "@reduxjs/toolkit";
import type { InitialStateType } from "../../interfaces/task.interface";
import {
  getAllTask,
  addTask,
  updateTask,
  deleteTask,
} from "../../apis/task.api";

const initialState: InitialStateType = {
  status: "idle",
  data: [],
  error: null,
  task: null,
  filteredData: [],
  searchQuery: "",
  filterStatus: "all",
  filterPriority: "all",
  editingTask: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTaskDetail(state, action) {
      state.task = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.filteredData = applyFilters(state);
    },
    setFilterStatus(state, action) {
      state.filterStatus = action.payload;
      state.filteredData = applyFilters(state);
    },
    setFilterPriority(state, action) {
      state.filterPriority = action.payload;
      state.filteredData = applyFilters(state);
    },
    setEditingTask(state, action) {
      state.editingTask = action.payload;
    },
    clearEditingTask(state) {
      state.editingTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
        state.filteredData = applyFilters(state);
      })
      .addCase(getAllTask.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Có lỗi xảy ra";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.filteredData = applyFilters(state);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message || "Không thể thêm task";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
          state.filteredData = applyFilters(state);
          state.editingTask = null;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message || "Không thể sửa task";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.data = state.data.filter((task) => task.id !== action.payload);
        state.filteredData = applyFilters(state);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message || "Không thể xóa task";
      });
  },
});

function applyFilters(state: InitialStateType) {
  let filtered = state.data;
  if (state.searchQuery) {
    filtered = filtered.filter((task) =>
      task.taskName.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }
  if (state.filterStatus !== "all") {
    filtered = filtered.filter((task) =>
      state.filterStatus === "completed" ? task.completed : !task.completed
    );
  }
  if (state.filterPriority !== "all") {
    filtered = filtered.filter(
      (task) => task.priority === state.filterPriority
    );
  }
  return filtered;
}

export const {
  getTaskDetail,
  setSearchQuery,
  setFilterStatus,
  setFilterPriority,
  setEditingTask,
  clearEditingTask,
} = taskSlice.actions;
export default taskSlice.reducer;
