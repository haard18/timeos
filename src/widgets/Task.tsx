import { useAtomValue } from "jotai";
import { completedCountAtom, totalTodayAtom } from "../lib/store";

export default function DailyStats() {
  const completed = useAtomValue(completedCountAtom);
  const total = useAtomValue(totalTodayAtom);
  const percentage = Math.round((completed / (total || 1)) * 100);

  return (
    <div className="bg-gradient-to-r  from-[#1f1f1f] to-[#2a2a2a] rounded-xl px-4 py-3 sm:px-6 sm:py-4 text-white shadow-md sm:w-1/2 w-[75%] max-w-full sm:max-w-md mx-auto">
      <div className="flex justify-between  items-center text-sm sm:text-base font-medium mb-2 sm:mb-1">
        <span className="truncate">Today’s Progress</span>
        <span className="text-gray-400 whitespace-nowrap">
          ✅ {completed}/{total || 1} done
        </span>
      </div>

      <div className="relative w-full h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-[10px] sm:text-xs text-gray-400 text-right hidden xs:block">
        {percentage}% complete
      </p>
    </div>
  );
}
