"use client";

import Image from "next/image";

export default function MobilePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">Told you!!!</h1>
          <p className="text-base text-gray-500">Use a PC</p>
        </div>

        <Image
          src="/pointing.webp"
          alt="Pointing"
          width={630}
          height={853}
          className="mx-auto rounded-2xl"
          priority
        />
      </div>
    </div>
  );
}
