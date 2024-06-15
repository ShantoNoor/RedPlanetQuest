"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";

export function Banner() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          RED PLANET QUEST
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to RedPlanetQuest, your gateway to the ultimate adventure of a
          lifetime – a visit to Mars! Whether you're a seasoned space enthusiast
          or a curious explorer, RedPlanetQuest offers a seamless and engaging
          application process to help you prepare for this extraordinary
          journey. Begin your quest today and take the first step towards
          exploring the Red Planet!
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}
