"use client";

interface Step2InfoProps {
  onNext: () => void;
}

export default function Step2Info({ onNext }: Step2InfoProps) {
  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center space-y-8 text-center">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-gray-800">I knew it! 🥰</h2>
        <p className="mt-4 text-base text-gray-500 leading-relaxed max-w-md mx-auto">
            I&apos;m not that easy to hate. Just be careful—I&apos;m a man, and I may not be able to argue against those thoughts of yours 😅.
        </p>
      </div>

      <button
        onClick={onNext}
        className="cursor-pointer rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-200/60 transition-all duration-200 hover:shadow-xl hover:shadow-pink-300/60 hover:scale-[1.02] active:scale-[0.98]"
      >
        Okey →
      </button>
    </div>
  );
}
