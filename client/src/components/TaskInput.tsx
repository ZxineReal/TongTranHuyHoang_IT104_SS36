import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { addTask, updateTask } from "../apis/task.api";
import { clearEditingTask } from "../redux/slices/task.slice";

export default function TaskInput() {
  const dispatch = useAppDispatch();
  const editingTask = useAppSelector((state) => state.task.editingTask);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.taskName);
      setPriority(editingTask.priority);
    } else {
      setTaskName("");
      setPriority("MEDIUM");
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      if (editingTask) {
        dispatch(updateTask({ ...editingTask, taskName, priority }));
      } else {
        dispatch(addTask({ taskName, priority, completed: false }));
      }
      setTaskName("");
      setPriority("MEDIUM");
      dispatch(clearEditingTask());
    }
  };

  return (
    <div>
      <form className="p-3 flex shadow-lg bg-white rounded-xl gap-3" onSubmit={handleSubmit}>
        <input
          className="border rounded px-3 py-1 border-gray-500"
          type="text"
          placeholder="Công việc mới"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <div className="flex relative">
          <label
            className="text-sm text-gray-500 absolute bg-white ml-3 -top-3"
            htmlFor="priority"
          >
            Ưu tiên
          </label>
          <select
            className="border p-1 rounded border-gray-500"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as "HIGH" | "MEDIUM" | "LOW")}
          >
            <option value="HIGH">Cao</option>
            <option value="MEDIUM">Trung bình</option>
            <option value="LOW">Thấp</option>
          </select>
        </div>
        <button
          className="bg-blue-600 rounded px-3 py-1 text-white cursor-pointer hover:bg-blue-500"
          type="submit"
        >
          {editingTask ? "Lưu" : "Thêm"}
        </button>
      </form>
    </div>
  );
}