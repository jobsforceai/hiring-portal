export default function Loading() {
  return (
    <div className="min-h-screen bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)] text-white grid place-items-center p-6">
      <div className="animate-pulse w-full max-w-5xl space-y-4">
        <div className="h-8 w-72 bg-white/10 rounded" />
        <div className="h-4 w-48 bg-white/10 rounded" />
        <div className="h-64 bg-white/10 rounded-2xl" />
      </div>
    </div>
  );
}
