import React, { useState } from "react";
import "./App.css";
import AddBtn from "./components/icons/addBtn";

// Define the structure of a Task object
interface Task {
  id: number; 
  text: string; 
  completed: boolean; 
  selected: boolean; 
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currTask, setCurrTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<string>("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  // Function to add a new task to the list
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, selected: false },
      ]);
      setNewTask("");
    }
  };

  // Function to toggle the completion state of a task
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to start editing a task
  const startEditing = (taskId: number, taskText: string) => {
    setIsEditing(taskId);
    setEditTask(taskText);
  };

  // Function to save the edited task
  const saveEdit = (taskId: number) => {
    if (editTask.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, text: editTask } : task
        )
      );
      setIsEditing(null);
    }
  };

  // Function to cancel editing mode
  const cancelEdit = () => {
    setIsEditing(null);
  };

  // Function to toggle the selection state of a task
  const toggleSelection = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, selected: !task.selected, completed: !task.completed }
          : task
      )
    );
  };

  // Function to delete all selected tasks
  const deleteSelectedTasks = () => {
    setTasks(tasks.filter((task) => !task.selected));
  };

  return (
    <div className="App">
      <div className="todo-app-wrapper">
        <section>
          <div className="top-container">
            <div className="img-wrapper">
              <img src="./assets/prof_image.png" alt="" />
            </div>
            <div className="title-container">
              <div className="name">Hello John</div>
              <div className="subtitle">What are your plans<br/> for today?</div>
            </div>
          </div>
          <div className="trophy-container">
            <img src="./assets/trophy_icon.png" alt="" />
            <p>Go Pro Upgrade Now</p>
            <div className="price-tag">$1</div>
          </div>
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={task.completed ? "completed" : ""}
              >
                <input
                  type="checkbox"
                  checked={task.selected}
                  onChange={() => {
                    toggleSelection(task.id);
                  }}
                  className="custom-checkbox"
                />
                <>
                  <span>{task.text}</span>
                  <button
                    onClick={() => {
                      startEditing(task.id, task.text);
                      setCurrTask(task);
                    }}
                  >
                    Edit
                  </button>
                </>
              </li>
            ))}
          </ul>
          <div>
            <button className="addBtn" onClick={addTask}>
              +
            </button>
          </div>
        </section>
        <section>
          <div className="top-container">Edit Task</div>
          <div className="add-input-wrapper">
            <label>Task Name</label>
            {isEditing === currTask?.id ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
              </>
            ) : (
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
              />
            )}
          </div>
          <div className="action-btns">
            {tasks.some((task) => task.selected) && (
              <button onClick={deleteSelectedTasks}>Delete </button>
            )}
            {currTask && isEditing && (
              <button onClick={() => saveEdit(currTask?.id)}>Save</button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
