export default function Marquee() {
  return (
    <div className="py-10 bg-[var(--foreground)] overflow-hidden border-y border-[var(--border-color)]">
      <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
        
        {/* 1. Solid Text */}
        <span className="text-5xl md:text-7xl font-black uppercase text-[var(--background)] tracking-tighter">
          Building Scalable Systems
        </span>
        
        {/* Divider: Code Slashes */}
        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

        {/* 2. Hollow/Outline Text */}
        <span className="text-5xl md:text-7xl font-black uppercase text-transparent text-stroke-accent tracking-tighter">
          Clean Architecture
        </span>

        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

        {/* 3. Solid Text */}
        <span className="text-5xl md:text-7xl font-black uppercase text-[var(--background)] tracking-tighter">
          High Performance
        </span>

        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

        {/* --- REPEAT CONTENT (For smooth infinite loop) --- */}
        
        <span className="text-5xl md:text-7xl font-black uppercase text-[var(--background)] tracking-tighter">
          Building Scalable Systems
        </span>
        
        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

        <span className="text-5xl md:text-7xl font-white uppercase text-transparent text-stroke-accent tracking-tighter">
          Clean Architecture
        </span>

        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

        <span className="text-5xl md:text-7xl font-black uppercase text-[var(--background)] tracking-tighter">
          High Performance
        </span>
        
        <span className="text-4xl text-[var(--accent)] font-mono font-bold tracking-widest">
          ///
        </span>

      </div>
    </div>
  );
}