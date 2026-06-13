"use client";

import { useRef, useState, useCallback } from "react";
import Image from 'next/image';

interface Step3DoSomethingProps {
  onYes: () => void;
}

export default function Step3DoSomething({ onYes }: Step3DoSomethingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const isMoving = useRef(false);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current || isMoving.current) return;
    isMoving.current = true;

    const container = containerRef.current.getBoundingClientRect();
    const buttonW = 130;
    const buttonH = 52;
    const safeMargin = 30;

    // "Yes" button exclusion zone (centered in container)
    const yesBtnW = 140;
    const yesBtnH = 52;
    const yesLeft = container.width / 2 - yesBtnW / 2;
    const yesTop = container.height / 2 - yesBtnH / 2;

    const maxX = container.width - buttonW;
    const maxY = container.height - buttonH;

    let newX: number;
    let newY: number;
    let attempts = 0;

    do {
      newX = Math.random() * maxX;
      newY = Math.random() * maxY;
      attempts++;
    } while (
      attempts < 100 &&
      newX + buttonW + safeMargin > yesLeft - safeMargin &&
      newX - safeMargin < yesLeft + yesBtnW + safeMargin &&
      newY + buttonH + safeMargin > yesTop - safeMargin &&
      newY - safeMargin < yesTop + yesBtnH + safeMargin
    );

    setNoPos({ x: newX, y: newY });

    setTimeout(() => {
      isMoving.current = false;
    }, 400);
  }, []);

  const handleContainerMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!noBtnRef.current || !containerRef.current || isMoving.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = noBtnRef.current.getBoundingClientRect();

      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      const btnCenterX = btnRect.left - containerRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top - containerRect.top + btnRect.height / 2;

      const dist = Math.sqrt(
        (mouseX - btnCenterX) ** 2 + (mouseY - btnCenterY) ** 2
      );

      if (dist < 80) {
        moveNoButton();
      }
    },
    [moveNoButton]
  );

  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center space-y-8">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Would you like to do something with me?</h2>
      </div>

      <Image
        src="/ask.jpg"
        alt="Question Mark"
        width={200}
        height={120}
        className="animate-bounce"
      />

      {/* Button area */}
      <div
        ref={containerRef}
        onMouseMove={handleContainerMouseMove}
        className="relative w-full h-48 flex items-center justify-center"
      >
        {/* No button - escapes the mouse */}
        <button
          ref={noBtnRef}
          onTouchStart={moveNoButton}
          style={
            noPos
              ? {
                  position: "absolute",
                  left: `${noPos.x}px`,
                  top: `${noPos.y}px`,
                  transition: "left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }
              : {
                  position: "absolute",
                  left: "calc(50% + 10px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                }
          }
          className="rounded-2xl border-2 border-gray-200 bg-gray-50 px-8 py-3.5 text-sm font-semibold text-gray-500 shadow-md select-none pointer-events-none"
        >
          No 🐾
        </button>

        {/* Yes button - stays in place */}
        <button
          onClick={onYes}
          style={{
            position: "absolute",
            left: "calc(50% - 140px)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          className="cursor-pointer rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-200/60 transition-all duration-300 hover:shadow-xl hover:shadow-pink-300/60 hover:scale-[1.05] active:scale-[0.98]"
        >
          Yes! 💕
        </button>
      </div>
    </div>
  );
}
