import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctor Appointment",
      date: "25th Sep 2023",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at Office",
      date: "30th Sep 2023",
      reminder: true,
    },
    {
      id: 3,
      text: "Go Shopping",
      date: "2nd Oct 2023",
      reminder: false,
    },
  ]);

  // Add Tasks
  const addTask = (task) => {
    const id = Math.ceil(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // Delete Tasks
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Tasks
  const toggleReminder = (id) => {
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
