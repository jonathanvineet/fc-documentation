'use client';
import { useState } from 'react';
import styles from './WiringGuide.module.css';

const wiringData = [
    { id: 'rx', label: 'Receiver', content: 'Connect SBUS to RX1. For CRSF, use TX1/RX1. Ensure UART1 is set to Serial RX in configurator.' },
    { id: 'gps', label: 'GPS & Compass', content: 'GPS connects to UART3 (TX3/RX3). Compass (I2C) connects to SDA/SCL pads.' },
    { id: 'vtx', label: 'Video Transmitter', content: 'VTX SmartAudio/Tramp connects to TX2. Video signal goes to VO pad.' },
    { id: 'cam', label: 'FPV Camera', content: 'Camera Video connects to VI pad. Power via 5V or 9V BEC depending on camera voltage.' },
];

export default function WiringGuide() {
    const [activeTab, setActiveTab] = useState(wiringData[0]);

    return (
        <section className="container" id="wiring">
            <div className={styles.section}>
                <h2 className={styles.title}>Wiring <span className="text-gradient">Guide</span></h2>

                <div className={styles.tabs}>
                    {wiringData.map(tab => (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${activeTab.id === tab.id ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className={`${styles.content} glass-panel animate-fade-in`}>
                    <div className={styles.diagramPlaceholder}>
                        {/* Real implementation would use Next.js Image here */}
                        <span>Diagram for {activeTab.label}</span>
                    </div>
                    <p style={{ marginTop: '2rem', maxWidth: '600px', textAlign: 'center', lineHeight: '1.6' }}>
                        {activeTab.content}
                    </p>
                </div>
            </div>
        </section>
    );
}
