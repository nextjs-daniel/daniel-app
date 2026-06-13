"use client";

import { useRef, useState, useCallback } from "react";
import Image from 'next/image';

interface Step1HateMeProps {
  onNo: () => void;
}

export default function Step1HateMe({ onNo }: Step1HateMeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const [yesPos, setYesPos] = useState<{ x: number; y: number } | null>(null);
  const isMoving = useRef(false);

  const moveYesButton = useCallback(() => {
    if (!containerRef.current || isMoving.current) return;
    isMoving.current = true;

    const container = containerRef.current.getBoundingClientRect();
    const buttonW = 130;
    const buttonH = 52;
    const safeMargin = 30;

    // "No" button exclusion zone (centered in container)
    const noBtnW = 140;
    const noBtnH = 52;
    const noLeft = container.width / 2 - noBtnW / 2;
    const noTop = container.height / 2 - noBtnH / 2;

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
      newX + buttonW + safeMargin > noLeft - safeMargin &&
      newX - safeMargin < noLeft + noBtnW + safeMargin &&
      newY + buttonH + safeMargin > noTop - safeMargin &&
      newY - safeMargin < noTop + noBtnH + safeMargin
    );

    setYesPos({ x: newX, y: newY });

    // Prevent rapid re-triggers during the animation
    setTimeout(() => {
      isMoving.current = false;
    }, 400);
  }, []);

  const handleContainerMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!yesBtnRef.current || !containerRef.current || isMoving.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = yesBtnRef.current.getBoundingClientRect();

      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      const btnCenterX = btnRect.left - containerRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top - containerRect.top + btnRect.height / 2;

      const dist = Math.sqrt(
        (mouseX - btnCenterX) ** 2 + (mouseY - btnCenterY) ** 2
      );

      if (dist < 80) {
        moveYesButton();
      }
    },
    [moveYesButton]
  );

  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center space-y-8">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Do you steel hate me?</h2>
      </div>

        <Image
            src="/1er-imagen.jpg"
            alt="Heartbreak"
            width={80}
            height={130}
        />
      {/* Button area */}
      <div
        ref={containerRef}
        onMouseMove={handleContainerMouseMove}
        className="relative w-full h-48 flex items-center justify-center"
      >
        {/* Yes button - escapes the mouse */}
        <button
          ref={yesBtnRef}
          onTouchStart={moveYesButton}
          style={
            yesPos
              ? {
                  position: "absolute",
                  left: `${yesPos.x}px`,
                  top: `${yesPos.y}px`,
                  transition: "left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }
              : {
                  position: "absolute",
                  left: "calc(50% - 140px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                }
          }
          className="rounded-2xl border-2 border-red-200 bg-red-50 px-8 py-3.5 text-sm font-semibold text-red-500 shadow-md select-none pointer-events-none"
        >
          Yes 🤬
        </button>

        {/* No button - stays in place */}
        <button
          onClick={onNo}
          style={{
            position: "absolute",
            left: "calc(50% + 10px)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          className="cursor-pointer rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-200/60 transition-all duration-300 hover:shadow-xl hover:shadow-pink-300/60 hover:scale-[1.05] active:scale-[0.98]"
        >
          No! 👀
        </button>
      </div>
    </div>
  );
}
