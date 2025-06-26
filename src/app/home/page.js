"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function Homepage() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen bg-homepage-background overflow-hidden flex flex-col">
      {/* Background Vector */}
      <Image
        src="/images/Vector2.png"
        fill
        alt="Background Vector"
        className="object-cover z-0"
        priority
      />

      {/* Top Right Dashboard Image */}
<div className="absolute -mr-40 right-[10%] top-0 w-[1200px] md:w-[700px] lg:w-[900px] h-[500px] md:h-[400px] lg:h-[640px] z-5 ">
  <Image
    src="/images/home-dashboard.png"
    fill
    alt="Dashboard"
    className="object-contain"
    priority
  />
</div>

      {/* Bottom Right Rotated Dashboard Image */}
<div className="absolute right-[18%] bottom-0 w-[1200px] md:w-[700px] lg:w-[900px] h-[320px] md:h-[450px] lg:h-[560px] z-20 ">
  {/* Rectangle1 as the background/base */}
  <Image
    src="/images/rectangle.png"
    fill
    alt="Dashboard 2 "
    className="object-contain"
    priority
  />
  {/* Rectangle overlay, centered and smaller */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-2/3 h-2/3 relative">
      <Image
        src="/images/rectangle1.png"
        fill
        alt="Dashboard 2 Overlay"
        className="object-contain"
        priority
      />
    </div>
  </div>
</div>
<div className="absolute  right-[-17%] top-20 w-[1800px] md:w-[1400px] lg:w-[1400px] h-[800px] md:h-[600px] lg:h-[840px] z-10">
  <Image
    src="/images/home-dashboard2.png"
    fill
    alt="Dashboard"
    className="object-contain"
    priority
  />
</div>
      {/* <div className="absolute right-40 top- w-[340px] md:w-[500px] lg:w-[668px] h-[220px] md:h-[320px] lg:h-[432px] z-10">
        <Image
          src="/images/rectangle1.png"
          fill
          alt="Dashboard"
          className="object-contain"
          priority
        /> */}
        {/* </div> */}
            {/* Bottom Right Dashboard Image */}
<div className="absolute right-0 bottom-0 w-[900px] md:w-[500px] lg:w-[668px] h-[400px] md:h-[520px] lg:h-[640px] z-10">
  <Image
    src="/images/candidateprofile.png"
    fill
    alt="Dashboard"
    className="object-contain"
    priority
  />
</div>

      {/* Main Content */}
<div className="flex flex-1 items-center justify-center">
  <div className="font-semibold p-6 max-w-3xl ml-[-780px] z-30 relative">
    <h1 className="text-4xl md:text-6xl lg:text-7xl text-left text-homepage-foreground-hr leading-tight">
      <span className="relative inline-block">
        HR Manag
        <span className="absolute -bottom-2 left-0 h-1.5 w-full bg-homepage-foreground-alight"></span>
      </span>
      <span className="text-homepage-foreground-hr ">ement</span>
    </h1>
    <p className="mt-6 text-4xl md:text-6xl lg:text-7xl text-left text-homepage-foreground-alight leading-tight">
      <span className="relative inline-block">
        Alight
        <span className="absolute -bottom-2 left-0 h-1.5 w-full bg-homepage-foreground-hr"></span>
      </span>
      &nbsp;<span className="text-homepage-foreground-alight font-bold">HR</span>
    </p>
    <div className="mt-10 items-center ">
      <button
        onClick={() => router.push('/login')}
        className="px-8 py-2 bg-homepage-foreground-alight text-white text-2xl rounded-lg shadow-lg hover:bg-homepage-foreground-hr transition"
      >
        Get Started <ArrowRight className="inline ml-2" />
      </button>
    </div>
  </div>
</div>
    </div>
  )
}