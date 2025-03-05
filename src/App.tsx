import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>("");

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim() === "") {
      alert("Por favor, escribe una tarea.");
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title: input,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInput("");
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: string, newText: string) => {
    if (newText.trim() === "") return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newText } : task
      )
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-800 flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold mb-4 text-green-400">
          Mi Lista de Tareas
        </h1>
        <form onSubmit={handleAddTask} className="mb-4 w-full max-w-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              aria-label="Nueva tarea"
              className={`border-2 border-blue-400 rounded-md p-2 ${
                input ? "text-white" : "text-blue-400"
              }`}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe una nueva tarea"
            />
            <button
              className="bg-blue-500 text-white rounded-md p-2 transition-transform duration-300 transform hover:scale-105 hover:bg-blue-600 active:scale-100"
              type="submit"
            >
              Agregar Tarea
            </button>
          </div>
        </form>
        <ul className="w-full max-w-md">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-blue-600 p-2 mb-2 rounded-md shadow transition-transform duration-300 transform hover:scale-105 hover:bg-blue-700"
            >
              <span
                className={`text-white overflow-hidden whitespace-nowrap text-ellipsis px-2 ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.title}
              </span>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 text-white rounded-md p-2 transition-transform duration-300 transform hover:scale-105 hover:bg-yellow-600 active:scale-100"
                  onClick={() => {
                    const newText = prompt("Edit task:", task.title);
                    if (newText) handleEditTask(task.id, newText);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white rounded-md p-2 transition-transform duration-300 transform hover:scale-105 hover:bg-red-600 active:scale-100"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
