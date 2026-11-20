"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { category: "MAIN", title: "DESIGN PROJECT", number: "01" },
  { category: "POST-PROJECT", title: "INTERIOR EQUIPMENT", number: "02" },
  { category: "", title: "DECORATION", number: "03" },
  { category: "", title: "SUPERVISION", number: "04" },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".services-heading-line", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-heading",
          start: "top 85%",
        },
      });

      // Service rows
      gsap.from(".service-row", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 85%",
        },
      });

      // Button
      gsap.from(".services-button", {
        opacity: 0,
        y: 15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-button",
          start: "top 95%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section"
    >
      <div className="services-topline">
        <span className="services-dot" />
        <span>SERVICES</span>
      </div>

      <div className="services-heading">
        <div className="services-heading-line services-serif services-line-one">
          Comfortable
        </div>

        <div className="services-heading-line services-serif services-line-two">
          &amp; transparent
        </div>

        <div className="services-heading-line services-sans services-line-three">
          PROCESS
        </div>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <div className="service-row" key={service.number}>
            <div className="service-category">
              {service.category}
            </div>

            <div className="service-title">
              {service.title}
            </div>

            <div className="service-number">
              {service.number}
            </div>
          </div>
        ))}
      </div>

      <div className="services-button-wrapper">
        <a href="#process" className="services-button">
          PROCESS AND PRICES
        </a>
      </div>
    </section>
  );
}