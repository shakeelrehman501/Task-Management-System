import React, { useState } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("High");
  const [taskId, setTaskId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All Tasks");

  const addTaskHandler = () => {
    if (title === "") {
      alert("Title field is required");
      return;
    }
    if (taskId !== null) {
      setTasks((allTask) =>
        allTask.map((task) =>
          task.id === taskId
            ? {
                title,
                description,
                status,
                priority,
              }
            : task,
        ),
      );
      setTaskId(null);
    } else {
      setTasks((allTask) => [
        ...allTask,
        { id: Date.now(), title, description, status, priority },
      ]);
    }
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("High");
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
    setTaskId(task.id);
  };

  const deleteTask = (id) => {
    console.log(id);
    setTasks((allTask) => allTask.filter((task) => task.id !== id));
  };

  const filteredTask = tasks.filter((task) => {
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
        <div className="border w-full border-gray-400 rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add Task</h2>

          <div className="grid gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="border border-gray-400 rounded-lg px-4 py-2"
            />

            <textarea
              placeholder="Task description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-400 rounded-lg px-4 py-2"
            />
            {/* Status */}
            <div className="flex gap-5">
              {["Pending", "In Progress", "Completed"].map((item, index) => (
                <div key={index} className="space-x-2">
                  <input
                    type="radio"
                    id={item}
                    value={item}
                    checked={status === item}
                    onChange={(e) => setStatus(e.target.value)}
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
                    value={item}
                    checked={priority === item}
                    onChange={(e) => setPriority(e.target.value)}
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
          {tasks.length < 1 && (
            <div className="text-center font-semibold text-lg">
              No task added yet.
            </div>
          )}
          {filteredTask.length < 1 && (
            <div className="text-center font-semibold text-lg">
              No task is available.
            </div>
          )}
          {filteredTask.map((task, index) => (
            <div
              key={index}
              className="border border-gray-400 rounded-xl p-5 flex justify-between items-center"
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
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editTask(task)}
                  className="border border-gray-400 px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
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
