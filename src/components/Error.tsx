"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)] text-white grid place-items-center p-6">
      <div className="max-w-lg text-center space-y-3">
        <h2 className="text-2xl font-semibold">
          Unable to load the assignment
        </h2>
        <p className="text-white/70">
          {error?.message || "Please try again in a moment."}
        </p>
      </div>
    </div>
  );
}
