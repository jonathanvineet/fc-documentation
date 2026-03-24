'use client';
import { useEffect, useRef } from 'react';

const fleet = [
  {
    icon: '🛸',
    name: 'UAV / Drone',
    description: 'Precision unmanned aerial systems for reconnaissance, delivery, and FPV racing.',
    specs: [
      { key: 'Max Range', value: '15 km' },
      { key: 'Endurance', value: '45 min' },
      { key: 'Payload', value: '2.5 kg' },
      { key: 'Top Speed', value: '120 km/h' },
    ],
  },
  {
    icon: '🚁',
    name: 'Helicopter',
    description: 'Versatile rotary-wing platforms for SAR, medical evacuation, and tactical deployment.',
    specs: [
      { key: 'Max Speed', value: '295 km/h' },
      { key: 'Range', value: '1,200 km' },
      { key: 'Ceiling', value: '20,000 ft' },
      { key: 'Capacity', value: '16 PAX' },
    ],
  },
  {
    icon: '🛩️',
    name: 'Commercial',
    description: 'Modern fly-by-wire airliners with integrated avionics suites and autonomous capabilities.',
    specs: [
      { key: 'Max Speed', value: 'Mach 0.89' },
      { key: 'Range', value: '15,200 km' },
      { key: 'Ceiling', value: '43,100 ft' },
      { key: 'Capacity', value: '440 PAX' },
    ],
  },
];
export default function FleetShowcase() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = el.querySelectorAll('.fleet-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="fleet-section" id="fleet">
      <div className="container">
        <div className="section-header">
          <h2>
            The <span className="text-gradient-cyan">Fleet</span>
          </h2>
          <p>From micro UAVs to transcontinental airliners — one avionics platform to rule them all.</p>
        </div>

        <div className="fleet-grid" ref={gridRef}>
          {fleet.map((item, i) => (
            <div
              className="fleet-card"
              key={i}
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            >
              <span className="fleet-icon">{item.icon}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="fleet-specs">
                {item.specs.map((spec, j) => (
                  <div className="fleet-spec-row" key={j}>
                    <span>{spec.key}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
