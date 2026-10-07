import { useState, useEffect } from "react";
import { createTask, deleteTask, editTask, getTasks } from "../api/authApi";
import { toast } from "react-hot-toast";
import {
  Plus,
  ArrowRight,
  ClipboardList,
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";
const TaskManager = () => {
  const [taskList, setTaskList] = useState([]);
  const [tasks, setTasks] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "High",
    dueDate: "",
  });
  const [editTaskId, setEditTaskId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All Tasks");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTasks((allTask) => ({
      ...allTask,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        let data = await getTasks();
        setTaskList(data.tasks || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchTask();
  }, []);

  // Create Task Handler
  const addTaskHandler = async () => {
    if (editTaskId !== null) {
      try {
        await editTask(editTaskId, tasks);
        setTaskList((allTask) =>
          allTask.map((t) =>
            t._id === editTaskId
              ? {
                  _id: editTaskId,
                  title: tasks.title,
                  description: tasks.description,
                  status: tasks.status,
                  priority: tasks.priority,
                  dueDate: tasks.dueDate,
                }
              : t,
          ),
        );
        toast.success("Task edited successfully");
        setTasks({
          title: "",
          description: "",
          status: "Pending",
          priority: "High",
          dueDate: "",
        });
        setEditTaskId(null);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } else {
      try {
        const data = await createTask(tasks);
        setTaskList((prevTask) => [...prevTask, data.task]);
        toast.success("Task created successfully");

        setTasks({
          title: "",
          description: "",
          status: "Pending",
          priority: "High",
          dueDate: "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  // Delete Task Handler
  const deleteTaskHandler = async (task) => {
    try {
      await deleteTask(task._id);
      setTaskList((allTask) => allTask.filter((t) => t._id !== task._id));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("delete error");
    }
  };

  // Edit Task Handler
  const editTaskHandler = (task) => {
    setEditTaskId(task._id);
    setTasks({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    });
  };

  // Tasks Filteration
  const filteredTasks = taskList.filter((task) => {
    if (task.status === statusFilter || statusFilter === "All Tasks")
      return task.status;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8  sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 ">
        {/* Main Content */}
        <div className="grid gap-7 lg:grid-cols-[390px_1fr]">
          {/* Add / Edit Task */}
          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Plus size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {editTaskId !== null ? "Edit Task" : "Add Task"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {editTaskId !== null
                      ? "Update your task details"
                      : "Create a new task"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Task Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={tasks.title}
                  onChange={changeHandler}
                  placeholder="Enter task title"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  placeholder="Describe your task..."
                  rows="4"
                  name="description"
                  value={tasks.description}
                  onChange={changeHandler}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Due Date
                </label>

                <input
                  type="date"
                  name="dueDate"
                  value={tasks.dueDate}
                  onChange={changeHandler}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {["Pending", "In Progress", "Completed"].map(
                    (item, index) => (
                      <label
                        key={index}
                        className={`cursor-pointer rounded-xl border px-2 py-3 text-center text-xs font-semibold transition ${
                          tasks.status === item
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          id={item}
                          name="status"
                          value={item}
                          checked={tasks.status === item}
                          onChange={changeHandler}
                          className="sr-only"
                        />

                        {item}
                      </label>
                    ),
                  )}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Priority
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {["Low", "Medium", "High"].map((item, index) => (
                    <label
                      key={index}
                      className={`cursor-pointer rounded-xl border px-2 py-3 text-center text-xs font-semibold transition ${
                        tasks.priority === item
                          ? item === "High"
                            ? "border-red-200 bg-red-50 text-red-600"
                            : item === "Medium"
                              ? "border-amber-200 bg-amber-50 text-amber-600"
                              : "border-emerald-200 bg-emerald-50 text-emerald-600"
                          : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <input
                        id={item}
                        type="radio"
                        name="priority"
                        value={item}
                        checked={tasks.priority === item}
                        onChange={changeHandler}
                        className="sr-only"
                      />

                      {item}
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={addTaskHandler}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99]"
              >
                {editTaskId !== null ? "Update Task" : "Add Task"}

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="min-w-0">
            {/* List Header */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Your Tasks</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage and track your current tasks
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex  items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white px-4  shadow-sm">
                  <p className="text-md font-medium text-slate-500">
                    Total Tasks:
                  </p>
                  <p className="mt-1 text-md font-bold text-slate-900">
                    {taskList.length}
                  </p>
                </div>

                {/* Status Filter */}
                <select
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:w-auto"
                >
                  <option value="All Tasks">All Tasks</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredTasks.length < 1 && (
              <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <ClipboardList size={28} strokeWidth={1.7} />
                </div>

                <h3 className="text-base font-semibold text-slate-800">
                  No tasks available
                </h3>

                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  Create your first task using the form to get started.
                </p>
              </div>
            )}

            {/* Tasks */}
            <div className="space-y-4">
              {filteredTasks.map((task, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    {/* Task Information */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="wrap-break-words text-lg font-bold text-slate-900">
                          {task.title}
                        </h3>
                      </div>

                      <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-500">
                        {task.description}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            task.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : task.status === "In Progress"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          <span
                            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                              task.status === "Completed"
                                ? "bg-emerald-500"
                                : task.status === "In Progress"
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                            }`}
                          />

                          {task.status}
                        </span>

                        {/* Priority Badge */}
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            task.priority === "High"
                              ? "bg-red-50 text-red-700"
                              : task.priority === "Medium"
                                ? "bg-orange-50 text-orange-700"
                                : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {task.priority} Priority
                        </span>

                        {/* Date */}
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          <CalendarDays size={14} />

                          {task.dueDate}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 gap-2 sm:pt-0">
                      <button
                        onClick={() => editTaskHandler(task)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTaskHandler(task)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
