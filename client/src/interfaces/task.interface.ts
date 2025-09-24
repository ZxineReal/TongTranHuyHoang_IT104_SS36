export interface Task {
  id: string | number;
  taskName: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  completed: boolean;
}

export interface InitialStateType {
  status: "idle" | "pending" | "error";
  data: Task[];
  error: string | null;
  task: Task | null;
  filteredData: Task[];
  searchQuery: string;
  filterStatus: "all" | "completed" | "incomplete";
  filterPriority: "all" | "HIGH" | "MEDIUM" | "LOW";
  editingTask: Task | null;
}