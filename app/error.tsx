"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center px-8 py-12">
      <div className="animate-scale-in w-full max-w-md text-center">
        <div className="rounded-3xl border border-red-100 bg-white p-12 shadow-xl shadow-red-50/50">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-pink-50">
            <svg
              className="h-10 w-10 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Oops! Something went wrong 😔</h2>
          <p className="mt-3 text-gray-500 leading-relaxed">
            There was a problem processing your request.<br />
            Please try again.
          </p>
          <div className="mt-8">
            <button
              onClick={reset}
              className="cursor-pointer inline-block rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-200/60 transition-all hover:scale-[1.02]"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
