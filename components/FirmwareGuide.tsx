import Link from 'next/link';

export default function FirmwareGuide() {
    return (
        <section className="container" id="firmware" style={{ padding: '4rem 0' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                Firmware <span className="text-gradient">Update</span>
            </h2>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    The ELCO F7 Ultimate ships with the latest stable Betaflight release. To update or re-flash, follow these steps:
                </p>

                <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li>Download the latest <strong>Configurator</strong>.</li>
                    <li>Connect the FC via USB-C.</li>
                    <li>Select Target: <strong>ELCOF7</strong>.</li>
                    <li>Click <strong>Load Firmware [Online]</strong> then <strong>Flash Firmware</strong>.</li>
                </ol>

                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255, 0, 60, 0.1)', border: '1px solid var(--color-accent)', borderRadius: '4px' }}>
                    <strong style={{ color: 'var(--color-accent)' }}>Warning:</strong> Ensure you have a backup of your configuration ("diff all") before flashing.
                </div>
            </div>
        </section>
    );
}
