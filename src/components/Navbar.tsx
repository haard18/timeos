// src/components/Navbar.tsx
import { Clock, Music, Notebook, Youtube,CheckCheckIcon } from "lucide-react";
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
  
    if (hour >= 0 && hour < 3) return " Burning the midnight oil?";
    if (hour >= 3 && hour < 5) return " Still up? Night grind never stops.";
    if (hour >= 5 && hour < 7) return "Rise and grind, early bird!";
    if (hour >= 7 && hour < 9) return "A fresh start. Let’s crush it.";
    if (hour >= 9 && hour < 12) return "Peak focus hours. You got this.";
    if (hour >= 12 && hour < 14) return " Quick reset? It’s lunch o’clock.";
    if (hour >= 14 && hour < 17) return " Afternoon push—stay in flow.";
    if (hour >= 17 && hour < 19) return " Wrapping up strong?";
    if (hour >= 19 && hour < 21) return " Slow down or one last sprint?";
    if (hour >= 21 && hour < 23) return " Wind down, you’ve earned it.";
    return "🌌 Night owl mode. One more thing?";
  }, []);
  
  
  return (
    <div className="w-full px-4 md:px-8 py-3 mt-4 rounded-2xl bg-black/70 text-white shadow-xl backdrop-blur-lg flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 sticky top-4 z-50 border border-white/10 max-w-[95%] md:max-w-max mx-auto">
      <h1 className="text-base md:text-lg font-semibold tracking-tight text-center md:text-left whitespace-nowrap">
        {name ? `${greeting}, ${name}` : "🧠 Welcome to FocusDash"}
      </h1>

      <div className="flex gap-4 md:gap-6 items-center justify-center flex-wrap">
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
        <button onClick={() => toggleTool("notebook")} title="Notebook">
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
        <button onClick={() => toggleTool("stats")} title="Daily Stats">
            <CheckCheckIcon
              className={`w-5 h-5 transition ${
                activeTool === "stats" ? "text-white" : "text-gray-400"
              } hover:text-white`}
            />
        </button>
      </div>
    </div>
  );
}
