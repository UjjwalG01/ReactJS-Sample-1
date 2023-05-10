import { useEffect, useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const dataFromServer = await fetchTasks();
      setTasks(dataFromServer);
    };
    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Add Tasks
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    // const id = Math.ceil(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete Tasks
  const deleteTask = async (id) => {
    // Deletes form DB
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    // Deletes form UI
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Tasks
  const toggleReminder = async (id) => {
    // const taskToUpdate = await fetch(fetchTask(id));
    // const updTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder };

    // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(updTask),
    // });

    // const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        title="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {/* Ternary Op. without else */}
      {showAddTask && <AddTask onAdd={addTask} />}{" "}
      {tasks.length ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Task to display"
      )}
    </div>
  );
}

export default App;

// Toggle Remainder - Time->57:05
