import { useAtomValue, useSetAtom } from "jotai";
import { tasksAtom, createTaskAtom } from "../lib/store";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { Task } from "../lib/store";

export default function TimeBlock({
  label,
  date,
}: {
  label: Task["timeBlock"];
  date: string;
}) {
  const tasks = useAtomValue(tasksAtom).filter(
    (t) => t.timeBlock === label && t.date === date
  );
  const addTask = useSetAtom(createTaskAtom);

  return (
    <div className="p-3 rounded-2xl bg-[#2a2a2a] border border-white/10 shadow-sm hover:bg-[#333] transition duration-200">
      <h2 className="text-sm text-gray-300 font-semibold mb-2 tracking-tight">
        {label}
      </h2>

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
