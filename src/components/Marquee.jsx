export default function Marquee() {
  return (
    <div className="py-10 bg-[var(--foreground)] overflow-hidden border-y border-[var(--border-color)]">
      <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">

        {/* 1. Solid Text */}
        <span className="text-5xl md:text-7xl font-black uppercase text-[var(--background)] tracking-tighter">
          Building Scalable UI
        </span>

        {/* Divider */}
        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

        {/* 2. Outline Text */}
        <span className="text-5xl md:text-7xl font-black uppercase text-transparent text-stroke-accent tracking-tighter">
          Component Architecture
        </span>

        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

        {/* 3. Solid Text */}
        <span className="text-5xl md:text-7xl font-black uppercase text-[var(--background)] tracking-tighter">
          Smooth Performance
        </span>

        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

        {/* --- REPEAT FOR LOOP --- */}

        <span className="text-5xl md:text-7xl font-black uppercase text-[var(--background)] tracking-tighter">
          Building Scalable UI
        </span>

        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

        <span className="text-5xl md:text-7xl font-black uppercase text-transparent text-stroke-accent tracking-tighter">
          Component Architecture
        </span>

        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

        <span className="text-5xl md:text-7xl font-black uppercase text-[var(--background)] tracking-tighter">
          Smooth Performance
        </span>

        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

      </div>
    </div>
  );
}
