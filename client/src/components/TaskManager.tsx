import React from "react";
import TaskInput from "./TaskInput";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import { FileCheck } from "lucide-react";

export default function TaskManager() {
  return (
    <div className="bg-gray-100 w-screen h-screen p-3 flex flex-col items-center gap-3">
      <div className=" p-5 flex flex-col gap-3 rounded ">
        <h1 className="font-bold text-xl flex">
          <FileCheck />
          TASK MANAGER
        </h1>
        <TaskInput />
        <TaskFilter />
        <TaskList />
      </div>
    </div>
  );
}
