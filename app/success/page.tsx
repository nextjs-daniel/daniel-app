import Image from "next/image"

export default function SuccessPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-12">
      <div className="animate-scale-in w-full max-w-md text-center">
        <div className="rounded-3xl border border-pink-100 bg-white p-12 shadow-xl shadow-pink-50/50">
          <div className="animate-bounce-soft mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-rose-100">
            <svg
              className="h-10 w-10 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">See ya!</h2>
          
          <Image 
            src="/success.gif"
            alt="Goodbye"
            width={400}
            height={300}
            className="mx-auto mt-6 rounded-lg shadow-md"
          />

          <p className="mt-3 text-gray-300 leading-relaxed">
            You cant complete it again!
          </p>

          <div className="mt-8">
            <a
              href="/"
              className="cursor-pointer inline-block rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-200/60 transition-all hover:scale-[1.02]"
            >
              Back to start
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
