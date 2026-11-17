
"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Logo from "@/components/layout/Logo";

const navigation = [
  { label: "MAIN", href: "#main" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SERVICES", href: "#services" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [selectedNav, setSelectedNav] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      setSelectedNav(window.location.hash);
    }
  }, []);

   useGSAP(
    () => {
      // Initial navbar entrance
      const intro = gsap.timeline();

      intro
        .from(".nav-logo", {
          y: -15,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".nav-link",
          {
            y: -12,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Scroll direction detection
      let isHidden = false;

      ScrollTrigger.create({
        start: 0,
        end: "max",

        onUpdate: (self) => {
          const shouldHide =
            self.direction === 1 && self.scroll() > 100;

          if (shouldHide === isHidden) return;

          isHidden = shouldHide;

          gsap.to(navRef.current, {
            yPercent: isHidden ? -110 : 0,
            autoAlpha: isHidden ? 0 : 1,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: navRef }
  );


  return (
    <header className="navbar" ref={navRef}>
      <a
        href="#main"
        className="nav-logo"
        onClick={() => setSelectedNav("#main")}
      >
        <Logo />
      </a>

      <nav className="nav-links">
        {navigation.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setSelectedNav(item.href)}
            className={`nav-link ${selectedNav === item.href ? "active" : ""}`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
