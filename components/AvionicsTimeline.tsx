'use client';
import { useEffect, useRef } from 'react';

const milestones = [
  { year: '1903', title: 'First Flight', desc: 'Wright Brothers achieve powered flight at Kitty Hawk' },
  { year: '1927', title: 'Transatlantic', desc: 'Lindbergh solo crosses the Atlantic in Spirit of St. Louis' },
  { year: '1947', title: 'Sound Barrier', desc: 'Chuck Yeager breaks Mach 1 in the Bell X-1' },
  { year: '1958', title: 'Jet Age', desc: 'Boeing 707 inaugurates commercial jet travel' },
  { year: '1969', title: 'Concorde', desc: 'Supersonic passenger flight becomes reality' },
  { year: '1976', title: 'Fly-By-Wire', desc: 'F-16 introduces digital flight control systems' },
  { year: '1988', title: 'Stealth', desc: 'B-2 Spirit redefines aerial warfare with stealth technology' },
  { year: '1995', title: 'GPS Navigation', desc: 'Satellite navigation becomes standard in aviation' },
  { year: '2006', title: 'UAV Revolution', desc: 'MQ-9 Reaper marks the rise of autonomous combat drones' },
  { year: '2015', title: 'FPV Racing', desc: 'Drone racing leagues emerge as a global phenomenon' },
  { year: '2023', title: 'eVTOL', desc: 'Electric vertical takeoff aircraft enter commercial testing' },
  { year: '2026', title: 'ELCO F7', desc: 'Next-gen flight controller unifying all avionics platforms' },
];

export default function AvionicsTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = track.querySelectorAll('.timeline-item');
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = '1';
                (item as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="timeline-section" id="timeline" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>
            History of <span className="text-gradient-amber">Flight</span>
          </h2>
          <p>Over a century of innovation — from canvas wings to autonomous flight controllers.</p>
        </div>
      </div>

      <div className="timeline-track" ref={trackRef}>
        {milestones.map((m, i) => (
          <div
            className="timeline-item"
            key={i}
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            <div className="timeline-dot" />
            <div className="timeline-year">{m.year}</div>
            <div className="timeline-title">{m.title}</div>
            <div className="timeline-desc">{m.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
