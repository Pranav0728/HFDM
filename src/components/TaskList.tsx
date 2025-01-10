// src/components/TaskList.tsx
import { FC } from "react";

interface Task {
  mealName: string;
  ingredients: string[];
  instructions: string;
}

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        tasks.map((task, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl">{task.mealName}</h3>
            <p className="text-gray-600">
              <strong>Ingredients:</strong> {task.ingredients.join(", ")}
            </p>
            <p className="text-gray-600">
              <strong>Instructions:</strong> {task.instructions}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
