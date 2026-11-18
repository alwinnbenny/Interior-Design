
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  name: string;
  category: string;
  images: string[];
  labelPosition: "left" | "right";
};

const projects: Project[] = [
  {
    name: "POZDNYAKOVO",
    category: "RESIDENTIAL",
    images: [
      "/images/projects/projectimg-1.jpg",
      "/images/projects/projectimg-2.jpg",
    ],
    labelPosition: "left",
  },
  {
    name: "VIKILAND",
    category: "COMMERCIAL",
    images: [
      "/images/projects/projectimg-3.jpg",
      "/images/projects/projectimg-4.jpg",
    ],
    labelPosition: "right",
  },
  {
    name: "ALTEZZA OUTDOOR",
    category: "COMMERCIAL",
    images: [
      "/images/projects/projectimg-5.jpg",
      "/images/projects/projectimg-6.jpg",
    ],
    labelPosition: "left",
  },
  {
    name: "ROYAL SQUARE",
    category: "RESIDENTIAL",
    images: [
      "/images/projects/projectimg-7.jpg",
      "/images/projects/projectimg-8.jpg",
    ],
    labelPosition: "right",
  },
];

function ProjectLabel({
  name,
  category,
}: {
  name: string;
  category: string;
}) {
  return (
    <div className="project-label">
      <div className="project-label-inner">
        {category && <span className="project-category">{category}</span>}
        <span className="project-name">{name}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".projects-heading-line", {
        y: 70,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 85%",
        },
      });

      // Entrance reveal & scroll-driven parallax
      gsap.utils.toArray<HTMLElement>(".project-image").forEach((image) => {
        gsap.fromTo(
          image,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image,
              start: "top 88%",
            },
          }
        );

        // Scroll-driven parallax for the inner image
        const img = image.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            {
              yPercent: -10,
              scale: 1.15,
            },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });

      gsap.utils.toArray<HTMLElement>(".project-label-inner").forEach((label) => {
        gsap.from(label, {
          opacity: 0,
          y: 18,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: label,
            start: "top 88%",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <div className="projects-topline">
        <span className="projects-dot" />
        <span>PROJECTS</span>
      </div>

      <div className="projects-heading">
        <div className="projects-heading-line line-reveal heading-serif">Reveal</div>
        <div className="projects-heading-line line-potential heading-serif">
          the potential
        </div>
        <div className="projects-heading-line line-space heading-sans">
          OF EVERY SPACE
        </div>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <article
            className={`project-row ${
              project.labelPosition === "right" ? "label-right" : "label-left"
            }`}
            key={project.name}
          >
            {project.labelPosition === "left" && (
              <ProjectLabel
                name={project.name}
                category={project.category}
              />
            )}

            <div className="project-image">
              <Image
                src={project.images[0]}
                alt={`${project.name} interior project`}
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                priority={false}
              />
            </div>

            <div className="project-image">
              <Image
                src={project.images[1]}
                alt={`${project.name} interior project`}
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                priority={false}
              />
            </div>

            {project.labelPosition === "right" && (
              <ProjectLabel
                name={project.name}
                category={project.category}
              />
            )}
          </article>
        ))}
      </div>

      <div className="projects-more-container">
        <a href="#contact" className="projects-more-btn">
          OTHER PROJECTS
        </a>
      </div>
    </section>
  );
}
