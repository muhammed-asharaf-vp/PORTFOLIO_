"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiTarget, FiCpu, FiActivity, FiCrosshair, FiRefreshCw } from "react-icons/fi";

export default function ReflexGame() {
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  // --- Game State ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  // Stats
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds round
  const [highScore, setHighScore] = useState(0);
  
  // Reflex Logic
  const [targetPos, setTargetPos] = useState({ top: "50%", left: "50%" });
  const [spawnTime, setSpawnTime] = useState(0); // When the target appeared
  const [reactionTimes, setReactionTimes] = useState([]); // Store all clicks
  const [avgReflex, setAvgReflex] = useState(0); // Average MS

  // --- Timer Logic ---
  useEffect(() => {
    let interval;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  // --- Game Functions ---

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setReactionTimes([]);
    setAvgReflex(0);
    moveTarget();
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    if (score > highScore) setHighScore(score);
  };

  const moveTarget = () => {
    if (!containerRef.current) return;

    // 1. Calculate Random Position (10% to 90% to avoid edges)
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    setTargetPos({ top: `${y}%`, left: `${x}%` });

    // 2. Record Spawn Time for Reflex Calculation
    setSpawnTime(Date.now());

    // 3. Animation: Pop In
    gsap.fromTo(targetRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }
    );
  };

  const handleHit = (e) => {
    e.stopPropagation(); // Prevent clicking container
    
    // 1. Calculate Reflex
    const reactionTime = Date.now() - spawnTime;
    const newHistory = [...reactionTimes, reactionTime];
    setReactionTimes(newHistory);
    
    // Calculate Average
    const avg = Math.round(newHistory.reduce((a, b) => a + b, 0) / newHistory.length);
    setAvgReflex(avg);

    // 2. Increase Score
    setScore((prev) => prev + 1);

    // 3. Animation: Pop Out (Glitch effect)
    gsap.to(targetRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 0.1,
      onComplete: () => {
        moveTarget(); // Move immediately after hit
      }
    });
  };

  const handleMiss = () => {
    if (isPlaying) {
      // Optional: Penalty for missing
      // setScore(prev => Math.max(0, prev - 1));
      
      // Visual Feedback for miss
      gsap.to(containerRef.current, {
        backgroundColor: "rgba(239, 68, 68, 0.1)", // Red flash
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            gsap.set(containerRef.current, { backgroundColor: "transparent" });
        }
      });
    }
  };

  return (
    <section className="relative w-full py-24 px-4 overflow-hidden bg-neutral-950 text-white select-none">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                Reflex <span className="text-transparent bg-clip-text bg-[#ccff00]">Trainer</span>
            </h2>
        </div>

        {/* --- GAME BOARD --- */}
        <div 
            className="relative w-full flex flex-col gap-4"
        >
            {/* HUD / Stats Bar */}
            <div className="flex justify-between items-center p-4 bg-neutral-900/80 border border-neutral-800 rounded-t-xl backdrop-blur-md font-mono text-sm">
                <div className="flex gap-6">
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-[10px] uppercase">Score</span>
                        <span className="text-xl font-bold text-white">{score}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-[10px] uppercase">Avg Speed</span>
                        <span className="text-xl font-bold text-[#ccff00]">{avgReflex > 0 ? `${avgReflex}ms` : '--'}</span>
                    </div>
                </div>
                
                <div className="text-right">
                    <span className="text-gray-500 text-[10px] uppercase block">Time Left</span>
                    <span className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                        00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                    </span>
                </div>
            </div>

            {/* Interactive Area */}
            <div 
                ref={containerRef}
                onClick={handleMiss}
                className="relative w-full h-[400px] md:h-[500px] bg-neutral-900 border border-neutral-800 rounded-b-xl overflow-hidden cursor-crosshair shadow-2xl"
            >
                {/* Background Grid inside board */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
                </div>

                {/* --- START OVERLAY --- */}
                {!isPlaying && !gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                         <button 
                            onClick={startGame}
                            className="group relative px-8 py-3 bg-[#ccff00] text-black font-bold uppercase tracking-widest hover:bg-[#ccbb00] transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="flex items-center gap-2"><FiCrosshair /> Initialize</span>
                        </button>
                        <p className="mt-4 text-xs text-gray-400 font-mono">Click targets to calibrate reflexes.</p>
                    </div>
                )}

                {/* --- GAME OVER OVERLAY --- */}
                {gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-30 animate-in fade-in duration-300">
                        <h3 className="text-3xl font-bold text-white mb-1">SESSION COMPLETE</h3>
                        <p className="text-[#ccff00] font-mono text-sm mb-6">High Score: {highScore}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8 w-64">
                            <div className="bg-neutral-800 p-3 rounded text-center">
                                <div className="text-[10px] text-gray-500 uppercase">Hits</div>
                                <div className="text-xl font-bold">{score}</div>
                            </div>
                            <div className="bg-neutral-800 p-3 rounded text-center">
                                <div className="text-[10px] text-gray-500 uppercase">Avg Reflex</div>
                                <div className="text-xl font-bold text-[#ccff00]">{avgReflex}ms</div>
                            </div>
                        </div>

                        <button 
                            onClick={startGame}
                            className="flex items-center gap-2 px-6 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors uppercase text-sm font-bold tracking-wider"
                        >
                            <FiRefreshCw /> Re-Calibrate
                        </button>
                    </div>
                )}

                {/* --- THE TARGET --- */}
                <button
                    ref={targetRef}
                    onClick={handleHit}
                    style={{ 
                        top: targetPos.top, 
                        left: targetPos.left,
                        display: isPlaying ? 'flex' : 'none'
                    }}
                    className="absolute w-16 h-16 -ml-8 -mt-8 items-center justify-center rounded-full group cursor-pointer active:scale-95"
                >
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#ccff00] opacity-50 animate-ping"></div>
                    {/* Core */}
                    <div className="w-12 h-12 bg-[#ccff00] rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)] flex items-center justify-center text-black">
                        <FiTarget className="text-xl" />
                    </div>
                </button>
            </div>
        </div>
      </div>
    </section>
  );
}