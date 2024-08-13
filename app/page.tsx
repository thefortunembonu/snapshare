"use client";

import Hero from "../components/sections/Hero";
import WhySnapShare from "../components/sections/WhySnapShare";
import Community from "../components/sections/Community";
import Footer from "../components/sections/Footer";
import { useVerify } from "@/lib/hooks";
import { useEffect } from "react";

export default function Home() {
  const verify = useVerify();

  useEffect(() => {
    verify();
  }, []);

  return (
    <main>
      <Hero />
      <WhySnapShare />
      <Community />
      <Footer />
    </main>
  );
}
