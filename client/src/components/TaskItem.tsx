import React, { useState } from "react";
import type { Task } from "../interfaces/task.interface";
import { useAppDispatch } from "../hooks/useRedux";
import { Pencil, Trash, X } from "lucide-react";
import { updateTask, deleteTask, } from "../apis/task.api";
import { setEditingTask } from "../redux/slices/task.slice";

type TaskTypes = {
  task: Task;
};

export default function TaskItem({ task }: TaskTypes) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleToggleComplete = () => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleEdit = () => {
    dispatch(setEditingTask(task));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    setShowDeleteModal(false);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="flex justify-between items-center p-2 bg-white rounded shadow mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
          />
          {task.completed ? <s>{task.taskName}</s> : <p>{task.taskName}</p>}
          <p
            className={`ml-2 ${
              task.priority === "HIGH"
                ? "text-red-500"
                : task.priority === "MEDIUM"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {task.priority}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleEdit}>
            <Pencil className="text-blue-500" />
          </button>
          <button onClick={openDeleteModal}>
            <Trash className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-red-600">Xác nhận xóa</h3>
              <button onClick={closeDeleteModal}>
                <X className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <p className="mb-4">
              Bạn có chắc chắn muốn xóa công việc "{task.taskName}" không? 
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
