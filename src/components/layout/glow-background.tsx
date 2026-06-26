export function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-hero-glow absolute inset-0" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
    </div>
  );
}
