// "use client";

// import { useEffect, useState } from "react";

// export default function Preloader() {
//   const [show, setShow] = useState(true);
//   const [fade, setFade] = useState(false);

//   useEffect(() => {
//     // 1. Start fading out after 2.2 seconds
//     const timer = setTimeout(() => {
//       setFade(true);
//     }, 2200);

//     // 2. Remove from DOM after animation is done (2.7s total)
//     const cleanup = setTimeout(() => {
//       setShow(false);
//     }, 2700);

//     return () => {
//       clearTimeout(timer);
//       clearTimeout(cleanup);
//     };
//   }, []);

//   if (!show) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
//         fade ? "opacity-0 pointer-events-none" : "opacity-100"
//       }`}
//     >
//       <div className="relative flex flex-col items-center">
//         {/* Name with subtle glow */}
//         <h1 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white uppercase animate-fade-in-up">
//           ASHARAF
//         </h1>
        
//         {/* Job Title / Subtitle */}
//         <p className="mt-2 text-xs md:text-sm text-gray-400 tracking-[0.5em] uppercase">
//           Front End Developer
//         </p>

//         {/* Sleek Loading Line */}
//         <div className="mt-8 h-[2px] w-0 bg-cyan-500 animate-expand-width rounded-full shadow-[0_0_10px_#06b6d4]"></div>
//       </div>

//       {/* Optional: Tech stack coordinates or minimal footer */}
//       <div className="absolute bottom-10 text-[10px] text-gray-600 font-mono">
//         Next.Js // REACT
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";

// export default function Preloader() {
//   const [show, setShow] = useState(true);
//   const [percent, setPercent] = useState(0);

//   useEffect(() => {
//     // 1. Increment the counter
//     const interval = setInterval(() => {
//       setPercent((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         // Random increment for "realistic" loading feel
//         return prev + Math.floor(Math.random() * 10) + 1;
//       });
//     }, 100);

//     // 2. Start exit animation
//     const exitTimer = setTimeout(() => {
//       setShow(false);
//     }, 2500);

//     return () => {
//       clearInterval(interval);
//       clearTimeout(exitTimer);
//     };
//   }, []);

//   if (!show) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-zinc-950 px-8 py-12 text-white transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
//         percent >= 100 ? "opacity-0 translate-y-[-100%]" : "opacity-100"
//       }`}
//     >
//       {/* Top Section: Role */}
//       <div className="w-full flex justify-between items-start opacity-50">
//         <span className="font-mono text-xs tracking-widest uppercase">
//           Portfolio 2026
//         </span>
//         <span className="font-mono text-xs tracking-widest uppercase hidden md:block">
//           Based in India
//         </span>
//       </div>

//       {/* Center: Massive Name */}
//       <div className="relative flex flex-col items-center overflow-hidden">
//         {/* Mask container for text reveal */}
//         <div className="overflow-hidden">
//             <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none animate-slide-up">
//             Asharaf
//             </h1>
//         </div>
//         <div className="overflow-hidden mt-2">
//             <p className="text-sm md:text-lg text-cyan-500 font-mono tracking-[0.5em] animate-slide-up [animation-delay:200ms]">
//             Front End Developer
//             </p>
//         </div>
//       </div>

//       {/* Bottom: Progress Bar & Tech */}
//       <div className="w-full flex items-end justify-between">
//         <div className="flex flex-col gap-2">
//             <span className="font-mono text-xs text-zinc-500">Loading Assets</span>
//             <div className="h-[2px] w-32 bg-zinc-800 rounded-full overflow-hidden">
//                 <div 
//                     className="h-full bg-cyan-500 transition-all duration-300 ease-out" 
//                     style={{ width: `${percent}%` }}
//                 />
//             </div>
//         </div>
        
//         {/* Big Percentage Number */}
//         <div className="text-6xl md:text-8xl font-thin font-mono tabular-nums leading-none">
//           {Math.min(percent, 100)}
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState, useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Text3D, Center, Environment, Float, Sparkles } from "@react-three/drei";
// import * as THREE from "three";

// // --- 3D Logo Component ---
// function Logo() {
//   const meshRef = useRef();

//   // Subtle rotation animation
//   useFrame((state) => {
//     if (meshRef.current) {
//       // Gentle floating rotation
//       meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
//       meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
//     }
//   });

//   return (
//     <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
//       <Center>
//         <group ref={meshRef}>
//           <Text3D
//             // Using a standard open-source font JSON hosted online for instant access.
//             // You can download this JSON and place it in your /public/fonts folder for offline use.
//             font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
//             size={3}       // Size of the text
//             height={0.2}   // Thickness (Depth)
//             curveSegments={12} // Smoothness (Lower = faster performance)
//             bevelEnabled
//             bevelThickness={0.02}
//             bevelSize={0.02}
//             bevelOffset={0}
//             bevelSegments={5}
//           >
//             mA
//             <meshStandardMaterial
//               color="#ffffff"
//               roughness={0.1}  // Very smooth (like polished metal)
//               metalness={0.8}  // High metalness
//               emissive="#06b6d4" // Subtle Cyan glow matching your theme
//               emissiveIntensity={0.2}
//             />
//           </Text3D>
//         </group>
//       </Center>
//     </Float>
//   );
// }

// // --- Main Preloader Component ---
// export default function Preloader() {
//   const [show, setShow] = useState(true);
//   const [percent, setPercent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPercent((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + Math.floor(Math.random() * 10) + 1;
//       });
//     }, 100);

//     const exitTimer = setTimeout(() => {
//       setShow(false);
//     }, 3500); // Extended slightly to enjoy the 3D logo

//     return () => {
//       clearInterval(interval);
//       clearTimeout(exitTimer);
//     };
//   }, []);

//   if (!show) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-zinc-950 px-8 py-12 text-white transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
//         percent >= 100 ? "opacity-0 translate-y-[-100%]" : "opacity-100"
//       }`}
//     >
//       {/* Top Section */}
//       <div className="w-full flex justify-between items-start opacity-50 z-10">
//         <span className="font-mono text-xs tracking-widest uppercase">
//           Portfolio 2026
//         </span>
//         <span className="font-mono text-xs tracking-widest uppercase hidden md:block">
//           Based in India
//         </span>
//       </div>

//       {/* Center: 3D Logo Canvas */}
//       {/* Absolute positioning centers it behind/mixed with the UI */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="h-[300px] w-full max-w-[500px]">
//           <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
//             {/* Lighting for the premium feel */}
//             <ambientLight intensity={0.5} />
//             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//             <pointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />
            
//             {/* The Logo */}
//             <Logo />
            
//             {/* Optional: Subtle background particles for depth */}
//             <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.5} color="#06b6d4" />

//             {/* Environment reflects on the metal material */}
//             <Environment preset="city" /> 
//           </Canvas>
//         </div>
//       </div>

//       {/* Role Text (Floating below the 3D logo) */}
//       <div className="relative z-10 mt-[20vh] overflow-hidden">
//         <p className="text-sm md:text-lg text-cyan-500 font-mono tracking-[0.5em] animate-slide-up uppercase">
//           Front End Developer
//         </p>
//       </div>

//       {/* Bottom: Progress Bar */}
//       <div className="w-full flex items-end justify-between z-10">
//         <div className="flex flex-col gap-2">
//             <span className="font-mono text-xs text-zinc-500">Initializing 3D Scene...</span>
//             <div className="h-[2px] w-32 bg-zinc-800 rounded-full overflow-hidden">
//                 <div 
//                     className="h-full bg-cyan-500 transition-all duration-300 ease-out" 
//                     style={{ width: `${percent}%` }}
//                 />
//             </div>
//         </div>
        
//         <div className="text-6xl md:text-8xl font-thin font-mono tabular-nums leading-none">
//           {Math.min(percent, 100)}
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState, useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Text3D, Center, Environment, Float, Sparkles } from "@react-three/drei";
// import * as THREE from "three";

// // --- 1. The Enhanced 3D Logo Component ---
// // ... keep imports same, ensure you have these:
// import { Text3D, Center, Environment, Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";

// function Logo() {
//   const textRef = useRef();
  
//   // Animation: Gentle floating for the whole composition
//   useFrame((state) => {
//     const t = state.clock.elapsedTime;
//     // We don't rotate the text heavily anymore, we let the liquid do the work.
//     // Just a very subtle "breathing" tilt.
//     if (textRef.current) {
//         textRef.current.rotation.y = Math.sin(t * 0.5) * 0.1; 
//         textRef.current.rotation.x = Math.cos(t * 0.3) * 0.05;
//     }
//   });

//   return (
//     <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
//       <group>
//         {/* --- 1. The Centerpiece Text (mA) --- */}
//         <Center top> 
//             <group ref={textRef}>
//                 <Text3D
//                     font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
//                     size={3}
//                     height={0.2}
//                     curveSegments={12}
//                     bevelEnabled
//                     bevelThickness={0.02}
//                     bevelSize={0.02}
//                     bevelOffset={0}
//                     bevelSegments={5}
//                 >
//                     mA
//                     {/* High-End Ceramic/Plastic Look */}
//                     <meshPhysicalMaterial 
//                         color="#ffffff" 
//                         roughness={0.2} 
//                         metalness={0.8}
//                         clearcoat={1}
//                         emissive="#06b6d4"
//                         emissiveIntensity={0.1}
//                     />
//                 </Text3D>
//             </group>
//         </Center>

//         {/* --- 2. The "Creativity" - Liquid Distorted Ring --- */}
//         {/* This creates a ring that ripples and moves like water/mercury */}
//         <mesh rotation={[Math.PI / 2, 0, 0]}>
//             <torusGeometry args={[3.5, 0.4, 64, 100]} /> 
//             <MeshDistortMaterial 
//                 color="#06b6d4" 
//                 speed={3}      // How fast the liquid moves
//                 distort={0.4}  // How much it wobbles (0 = solid, 1 = chaos)
//                 radius={1} 
//                 roughness={0.1}
//                 metalness={1}
//             />
//         </mesh>

//         {/* --- 3. Secondary Orbiting Sphere (Satellite) --- */}
//         {/* A small liquid drop orbiting the main ring for extra detail */}
//         <Float speed={5} rotationIntensity={1} floatIntensity={2}>
//             <mesh position={[4, 2, 0]} scale={0.5}>
//                 <sphereGeometry args={[1, 32, 32]} />
//                 <meshStandardMaterial color="#06b6d4" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
//             </mesh>
//         </Float>
//       </group>
//     </Float>
//   );
// }

// // --- 2. Main Preloader Component ---
// export default function Preloader() {
//   const [show, setShow] = useState(true);
//   const [percent, setPercent] = useState(0);

//   useEffect(() => {
//     // A. Loading Counter Logic
//     const interval = setInterval(() => {
//       setPercent((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + Math.floor(Math.random() * 10) + 1;
//       });
//     }, 100);

//     // B. Exit Logic
//     const exitTimer = setTimeout(() => {
//       setShow(false);
//     }, 3800); // 3.8s total duration

//     return () => {
//       clearInterval(interval);
//       clearTimeout(exitTimer);
//     };
//   }, []);

//   if (!show) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-zinc-950 px-8 py-12 text-white transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
//         percent >= 100 ? "opacity-0 translate-y-[-100%]" : "opacity-100"
//       }`}
//     >
//       {/* --- Top Section: Header Info --- */}
//       <div className="w-full flex justify-between items-start opacity-50 z-10 pointer-events-none">
//         <span className="font-mono text-xs tracking-widest uppercase">
//           Portfolio 2026
//         </span>
//         <span className="font-mono text-xs tracking-widest uppercase hidden md:block">
//           Based in India
//         </span>
//       </div>

//       {/* --- Center Section: 3D Scene --- */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         {/* Container limits size so it doesn't overwhelm mobile */}
//         <div className="h-[400px] w-full max-w-[600px]">
//           <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 45 }}>
//             {/* Lighting Setup */}
//             <ambientLight intensity={0.2} />
//             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
//             <pointLight position={[0, 0, -5]} intensity={2} color="#06b6d4" />
            
//             <Logo />
            
//             {/* Background Particles */}
//             <Sparkles count={40} scale={8} size={2} speed={0.4} opacity={0.4} color="#06b6d4" />

//             {/* Environment: 'warehouse' gives great metallic reflections */}
//             <Environment preset="warehouse" /> 
//           </Canvas>
//         </div>
//       </div>

//       {/* --- Floating Role Text --- */}
//       <div className="relative z-10 mt-[25vh] overflow-hidden pointer-events-none">
//         <p className="text-sm md:text-lg text-cyan-500 font-mono tracking-[0.5em] animate-slide-up uppercase">
//           Front End Developer
//         </p>
//       </div>

//       {/* --- Bottom Section: Progress Bar --- */}
//       <div className="w-full flex items-end justify-between z-10 pointer-events-none">
//         <div className="flex flex-col gap-2">
//             <span className="font-mono text-xs text-zinc-500">Initializing System...</span>
//             <div className="h-[2px] w-32 bg-zinc-800 rounded-full overflow-hidden">
//                 <div 
//                     className="h-full bg-cyan-500 transition-all duration-300 ease-out" 
//                     style={{ width: `${percent}%` }}
//                 />
//             </div>
//         </div>
        
//         {/* Percentage Display */}
//         <div className="text-6xl md:text-8xl font-thin font-mono tabular-nums leading-none">
//           {Math.min(percent, 100)}
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";

// export default function PreloaderGSAP() {
//   const [show, setShow] = useState(true);
//   const mPath = useRef(null);
//   const aPath = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const tl = gsap.timeline({
//       onComplete: () => setShow(false),
//     });

//     // 1. Initial State: Hide strokes
//     gsap.set([mPath.current, aPath.current], { 
//       strokeDasharray: 300, 
//       strokeDashoffset: 300,
//       autoAlpha: 1 
//     });

//     // 2. Animate the "m" drawing itself
//     tl.to(mPath.current, {
//       strokeDashoffset: 0,
//       duration: 1.5,
//       ease: "power2.inOut",
//     })
//     // 3. Animate the "A" drawing itself (overlapping slightly)
//     .to(aPath.current, {
//       strokeDashoffset: 0,
//       duration: 1.5,
//       ease: "power2.inOut",
//     }, "-=1.0") // Start 1 second before 'm' finishes
    
//     // 4. "Fill" effect (Optional: Make it solid after drawing)
//     .to([mPath.current, aPath.current], {
//         fill: "#ffffff", // Fade to white fill
//         duration: 0.8,
//         ease: "power2.out"
//     })

//     // 5. Exit Animation: Scale up and fade out
//     .to(containerRef.current, {
//         scale: 1.5,
//         opacity: 0,
//         filter: "blur(10px)",
//         duration: 0.8,
//         delay: 0.5,
//         ease: "power4.in"
//     });

//     return () => tl.kill();
//   }, []);

//   if (!show) return null;

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
//     >
//       <div className="relative w-64 h-64 md:w-96 md:h-96">
//         {/* SVG Container */}
//         <svg
//           viewBox="0 0 200 200"
//           className="w-full h-full overflow-visible"
//         >
//             {/* PREMIUM GLOW FILTER definition 
//                This adds that "Neon" look to the SVG lines
//             */}
//             <defs>
//                 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//                     <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
//                     <feMerge>
//                         <feMergeNode in="coloredBlur"/>
//                         <feMergeNode in="SourceGraphic"/>
//                     </feMerge>
//                 </filter>
//             </defs>

//             {/* LETTER 'm' - Geometric Path */}
//             <path
//                 ref={mPath}
//                 d="M 40,100 L 40,60 Q 40,40 60,40 L 60,100 M 60,40 Q 80,40 80,60 L 80,100"
//                 fill="transparent"
//                 stroke="#06b6d4" // Cyan Stroke
//                 strokeWidth="8"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 filter="url(#glow)"
//                 className="opacity-0"
//             />

//             {/* LETTER 'A' - Geometric Path (Interlocked) */}
//             <path
//                 ref={aPath}
//                 d="M 100,100 L 120,40 L 140,100 M 108,80 L 132,80"
//                 fill="transparent"
//                 stroke="#06b6d4" // Cyan Stroke
//                 strokeWidth="8"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 filter="url(#glow)"
//                 className="opacity-0"
//             />
            
//             {/* Optional: Decorative Circle Ring */}
//             <circle 
//                 cx="90" cy="70" r="70" 
//                 stroke="#333" 
//                 strokeWidth="1" 
//                 fill="none" 
//                 className="animate-[spin_10s_linear_infinite] opacity-50"
//             />
//         </svg>
//       </div>

//       {/* Text Label */}
//       <div className="absolute bottom-20 flex flex-col items-center gap-2">
//         <p className="text-cyan-500 font-mono text-sm tracking-[0.5em] uppercase">
//             Mohamed Asharaf
//         </p>
//         <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";

// export default function Preloader() {
//   const [show, setShow] = useState(true);
  
//   // Refs for animation targets
//   const containerRef = useRef(null);
//   const svgRef = useRef(null);
//   const textRef = useRef(null);
//   const progressRef = useRef(null);
  
//   // Paths for the "mA" logo
//   const mPathRef = useRef(null);
//   const aPathRef = useRef(null);
//   const mGlowRef = useRef(null);
//   const aGlowRef = useRef(null);

//   useEffect(() => {
//     const tl = gsap.timeline({
//         onComplete: () => setShow(false)
//     });

//     // --- 1. SETUP: Initial States ---
//     // Hide strokes initially so we can draw them
//     gsap.set([mPathRef.current, aPathRef.current, mGlowRef.current, aGlowRef.current], {
//         strokeDasharray: 600,
//         strokeDashoffset: 600,
//         opacity: 0
//     });

//     // --- 2. ANIMATION: The "Laser" Draw ---
//     // We draw the "Glow" layer slightly delayed from the "White" layer for a trail effect
//     tl.to([mPathRef.current, aPathRef.current], {
//         strokeDashoffset: 0,
//         opacity: 1,
//         duration: 2,
//         ease: "power3.inOut",
//         stagger: 0.2
//     })
//     .to([mGlowRef.current, aGlowRef.current], {
//         strokeDashoffset: 0,
//         opacity: 0.6, // Glow is subtler
//         duration: 2,
//         ease: "power3.inOut",
//         stagger: 0.2
//     }, "<0.1") // Start 0.1s after main stroke starts

//     // --- 3. ANIMATION: The "Impact" Flash ---
//     // When drawing is done, flash the logo bright
//     .to(svgRef.current, {
//         filter: "drop-shadow(0 0 20px #06b6d4)",
//         duration: 0.3,
//         yoyo: true,
//         repeat: 1
//     })

//     // --- 4. TEXT: Decode/Scramble Effect ---
//     // We animate a dummy object to update the text content
//     .to({}, {
//         duration: 1.5,
//         onUpdate: function() {
//             // Hacker Scramble Logic
//             const finalText = "MOHAMED ASHARAF";
//             const chars = "!@#$%^&*()_+{}:?><";
//             const progress = this.progress(); // 0 to 1
//             const revealIndex = Math.floor(progress * finalText.length);
            
//             let scrambled = finalText.substring(0, revealIndex);
            
//             // Add random chars for the rest
//             for(let i = revealIndex; i < finalText.length; i++) {
//                 scrambled += chars[Math.floor(Math.random() * chars.length)];
//             }
//             if(textRef.current) textRef.current.innerText = scrambled;
//         }
//     }, "-=1.5") // Overlap with logo drawing

//     // --- 5. EXIT: The "Shutter" Wipe ---
//     // Move the whole container up forcefully
//     .to(containerRef.current, {
//         yPercent: -100,
//         duration: 1,
//         ease: "expo.inOut",
//         delay: 0.5
//     });

//     // --- PARALLEL: Progress Bar ---
//     // Runs independently of the timeline
//     gsap.to(progressRef.current, {
//         width: "100%",
//         duration: 3,
//         ease: "power2.inOut"
//     });

//     return () => tl.kill();
//   }, []);

//   if (!show) return null;

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden"
//     >
//         {/* BACKGROUND GRID (Subtle Tech Feel) */}
//         <div className="absolute inset-0 opacity-10 pointer-events-none" 
//              style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
//         </div>

//         {/* --- THE LOGO CONTAINER --- */}
//         <div className="relative w-64 h-64 md:w-96 md:h-96 mb-8">
//             <svg
//                 ref={svgRef}
//                 viewBox="0 0 200 200"
//                 className="w-full h-full overflow-visible"
//                 style={{ filter: "drop-shadow(0 0 5px rgba(6,182,212,0.5))" }}
//             >
//                 <defs>
//                     {/* Linear Gradient for that "Metallic" stroke look */}
//                     <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
//                         <stop offset="0%" stopColor="#ffffff" />
//                         <stop offset="50%" stopColor="#94a3b8" />
//                         <stop offset="100%" stopColor="#ffffff" />
//                     </linearGradient>
//                 </defs>

//                 {/* --- LAYER 1: The Cyan Glow (Back Layer) --- */}
//                 {/* We offset this slightly to create a "glitch" 3D depth */}
//                 <g transform="translate(2, 2)">
//                     {/* Geometric 'm' */}
//                     <path
//                         ref={mGlowRef}
//                         d="M 20,100 L 20,40 Q 20,20 40,20 Q 60,20 60,40 L 60,100 Q 60,20 100,20 Q 140,20 140,100"
//                         fill="none"
//                         stroke="#06b6d4"
//                         strokeWidth="6"
//                         strokeLinecap="round"
//                         className="opacity-50 blur-[2px]"
//                     />
//                     {/* Geometric 'A' (Interlocking) */}
//                     <path
//                         ref={aGlowRef}
//                         d="M 120,100 L 150,20 L 180,100 M 130,70 L 170,70"
//                         fill="none"
//                         stroke="#06b6d4"
//                         strokeWidth="6"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="opacity-50 blur-[2px]"
//                     />
//                 </g>

//                 {/* --- LAYER 2: The Solid Metal (Front Layer) --- */}
//                 <g>
//                     {/* Geometric 'm' */}
//                     <path
//                         ref={mPathRef}
//                         d="M 20,100 L 20,40 Q 20,20 40,20 Q 60,20 60,40 L 60,100 Q 60,20 100,20 Q 140,20 140,100"
//                         fill="none"
//                         stroke="url(#metal-grad)" // Uses the gradient defined above
//                         strokeWidth="4"
//                         strokeLinecap="round"
//                     />
//                     {/* Geometric 'A' */}
//                     <path
//                         ref={aPathRef}
//                         d="M 120,100 L 150,20 L 180,100 M 130,70 L 170,70"
//                         fill="none"
//                         stroke="url(#metal-grad)"
//                         strokeWidth="4"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     />
//                 </g>
                
//                 {/* Decorative Tech Nodes (Small dots at endpoints) */}
//                 <circle cx="20" cy="100" r="3" fill="#06b6d4" className="animate-pulse" />
//                 <circle cx="140" cy="100" r="3" fill="#06b6d4" className="animate-pulse" />
//                 <circle cx="180" cy="100" r="3" fill="#06b6d4" className="animate-pulse" />
//             </svg>
//         </div>

//         {/* --- SCRAMBLE TEXT NAME --- */}
//         <h1 
//             ref={textRef} 
//             className="text-2xl md:text-4xl font-mono font-bold tracking-[0.2em] text-cyan-50 h-10 w-full text-center"
//         >
//             {/* Text injected by GSAP */}
//         </h1>

//         <p className="text-zinc-500 text-xs font-mono tracking-widest mt-2 uppercase">
//             Front End Developer
//         </p>

//         {/* --- LOADING LINE --- */}
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-900">
//             <div 
//                 ref={progressRef}
//                 className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-0 shadow-[0_0_15px_#06b6d4]"
//             ></div>
//         </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [show, setShow] = useState(true);
  
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  
  // Paths for the logo
  const mPathRef = useRef(null);
  const aPathRef = useRef(null);
  const mGlowRef = useRef(null);
  const aGlowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
        onComplete: () => setShow(false)
    });

    // 1. Initial State
    gsap.set([mPathRef.current, aPathRef.current, mGlowRef.current, aGlowRef.current], {
        strokeDasharray: 600,
        strokeDashoffset: 600,
        opacity: 0
    });

    // 2. Animate: Draw the strokes
    tl.to([mPathRef.current, aPathRef.current], {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.2
    })
    // The "Glow" layer follows slightly behind
    .to([mGlowRef.current, aGlowRef.current], {
        strokeDashoffset: 0,
        opacity: 0.5, 
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.2
    }, "<0.1") 

    // 3. Impact Flash (Lime Green)
    .to(svgRef.current, {
        filter: "drop-shadow(0 0 25px #D9F216)", // Strong Acid Flash
        duration: 0.3,
        yoyo: true,
        repeat: 1
    })

    // 4. Scramble Text Decode
    .to({}, {
        duration: 1.5,
        onUpdate: function() {
            const finalText = "MOHAMED ASHARAF";
            const chars = "!@#$%^&*{}/";
            const progress = this.progress();
            const revealIndex = Math.floor(progress * finalText.length);
            
            let scrambled = finalText.substring(0, revealIndex);
            for(let i = revealIndex; i < finalText.length; i++) {
                scrambled += chars[Math.floor(Math.random() * chars.length)];
            }
            if(textRef.current) textRef.current.innerText = scrambled;
        }
    }, "-=1.5")

    // 5. Exit: Slide Up
    .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        delay: 0.5
    });

    // Parallel: Progress Bar
    gsap.to(progressRef.current, {
        width: "100%",
        duration: 3,
        ease: "power2.inOut"
    });

    return () => tl.kill();
  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
        {/* BACKGROUND GRID (Subtle Dark Grey to match the deep black theme) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
                 backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* --- LOGO CONTAINER --- */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 mb-8">
            <svg
                ref={svgRef}
                viewBox="0 0 200 200"
                className="w-full h-full overflow-visible"
                style={{ filter: "drop-shadow(0 0 5px rgba(217, 242, 22, 0.4))" }} // Subtle Lime Shadow
            >
                <defs>
                    {/* Gradient: White to Metal to White */}
                    <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#71717a" />
                        <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                </defs>

                {/* LAYER 1: The Acid Lime Glow (Back Layer) */}
                <g transform="translate(3, 3)">
                    <path
                        ref={mGlowRef}
                        d="M 20,100 L 20,40 Q 20,20 40,20 Q 60,20 60,40 L 60,100 Q 60,20 100,20 Q 140,20 140,100"
                        fill="none"
                        stroke="#D9F216" 
                        strokeWidth="6"
                        strokeLinecap="round"
                        className="opacity-50 blur-[3px]"
                    />
                    <path
                        ref={aGlowRef}
                        d="M 120,100 L 150,20 L 180,100 M 130,70 L 170,70"
                        fill="none"
                        stroke="#D9F216"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-50 blur-[3px]"
                    />
                </g>

                {/* LAYER 2: The Solid Structure (Front Layer) */}
                <g>
                    <path
                        ref={mPathRef}
                        d="M 20,100 L 20,40 Q 20,20 40,20 Q 60,20 60,40 L 60,100 Q 60,20 100,20 Q 140,20 140,100"
                        fill="none"
                        stroke="url(#metal-grad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <path
                        ref={aPathRef}
                        d="M 120,100 L 150,20 L 180,100 M 130,70 L 170,70"
                        fill="none"
                        stroke="url(#metal-grad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                
                {/* Tech Dots (The Lime Green Accent) */}
                <circle cx="20" cy="100" r="3" fill="#D9F216" className="animate-pulse" />
                <circle cx="140" cy="100" r="3" fill="#D9F216" className="animate-pulse" />
                <circle cx="180" cy="100" r="3" fill="#D9F216" className="animate-pulse" />
            </svg>
        </div>

        {/* --- SCRAMBLE TEXT --- */}
        <h1 
            ref={textRef} 
            className="text-2xl md:text-4xl font-black font-mono tracking-tighter text-white h-10 w-full text-center uppercase"
        >
            {/* GSAP fills this */}
        </h1>

        {/* Subtitle with the Lime Accent Color */}
        <p className="text-[#D9F216] text-xs font-mono tracking-[0.5em] mt-4 uppercase">
            Front End Developer
        </p>

        {/* --- LOADING LINE --- */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-900">
            <div 
                ref={progressRef}
                className="h-full bg-[#D9F216] w-0 shadow-[0_0_20px_#D9F216]"
            ></div>
        </div>
    </div>
  );
}