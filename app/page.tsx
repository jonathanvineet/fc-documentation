import AvionicsScene from '@/components/AvionicsScene';
import StorySection from '@/components/StorySection';
import FleetShowcase from '@/components/FleetShowcase';
import AvionicsTimeline from '@/components/AvionicsTimeline';
import TechSpecs3D from '@/components/TechSpecs3D';

const stories = [
  {
    id: 'drones',
    label: 'Mission 01 — Unmanned Aerial Systems',
    title: 'Autonomous',
    titleAccent: 'Precision',
    description:
      'From FPV racing quads to long-range survey platforms, modern drones demand flight controllers that react in microseconds. The ELCO F7 delivers unparalleled responsiveness.',
    stats: [
      { value: '32K', label: 'Hz Gyro' },
      { value: '6S', label: 'LiPo Max' },
      { value: '<1ms', label: 'Latency' },
    ],
    align: 'left' as const,
  },
  {
    id: 'helicopters',
    label: 'Mission 02 — Rotary Wing Operations',
    title: 'Vertical',
    titleAccent: 'Freedom',
    description:
      'Helicopters operate in the most demanding flight envelopes. The ELCO avionics provide the sensor fusion and control loop speed required for stable rotary-wing flight in any condition.',
    stats: [
      { value: '360°', label: 'Maneuver' },
      { value: 'VTOL', label: 'Capability' },
      { value: 'SAR', label: 'Mission Ready' },
    ],
    align: 'right' as const,
  },
  {
    id: 'commercial',
    label: 'Mission 03 — Commercial Aviation',
    title: 'Global',
    titleAccent: 'Reach',
    description:
      'Commercial fly-by-wire systems integrate thousands of sensors into a single coherent system. The ELCO platform embodies unified avionics scaling to the largest airliners.',
    stats: [
      { value: '15K+', label: 'km Range' },
      { value: '440', label: 'Passengers' },
      { value: '99.99%', label: 'Reliability' },
    ],
    align: 'left' as const,
  },
];

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* 3D Background Scene */}
      <AvionicsScene />

      {/* Content Layer */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* ===== HERO SECTION ===== */}
        <section className="hero-section">
          <div className="hero-content animate-fade-in-up">
            <div className="hero-badge">⬡ ELCO AVIONICS SYSTEMS ⬡</div>
            <h1 className="hero-title">
              Command the <span className="text-gradient-cyan">Skies</span>
            </h1>
            <p className="hero-subtitle">
              Next-generation flight control for drones, fighter jets, helicopters,
              and commercial aircraft. One platform. Every domain. Absolute precision.
            </p>
            <div className="hero-cta-group">
              <button className="btn-primary">Explore Fleet</button>
              <button className="btn-secondary">View Specs</button>
            </div>
          </div>
        </section>

        {/* ===== STORY SECTIONS ===== */}
        {stories.map((story, i) => (
          <StorySection key={story.id} {...story} index={i} />
        ))}

        {/* ===== FLEET SHOWCASE ===== */}
        <FleetShowcase />

        {/* ===== TIMELINE ===== */}
        <AvionicsTimeline />

        {/* ===== TECH SPECS ===== */}
        <TechSpecs3D />

        {/* ===== FOOTER ===== */}
        <footer className="footer" id="docs">
          <div className="container">
            <div className="footer-brand">ELCO AVIONICS</div>
            <p>
              Precision flight control systems — from micro-UAVs to transcontinental airliners.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              © 2026 ELCO Avionics. All rights reserved. ELCO F7 Ultimate Flight Controller.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
