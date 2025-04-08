// src/components/Navbar.tsx
import { Clock, Music, Notebook, Youtube } from "lucide-react";
import { useAtom } from "jotai";
import { nameAtom } from "../lib/store";
import { useMemo } from "react";

type Props = {
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
};

export default function Navbar({ activeTool, setActiveTool }: Props) {
  const [name] = useAtom(nameAtom);

  const toggleTool = (tool: string) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <div className="w-fit mx-auto px-8 py-3 mt-4 rounded-2xl bg-black/70 text-white shadow-xl backdrop-blur-lg flex items-center justify-between gap-10 sticky top-4 z-50 border border-white/10">
      <h1 className="text-lg font-semibold tracking-tight whitespace-nowrap">
        {name ? `${greeting}, ${name} ` : "🧠 Welcome to FocusDash"}
      </h1>

      <div className="flex gap-6 items-center">
        <button onClick={() => toggleTool("pomodoro")} title="Pomodoro Timer">
          <Clock
            className={`w-5 h-5 transition ${
              activeTool === "pomodoro" ? "text-white" : "text-gray-400"
            } hover:text-white`}
          />
        </button>
        <button onClick={() => toggleTool("spotify")} title="Spotify">
          <Music
            className={`w-5 h-5 transition ${
              activeTool === "spotify" ? "text-green-400" : "text-gray-400"
            } hover:text-green-400`}
          />
        </button>
        <button onClick={() => toggleTool("notebook")} title="GitHub">
          <Notebook
            className={`w-5 h-5 transition ${
              activeTool === "notebook" ? "text-white" : "text-gray-400"
            } hover:text-white`}
          />
        </button>
        <button onClick={() => toggleTool("youtube")} title="YouTube">
          <Youtube
            className={`w-5 h-5 transition ${
              activeTool === "youtube" ? "text-red-400" : "text-gray-400"
            } hover:text-red-400`}
          />
        </button>
      </div>
    </div>
  );
}
