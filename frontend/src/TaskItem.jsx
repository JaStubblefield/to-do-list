import React from "react";

export default function TaskItem({ task, originalIndex, onToggle, onDelete, onMoveUp, onMoveDown, onIncreasePriority, onDecreasePriority  }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={task.checked}
                onChange={() => onToggle(originalIndex)}
                className="task-checkbox"
            />

            <span className={task.checked ? "text checked" : "text"}>
                {task.text}
            </span>

            {task.dueDate && (
                <span className="due-date">
                Due: {task.dueDate}
                </span>
            )}

            <button
                className="delete-button"
                onClick={() => onDelete(originalIndex)}>
                Delete
            </button>

            <button
                className="move-button"
                onClick={() => onMoveUp(originalIndex)}>
                ⬆️
            </button>

            <button
                className="move-button"
                onClick={() => onMoveDown(originalIndex)}>
                ⬇️
            </button>

            {task.priority !== "high" && (
                <button className="increase-priority-button"
                    onClick={() => onIncreasePriority(originalIndex)}>Increase Priority</button>
            )}
            {task.priority !== "low" && (
                <button className="decrease-priority-button"
                    onClick={() => onDecreasePriority(originalIndex)}>Decrease Priority</button>
            )}
        </li>
    );
}
