import React, {useState} from 'react'

function ToDoList() {
    const [tasks, setTasks] = useState([
        { text: "Eat Breakfast", checked: false, priority: "low" },
        { text: "Take a Shower", checked: false, priority: "medium" },
        { text: "Walk the Dog", checked: false, priority: "high" }
    ]);

    const [newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask() {
        if(newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, checked: false, priority: "medium" }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if(index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if(index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleCheck(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].checked = !updatedTasks[index].checked;
        setTasks(updatedTasks);
    }

    return(
        <div className="to-do-list">

            <h1>To Do List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task:"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    className="add-button"
                    onClick={addTask}>
                    Add
                </button>
            </div>
            <h2 className="priority-heading high">High Priority</h2>
            <ol>
                {tasks.filter(t => t.priority === "high").map((task, index) =>
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={task.checked}
                            onChange={() => toggleCheck(tasks.indexOf(task))}
                        />

                        <span className={task.checked ? "text checked" : "text"}>
                            {task.text}
                        </span>


                        <button
                            className="delete-button"
                            onClick={() => deleteTask(tasks.indexOf(task))}>
                            Delete
                        </button>

                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(tasks.indexOf(task))}>
                            ⬆️
                        </button>

                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(tasks.indexOf(task))}>
                            ⬇️
                        </button>
                    </li>
                )}
            </ol>

            <h2 className="priority-heading medium">Medium Priority</h2>
            <ol>
                {tasks.filter(t => t.priority === "medium").map((task, index) =>
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={task.checked}
                            onChange={() => toggleCheck(tasks.indexOf(task))}
                        />

                        <span className={task.checked ? "text checked" : "text"}>
                            {task.text}
                        </span>


                        <button
                            className="delete-button"
                            onClick={() => deleteTask(tasks.indexOf(task))}>
                            Delete
                        </button>

                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(tasks.indexOf(task))}>
                            ⬆️
                        </button>

                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(tasks.indexOf(task))}>
                            ⬇️
                        </button>
                    </li>
                )}
            </ol>

            <h2 className="priority-heading low">Low Priority</h2>
            <ol>
                {tasks.filter(t => t.priority === "low").map((task, index) =>
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={task.checked}
                            onChange={() => toggleCheck(tasks.indexOf(task))}
                        />

                        <span className={task.checked ? "text checked" : "text"}>
                            {task.text}
                        </span>


                        <button
                            className="delete-button"
                            onClick={() => deleteTask(tasks.indexOf(task))}>
                            Delete
                        </button>

                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(tasks.indexOf(task))}>
                            ⬆️
                        </button>

                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(tasks.indexOf(task))}>
                            ⬇️
                        </button>
                    </li>
                )}
            </ol>
        </div>);
}

export default ToDoList