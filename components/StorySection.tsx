'use client';
import { useEffect, useRef } from 'react';

interface StorySectionProps {
  id: string;
  label: string;
  title: string;
  titleAccent: string;
  description: string;
  stats: { value: string; label: string }[];
  align: 'left' | 'right';
  index: number;
}

export default function StorySection({
  id,
  label,
  title,
  titleAccent,
  description,
  stats,
  align,
  index,
}: StorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      className="story-section"
      ref={sectionRef}
      style={{
        opacity: 0,
        transform: 'translateY(60px)',
        transition: 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className="container">
        <div className={`story-content ${align === 'right' ? 'align-right' : 'align-left'}`}>
          <div className="story-label">{label}</div>
          <h2 className="story-title">
            {title} <span className="text-gradient-cyan">{titleAccent}</span>
          </h2>
          <p className="story-description">{description}</p>
          <div className="story-stats">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
