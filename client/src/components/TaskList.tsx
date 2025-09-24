import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { getAllTask } from "../apis/task.api";
import { HashLoader } from "react-spinners";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { filteredData: tasks, error, status } = useAppSelector((store) => store.task);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch]);

  if (error) return <h1 className="text-red-500">Đã có lỗi xảy ra: {error}</h1>;

  return (
    <div className="w-full max-w-md">
      {status === "pending" && (
        <div className="flex justify-center">
          <HashLoader />
        </div>
      )}
      {tasks.length === 0 && status !== "pending" && (
        <p className="text-center text-gray-500">Không có công việc nào</p>
      )}
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </div>
  );
}