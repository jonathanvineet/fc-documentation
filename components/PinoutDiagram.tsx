'use client';
import { useState } from 'react';
import styles from './PinoutDiagram.module.css';

const pinData = [
    { id: 1, name: 'VBAT', desc: 'Main battery input (3-6S). Connect directly to LiPo positive terminal.' },
    { id: 2, name: 'GND', desc: 'Common Ground. Connect to LiPo negative terminal.' },
    { id: 3, name: '5V BEC', desc: '5V Output (3A Max). Powers receiver, GPS, and other peripherals.' },
    { id: 4, name: 'RX1', desc: 'UART1 Receiver Input. Connect SBUS/IBUS/CRSF receiver signal here.' },
];

export default function PinoutDiagram() {
    const [activePin, setActivePin] = useState(pinData[0]);

    return (
        <section className="container" id="pinout">
            <div className={styles.section}>
                <h2 className={styles.title}>Interactive <span className="text-gradient">Pinout</span></h2>

                <div className={styles.container}>
                    <div className={`${styles.diagram} glass-panel`}>
                        <div className={styles.chip}>STM32F7</div>
                        {/* Render Pins */}
                        {pinData.map(pin => (
                            <div
                                key={pin.id}
                                className={styles.pin}
                                onMouseEnter={() => setActivePin(pin)}
                                title={pin.name}
                            />
                        ))}
                    </div>

                    <div className={`${styles.infoPanel} glass-panel animate-fade-in`}>
                        <h3 className={styles.pinTitle}>{activePin.name}</h3>
                        <p className={styles.pinDesc}>{activePin.desc}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
