"use client";

import { useState } from "react";

const VIBE_OPTIONS = [
  { label: "Sushi", emoji: "🍣" },
  { label: "Pizza", emoji: "🍕" },
  { label: "Movies", emoji: "🎬" },
  { label: "Fast food", emoji: "🍔" },
  { label: "Motorcycle ride", emoji: "🏍️" },
  { label: "Ramen", emoji: "🍜" },
  { label: "Other", emoji: "✨" },
];

interface Step5VibesProps {
  formData: { intereses: string[]; notas: string };
  updateField: (field: string, value: string | string[]) => void;
  onConfirm: () => void;
  onBack: () => void;
  submitting: boolean;
}

export default function Step5Vibes({
  formData,
  updateField,
  onConfirm,
  onBack,
  submitting,
}: Step5VibesProps) {
  const [selected, setSelected] = useState<string>(formData.intereses[0] || "");

  const handleSelect = (label: string) => {
    setSelected(label);
    updateField("intereses", [label]);
  };

  return (
    <div className="animate-fade-in-up flex flex-col items-center space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-gray-800">What are your vibes? 🎶</h2>
        <p className="text-sm text-gray-400">Pick whatever sounds fun</p>
      </div>
      <div className="grid grid-cols-3 gap-3 w-full">
        {VIBE_OPTIONS.map(({ label, emoji }) => (
          <button
            key={label}
            type="button"
            onClick={() => handleSelect(label)}
            className={`cursor-pointer group flex flex-col items-center gap-2 rounded-2xl px-4 py-4 text-sm font-medium transition-all duration-200 ${
              selected === label
                ? "bg-gradient-to-br from-pink-400 to-rose-400 text-white shadow-md shadow-pink-200/50 scale-[1.02]"
                : "bg-gray-50/80 text-gray-600 hover:bg-pink-50 hover:text-pink-600 hover:scale-[1.02]"
            }`}
          >
            <span className="text-xl">{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Observación opcional */}
      <div className="w-full space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Any observations? <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          value={formData.notas}
          onChange={(e) => updateField("notas", e.target.value)}
          placeholder="Something you want to add..."
          rows={3}
          className="w-full cursor-text rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100/50 focus:shadow-sm resize-none"
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <button
          onClick={onBack}
          className="cursor-pointer rounded-2xl border border-gray-200 px-7 py-3.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-pink-200 hover:text-pink-500 hover:bg-pink-50/50"
        >
          ← Back
        </button>
        <button
          onClick={onConfirm}
          disabled={!selected || submitting}
          className="cursor-pointer rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-200/60 transition-all duration-200 hover:shadow-xl hover:shadow-pink-300/60 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
        >
          {submitting ? "Sending..." : "Confirm ✨"}
        </button>
      </div>
    </div>
  );
}
