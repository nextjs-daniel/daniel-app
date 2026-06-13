"use client";

interface Step4WhenFreeProps {
  formData: { date: string; time: string };
  updateField: (field: string, value: string) => void;
  onNext: () => void;
}

const TIME_OPTIONS = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
];

export default function Step4WhenFree({ formData, updateField, onNext }: Step4WhenFreeProps) {
  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center space-y-8">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold text-gray-800">I&apos;m so happy you said yes!</h2>
        <p className="text-base text-gray-500 leading-relaxed">
          I was expecting a no...<br />
        </p>
        <h3 className="font-bold text-xl text-gray-800">So... when are you free? 📅</h3>
      </div>

      <div className="w-full max-w-sm space-y-5">
        {/* Date picker */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Pick a day 📅</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => updateField("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="cursor-text w-full rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100/50 focus:shadow-sm"
          />
        </div>

        {/* Time select */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">What time? ⏰</label>
          <div className="relative">
            <select
              value={formData.time}
              onChange={(e) => updateField("time", e.target.value)}
              className="cursor-pointer w-full rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 pr-10 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100/50 focus:shadow-sm appearance-none"
            >
              <option value="">Select a time...</option>
              {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!formData.date || !formData.time}
        className="cursor-pointer rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-200/60 transition-all duration-200 hover:shadow-xl hover:shadow-pink-300/60 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
      >
        Perfect! →
      </button>

      <p className="text-base text-gray-300 leading-relaxed">
          u know when i&apos;m free...<br />
        </p>
    </div>
  );
}
