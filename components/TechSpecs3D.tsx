'use client';
import { useEffect, useRef } from 'react';

const specs = [
  { icon: '⚡', name: 'MCU', value: 'STM32F722RET6', bar: 92 },
  { icon: '🎯', name: 'IMU Sensor', value: 'BMI270 (SPI)', bar: 88 },
  { icon: '📊', name: 'Barometer', value: 'DPS310', bar: 85 },
  { icon: '📺', name: 'OSD Chip', value: 'AT7456E', bar: 80 },
  { icon: '🔋', name: 'BEC Output', value: '5V/3A + 9V/3A', bar: 95 },
  { icon: '💾', name: 'Blackbox', value: '16MB Flash', bar: 75 },
  { icon: '🔌', name: 'UARTs', value: '6 Ports', bar: 90 },
  { icon: '⚙️', name: 'Input Voltage', value: '3-6S LiPo', bar: 87 },
  { icon: '📐', name: 'Mounting', value: '30.5 × 30.5mm', bar: 70 },
  { icon: '⚖️', name: 'Weight', value: '7.8g', bar: 98 },
];

export default function TechSpecs3D() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = el.querySelectorAll('.spec-item');
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = '1';
                (item as HTMLElement).style.transform = 'translateY(0)';
                // Animate bars
                const bar = item.querySelector('.spec-bar-fill') as HTMLElement;
                if (bar) {
                  bar.style.width = bar.dataset.width || '0%';
                }
              }, i * 80);
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
    <section className="specs-section" id="specs">
      <div className="container">
        <div className="section-header">
          <h2>
            ELCO F7 <span className="text-gradient-cyan">Specifications</span>
          </h2>
          <p>Professional-grade flight controller engineered for precision across all domains.</p>
        </div>

        <div className="specs-grid" ref={gridRef}>
          {specs.map((spec, i) => (
            <div
              className="spec-item"
              key={i}
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            >
              <span className="spec-icon">{spec.icon}</span>
              <div className="spec-name">{spec.name}</div>
              <div className="spec-value">{spec.value}</div>
              <div className="spec-bar">
                <div
                  className="spec-bar-fill"
                  data-width={`${spec.bar}%`}
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
