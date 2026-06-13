"use client";

import { useIsMobile } from "./hooks/useIsMobile";
import MobilePage from "./components/MobilePage";
import DesktopForm from "./components/DesktopForm";

export default function Home() {
  const isMobile = useIsMobile();

  // Loading state while detecting device
  if (isMobile === null) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="animate-pulse-soft flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-pink-100" />
          <div className="h-3 w-24 rounded-full bg-gray-200" />
        </div>
      </div>
    );
  }

  return isMobile ? <MobilePage /> : <DesktopForm />;
}
