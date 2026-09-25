import React, { useState, useEffect } from "react";
import { createTask, deleteTask, editTask, getTasks } from "../api/authApi";
import { toast } from "react-hot-toast";
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
        setTaskList(data.tasks);
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
    <div className="max-w-5xl mx-auto p-6">
      {/* Heading */}
      <div className="text-center  mb-6">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </div>
      {/* Add Task  */}
      <div className="block lg:flex gap-10">
        <div className="border w-full border-gray-300 shadow-md rounded-xl p-5 mb-6 max-h-120">
          <h2 className="text-lg font-semibold mb-4">Add Task</h2>

          <div className="grid gap-4">
            <input
              type="text"
              name="title"
              value={tasks.title}
              onChange={changeHandler}
              placeholder="Task title"
              className="border border-gray-400 rounded-lg px-4 py-2"
            />

            <textarea
              placeholder="Task description"
              rows="4"
              name="description"
              value={tasks.description}
              onChange={changeHandler}
              className="border border-gray-400 rounded-lg px-4 py-2"
            />
            <input
              type="date"
              name="dueDate"
              value={tasks.dueDate}
              onChange={changeHandler}
              className="border border-gray-300 rounded-lg p-2"
            />
            {/* Status */}
            <div className="flex gap-5">
              {["Pending", "In Progress", "Completed"].map((item, index) => (
                <div key={index} className="space-x-2">
                  <input
                    type="radio"
                    id={item}
                    name="status"
                    value={item}
                    checked={tasks.status === item}
                    onChange={changeHandler}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </div>

            {/* Priority */}
            <div className="flex gap-5">
              {["Low", "Medium", "High"].map((item, index) => (
                <div key={index} className="space-x-2">
                  <input
                    id={item}
                    type="radio"
                    name="priority"
                    value={item}
                    checked={tasks.priority === item}
                    onChange={changeHandler}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </div>

            <button
              onClick={addTaskHandler}
              className="bg-blue-600 text-white py-2 rounded-lg"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4 w-full">
          {/* Status filter */}
          <div className="flex justify-between items-center mb-5 ">
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-400 rounded-lg px-4 py-2"
            >
              <option value="All Tasks">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          {/* Tasks */}
          {filteredTasks.length < 1 && (
            <div className="text-center font-semibold text-lg">
              No task is available.
            </div>
          )}
          {filteredTasks.map((task, index) => (
            <div
              key={index}
              className="border border-gray-400 shadow-md rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{task.title}</h3>

                <p className="text-gray-500">{task.description}</p>

                <span className="text-sm text-yellow-700 font-semibold pr-4">
                  {task.status}
                </span>
                <span className="text-sm text-red-700 font-semibold">
                  {task.priority}
                </span>
                <div>
                  <span className="text-sm text-gray-700">{task.dueDate}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editTaskHandler(task)}
                  className="border border-gray-400 px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTaskHandler(task)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
