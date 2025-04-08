// src/widgets/PomodoroWidget.tsx
import { useEffect, useState } from "react";

export default function PomodoroWidget() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 min
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const totalSeconds = 25 * 60;
  const progressPercent = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div style={{ fontFamily: '"Kode Mono", monospace' }} className={`fixed bottom-6 right-6 bg-gradient-to-br from-white via-slate-100 to-gray-200 shadow-2xl border border-gray-300 rounded-2xl p-4 w-72 z-50 transition-all duration-300 ${isRunning ? 'animate-pulse-slow' : ''}`}>
      <h2 className="text-lg font-bold mb-2 text-gray-800">🍅 Pomodoro</h2>
      
      <p className="text-5xl font-mono text-center text-gray-900 drop-shadow-sm">
        {formatTime(secondsLeft)}
      </p>

      <div className="h-2 mt-4 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-red-500 transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(25 * 60);
          }}
          className="px-4 py-1 border rounded hover:bg-gray-100 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
