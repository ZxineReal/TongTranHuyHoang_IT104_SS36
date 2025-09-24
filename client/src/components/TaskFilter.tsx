import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useRedux";
import { setFilterPriority, setSearchQuery, setFilterStatus } from "../redux/slices/task.slice";

export default function TaskFilter() {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterStatus(e.target.value));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterPriority(e.target.value));
  };

  return (
    <div>
      <div className="p-3 bg-white flex rounded-xl shadow-lg gap-3">
        <div className="flex relative">
          <label className="absolute -top-3 text-sm text-gray-500 bg-white ml-3" htmlFor="status">
            Trạng thái
          </label>
          <select
            className="border p-1 rounded"
            id="status"
            onChange={handleStatusChange}
          >
            <option value="all">Tất cả</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="incomplete">Chưa hoàn thành</option>
          </select>
        </div>
        <div className="flex relative">
          <label className="absolute -top-3 text-sm text-gray-500 bg-white ml-3" htmlFor="priority">
            Ưu tiên
          </label>
          <select
            className="border p-1 rounded"
            id="priority"
            onChange={handlePriorityChange}
          >
            <option value="all">Tất cả</option>
            <option value="HIGH">Cao</option>
            <option value="MEDIUM">Trung bình</option>
            <option value="LOW">Thấp</option>
          </select>
        </div>
        <input
          className="border p-1 rounded"
          type="text"
          placeholder="Tìm kiếm"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}