import React from "react";
import TaskItem from "./TaskItem.jsx";

export default function PrioritySection({
    title,
    className,
    tasks,
    onToggle,
    onDelete,
    onMoveUp,
    onMoveDown,
    onIncrease,
    onDecrease
}) {
    return (
        <div>
            <h2 className={className}>{title}</h2>
            <ol>
                {tasks.map(task => (
                    <TaskItem
                        key={task.originalIndex}
                        task={task}
                        originalIndex={task.originalIndex}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onMoveUp={onMoveUp}
                        onMoveDown={onMoveDown}
                        onIncreasePriority={onIncrease}
                        onDecreasePriority={onDecrease}
                    />
                ))}
            </ol>
        </div>
    );
}
