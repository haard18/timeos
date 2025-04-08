import { Task } from "../lib/store";
import { useSetAtom } from "jotai";
import { toggleDoneAtom } from "../lib/store";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskCard({ task }: { task: Task }) {
  const toggleDone = useSetAtom(toggleDoneAtom);

  return (
    <AnimatePresence>
      <motion.div
        className={`flex flex-col gap-1 p-3 rounded-xl border border-white/10 shadow-sm transition-all ${
          task.done ? "bg-green-900/30" : "bg-white/5"
        }`}
        style={{
          borderLeft: `6px solid ${task.color || "#a3a3a3"}`,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: task.done ? 100 : -100 }}
        transition={{ duration: 0.2 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDragEnd={(event, info) => {
          console.log(event, info);
          if (Math.abs(info.offset.x) > 80) {
            toggleDone(task.id); // toggle if swipe is far enough
          }
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleDone(task.id)}
            className="w-5 h-5 accent-green-500 rounded border-white/20 bg-white/10"
          />
          <span
            className={`text-base transition ${
              task.done ? "line-through text-gray-500" : "text-white"
            }`}
          >
            {task.text}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap pl-8 text-sm">
          {task.space && (
            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
              {task.space}
            </span>
          )}
          {task.label && (
            <span className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
              {task.label}
            </span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
