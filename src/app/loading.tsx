export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-peach-200" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-peach animate-spin" />
        </div>
        <p className="text-charcoal/60 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
