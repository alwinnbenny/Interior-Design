
"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
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
      const tl = gsap.timeline();

      tl.from(".nav-logo", {
        y: -15,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      }).from(
        ".nav-link",
        {
          y: -12,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      );
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
