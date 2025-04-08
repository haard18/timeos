import { useState } from "react";
import { useAtomValue } from "jotai";
import { spacesAtom, labelsAtom } from "../lib/store";

type Props = {
  onAdd: (task: {
    text: string;
    space: string;
    label: string;
    color: string;
  }) => void;
};

const colors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA"];

export default function AddTask({ onAdd }: Props) {
  const spaces = useAtomValue(spacesAtom);
  const labels = useAtomValue(labelsAtom);

  const [text, setText] = useState("");
  const [space, setSpace] = useState(spaces[0] || "");
  const [label, setLabel] = useState(labels[0] || "");
  const [color, setColor] = useState(colors[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd({ text: text.trim(), space, label, color });
    setText("");
    setShowOptions(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          className="w-full px-3 py-2 rounded-lg bg-[#1e1e1e] border border-white/10 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="Add a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setShowOptions(true)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Add
        </button>
      </div>

      {showOptions && (
        <div className="space-y-3 transition-all">
          <div className="flex gap-2">
            <select
              value={space}
              onChange={(e) => setSpace(e.target.value)}
              className="flex-1 px-2 py-2 rounded-lg bg-[#1e1e1e] text-white border border-white/10"
            >
              {spaces.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="flex-1 px-2 py-2 rounded-lg bg-[#1e1e1e] text-white border border-white/10"
            >
              {labels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Color:</span>
            {colors.map((c) => (
              <div
                key={c}
                className={`w-5 h-5 rounded-full cursor-pointer border-2 transition-all ${
                  color === c
                    ? "border-white scale-110"
                    : "border-white/10 hover:border-white/20"
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>

          {text && (
            <div className="mt-2 p-3 border border-white/10 rounded-lg bg-[#1e1e1e] shadow-sm text-sm flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <div className="text-white">
                <p className="font-medium">{text}</p>
                <p className="text-xs text-gray-400">
                  {space} • {label}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
