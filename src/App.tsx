import React, { useState } from "react";
import "./App.css";
import AddBtn from "./components/icons/addBtn";

// Define the structure of a Task object
interface Task {
  id: number; // Unique ID for each task
  text: string; // The task description
  completed: boolean; // Whether the task is marked as completed
  selected: boolean; // Whether the task is selected for deletion
}

const App: React.FC = () => {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  const [currTask, setCurrTask] = useState<Task | null>(null);
  // State to manage the input for a new task
  const [newTask, setNewTask] = useState<string>("");
  // State to manage editing mode (stores task ID of the task being edited)
  const [isEditing, setIsEditing] = useState<number | null>(null);
  // State to manage the input while editing a task
  const [editTask, setEditTask] = useState<string>("");

  // Function to add a new task to the list
  const addTask = () => {
    if (newTask.trim()) {
      // Ensure the input is not empty
      // Create a new task and update the task list
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, selected: false },
      ]);
      setNewTask(""); // Clear the input field after adding
    }
  };

  // Function to toggle the completion state of a task (check/uncheck)
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to start editing a task (sets the task in editing mode)
  const startEditing = (taskId: number, taskText: string) => {
    setIsEditing(taskId); // Set the task as being edited
    setEditTask(taskText); // Set the current task text in the input field
  };

  // Function to save the edited task
  const saveEdit = (taskId: number) => {
    if (editTask.trim()) {
      // Ensure the edit input is not empty
      // Update the task text in the task list
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, text: editTask } : task
        )
      );
      setIsEditing(null); // Exit editing mode
    }
  };

  // Function to cancel editing mode
  const cancelEdit = () => {
    setIsEditing(null); // Reset editing state
  };

  // Function to toggle the selection state of a task (select/deselect for deletion)
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
    // Filter out the selected tasks
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
          {/* Display list of tasks */}
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={
                  task.completed ? "completed" : ""
                }
              >
                {/* Checkbox to select/deselect the task */}
                <input
                  type="checkbox"
                  checked={task.selected}
                  onChange={() => {
                    toggleSelection(task.id);
                  }}
                  className="custom-checkbox"
                />
                {/* Display edit form if task is in editing mode, otherwise show task text */}
                {isEditing === task.id ? (
                  <>
                    {/* Input field to edit task */}
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                    />
                    {/* Save and cancel buttons for editing */}

                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    {/* Task text (click to toggle completion) */}
                    <span>
                      {task.text}
                    </span>
                    {/* Button to start editing the task */}
                    <button
                      onClick={() => {
                        startEditing(task.id, task.text);
                        setCurrTask(task);
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
          {/* Input field and button to add a new task */}
          <div>
            <button className="addBtn" onClick={addTask}>
                <AddBtn/>
            </button>
          </div>
        </section>
        <section>
          <div className="top-container">Edit Task</div>
          <div className="add-input-wrapper">
            <label>Task Name</label>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
            />
          </div>
                {/* Delete button (only visible if there are selected tasks) */}
      <div className="action-btns">
        {tasks.some((task) => task.selected) && (
          <button onClick={deleteSelectedTasks}>Delete </button>
        )}
        {currTask && (
          <button onClick={() => saveEdit(currTask?.id)}>Save</button>
        )}
      </div>
        </section>
      </div>
    </div>
  );
};

export default App;
