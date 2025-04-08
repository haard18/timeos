import TimeBlock from "../components/TimeBlock";
import { addDays, format } from "date-fns";

const timeBlocks = ["Morning", "Afternoon", "Night"] as const;

export default function CalendarView() {
  const today = new Date();
  const days = Array.from({ length: 9 }, (_, i) =>
    format(addDays(today, i), "yyyy-MM-dd")
  );

  return (
    <div className="w-full h-full px-4 py-4" style={{ fontFamily: '"Kode Mono", monospace' }}>
      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {days.map((date) => (
          <div
            key={date}
            className="flex flex-col gap-3 bg-[#1e1e1e] border border-white/10 rounded-2xl p-4 shadow-md"
          >
            <div className="text-center text-gray-200 font-semibold text-base tracking-tight">
              {format(new Date(date), "EEE, MMM d")}
            </div>
            {timeBlocks.map((label) => (
              <TimeBlock key={label} label={label} date={date} />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile + Tablet Scroll View */}
      <div className="lg:hidden overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {days.map((date) => (
            <div
              key={date}
              className="min-w-[260px] flex-shrink-0 flex flex-col gap-3 bg-[#1e1e1e] border border-white/10 rounded-2xl p-4 shadow-md"
            >
              <div className="text-center text-gray-200 font-semibold text-base tracking-tight">
                {format(new Date(date), "EEE, MMM d")}
              </div>
              {timeBlocks.map((label) => (
                <TimeBlock key={label} label={label} date={date} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
