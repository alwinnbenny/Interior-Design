"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const instagramImages = [
  {
    src: "/images/projects/INST-1.jpg",
    alt: "Interior design detail",
  },
  {
    src: "/images/projects/INST-2.jpg",
    alt: "Interior artwork and wall detail",
  },
  {
    src: "/images/projects/INST-3.jpg",
    alt: "Interior bathroom detail",
  },
];

export default function InstagramSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Image reveal animation
      gsap.from(".instagram-image", {
        scale: 0.5,
        opacity: 0,
        transformOrigin: "center center",
        duration: 1.5,
        stagger: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".instagram-gallery",
          start: "top 85%",
          once: true,
        },
      });

      // 2. Image parallax
      gsap.utils
        .toArray<HTMLImageElement>(".instagram-image img")
        .forEach((image) => {
          gsap.fromTo(
            image,
            {
              yPercent: 0,
              scale: 1.18,
            },
            {
              yPercent: -12,
              scale: 1.18,
              ease: "none",
              scrollTrigger: {
                trigger: image.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });

      // Direction-responsive marquee

      const marqueeTrack = section.querySelector(".instagram-marquee-track");

      if (marqueeTrack) {
        // Default automatic movement: left to right
        const marqueeTween = gsap.fromTo(
          marqueeTrack,
          {
            xPercent: 0,
          },
          {
            xPercent: -50,
            duration: 24,
            ease: "none",
            repeat: -1,
          },
        );

        // Reset to default movement when scrolling stops
        const resetMarquee = gsap.delayedCall(0.2, () => {
          gsap.to(marqueeTween, {
            timeScale: 1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        });

        // Detect scroll direction and control marquee speed
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",

          onUpdate: (self) => {
            resetMarquee.pause();

            const direction = self.direction;

            gsap.to(marqueeTween, {
              timeScale: direction === -1 ? -3 : 3,
              duration: 0.25,
              ease: "power2.out",
              overwrite: true,
            });

            resetMarquee.restart(true);
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);
  return (
    <section ref={sectionRef} className="instagram-section" id="instagram">
      <div className="instagram-topline">
        <div className="instagram-label">
          <span className="instagram-dot" />
          <span>INSTAGRAM</span>
        </div>
      </div>

      <div className="instagram-gallery">
        {instagramImages.map((image) => (
          <div className="instagram-image" key={image.src}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              quality={90}
            />
          </div>
        ))}

        <div className="instagram-text-window">
          <div className="instagram-scroll-layer">
            <div className="instagram-marquee">
              <div className="instagram-marquee-track">
                <span>markovskaia designer @markovskaia designer @</span>
                <span aria-hidden="true">
                  markovskaia designer @markovskaia designer @
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
