"use client";

import { useState } from "react";

import Preloader from "@/components/PreLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function HomeIntro() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onFinish={() => setReady(true)} />
      <Navbar ready={ready} />
      <Hero ready={ready} />
    </>
  );
}
