"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-statement",
          start: "top 80%",
          once: true,
        },
      });

      // Three-line heading
      tl.from(".statement-line span", {
        yPercent: 105,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.fromTo(
        ".about-detail-image",
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          transformOrigin: "center center",

          scrollTrigger: {
            trigger: ".about-gallery",
            start: "top 85%",
            once: true,
          },
        },
      );



// Image panning / parallax

gsap.utils.toArray<HTMLElement>(".about-detail-image").forEach((container) => {
  const image = container.querySelector("img");

  if (!image) return;

  gsap.fromTo(
    image,
    {
      yPercent: 0,
      scale: 1.2,
    },
    {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    }
  );
});


      // About information
      gsap.from(".about-information", {
        scrollTrigger: {
          trigger: ".about-information",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 25,
        duration: 0.9,
        ease: "power2.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="about" className="intro-section">
      {/* Main editorial statement */}
      <div className="intro-statement">
        <div className="statement-line first">
          <span>FOR RESIDENTIAL</span>
        </div>

        <div className="statement-line second">
          <span>AND COMMERCIAL</span>
        </div>

        <div className="statement-line third">
          <span>INTERIORS</span>
        </div>
      </div>

      {/* Interior detail gallery */}
      <div className="about-gallery">
        <div className="about-gallery-line" />

        <div className="about-detail-image portrait">
          <Image
            src="/images/about/detail-01.jpg"
            alt="Interior decorative mirror"
            fill
            sizes="25vw"
          />
        </div>

        <div className="about-detail-image landscape">
          <Image
            src="/images/about/detail-02.jpg"
            alt="Interior curtain detail"
            fill
            sizes="35vw"
          />
        </div>
      </div>

      {/* About information */}
      <div className="about-information">
        <div className="about-label">
          <span className="about-dot" />
          ABOUT ME
        </div>

        <div className="about-description">
          <p>
            FOR MORE THAN 10 YEARS I HAVE BEEN CREATING MODERN, CLASSIC,
            FUNCTIONAL SPACES FOR PRIVATE AND CORPORATE CLIENTS AROUND THE
            WORLD.
          </p>

          <a href="#contact" className="about-more">
            MORE
          </a>
        </div>
      </div>
    </section>
  );
}
