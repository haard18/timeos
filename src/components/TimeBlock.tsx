import { useAtomValue, useSetAtom } from "jotai";
import { tasksAtom, createTaskAtom } from "../lib/store";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { Task } from "../lib/store";
import { useState } from "react";

export default function TimeBlock({
  label,
  date,
}: {
  label: Task["timeBlock"];
  date: string;
}) {
  const [showCompleted, setShowCompleted] = useState(false);
  const tasks = useAtomValue(tasksAtom).filter(
    (t) =>
      t.timeBlock === label &&
      t.date === date &&
      (showCompleted || !t.done)
  );

  const addTask = useSetAtom(createTaskAtom);

  return (
    <div className="p-3 rounded-2xl bg-[#2a2a2a] border border-white/10 shadow-sm hover:bg-[#333] transition duration-200">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm text-gray-300 font-semibold tracking-tight">
          {label}
        </h2>
        <label className="text-xs text-gray-400 flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            className="accent-green-500"
            checked={showCompleted}
            onChange={() => setShowCompleted((prev) => !prev)}
          />
          Show Done
        </label>
      </div>

      <AddTask
        onAdd={({ text, space, label: tag, color }) =>
          addTask({
            text,
            timeBlock: label,
            date,
            space,
            label: tag,
            color,
          })
        }
      />

      <div className="mt-3 space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
