import React, { useState } from "react";
import PrioritySection from "./PrioritySection";

function ToDoList() {
    const [tasks, setTasks] = useState([
        { text: "Eat Breakfast", checked: false, priority: "low" },
        { text: "Take a Shower", checked: false, priority: "medium" },
        { text: "Walk the Dog", checked: false, priority: "high" }
    ]);

    const [newTaskText, setNewTaskText] = useState("");
    const [newPriority, setNewPriority] = useState("medium");
    const [newDueDate, setNewDueDate] = useState("");

    async function addTask() {
        if (newTaskText.trim() !== "") {
            const newTask = {
                text: newTaskText,
                checked: false,
                priority: newPriority,
                dueDate: newDueDate || null
            };

            setTasks([...tasks, newTask]);
            setNewTaskText("");
            setNewPriority("medium");
            setNewDueDate("");

            // sendTaskEmail(newTask);

            // if (newTask.dueDate) {
            //     await fetch("http://localhost:4000/api/add-calendar-event", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         taskText: newTask.text,
            //         dueDate: newTask.dueDate
            //         })
            //     });
            // }

        }
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function toggleCheck(index) {
        const updated = [...tasks];
        updated[index].checked = !updated[index].checked;
        setTasks(updated);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updated = [...tasks];
            [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
            setTasks(updated);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updated = [...tasks];
            [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
            setTasks(updated);
        }
    }

    function increasePriority(index) {
        const updated = [...tasks];
        if (updated[index].priority === "low") updated[index].priority = "medium";
        else if (updated[index].priority === "medium") updated[index].priority = "high";
        setTasks(updated);
    }

    function decreasePriority(index) {
        const updated = [...tasks];
        if (updated[index].priority === "high") updated[index].priority = "medium";
        else if (updated[index].priority === "medium") updated[index].priority = "low";
        setTasks(updated);
    }

    function withIndexes(priority) {
        return tasks
            .map((task, i) => ({ ...task, originalIndex: i }))
            .filter(task => task.priority === priority);
    }

    const priorities = ["high", "medium", "low"];

    return (
        <div className="to-do-list">
            <h1>To Do List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task:"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                />

                <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>

                <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                />

                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>

            {priorities.map(priority => (
                <PrioritySection
                    key={priority}
                    title={`${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`}
                    className={`priority-heading ${priority}`}
                    tasks={withIndexes(priority)}
                    onToggle={toggleCheck}
                    onDelete={deleteTask}
                    onMoveUp={moveTaskUp}
                    onMoveDown={moveTaskDown}
                    onIncrease={increasePriority}
                    onDecrease={decreasePriority}
                />
            ))}
        </div>
    );
}

// async function sendTaskEmail(newTask) {
//     try {
//         await fetch('http://localhost:4000/api/send-task-email', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 taskText: newTask.text,
//                 priority: newTask.priority,
//                 dueDate: newTask.dueDate || null,
//                 userEmail: "jasstubblefield@gmail.com"
//             })
//         });
//     } catch (error) {
//         console.error("Error sending email:", error);
//     }
// }

export default ToDoList;
