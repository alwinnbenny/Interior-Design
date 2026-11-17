"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".hero-first-name", {
        yPercent: 110,
        opacity: 0,
        duration: 1.8,
      })
        .from(
          ".hero-last-name",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.8,
          },
           "<",
        )
        .from(
          ".hero-meta",
          {
            y: 15,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.65",
        )
        .from(
          ".hero-video-viewport",
          {
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
          },
          "-=0.35",
        )
        .from(
          ".intro-elegant span",
          {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        );
    },
    { scope: heroRef },
  );

  return (
    <section id="main" className="hero" ref={heroRef}>
      <div className="hero-heading">
        <div className="hero-name-mask">
          <span className="hero-first-name">Irina</span>
        </div>

        <div className="hero-name-mask">
          <span className="hero-last-name">MARKOVSKAIA</span>
        </div>
      </div>

      <div className="hero-meta">
        <span>© 2024</span>
        <span>INTERIOR DESIGNER / DECORATOR / ARTIST</span>
      </div>

      {/* Single continuous video */}
      <div className="hero-media">
        <div className="hero-video-viewport">
          <video
            className="hero-video"
            src="/videos/main.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        <div className="intro-elegant">
          <div className="intro-elegant-line first">
            <span>Elegant</span>
          </div>

          <div className="intro-elegant-line second">
            <span>functionality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
