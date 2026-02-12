export default function FAQ() {
    return (
        <section className="container" id="faq" style={{ padding: '4rem 0', paddingBottom: '8rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                Trouble<span className="text-gradient">shooting</span>
            </h2>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px', display: 'grid', gap: '2rem' }}>
                <div>
                    <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>No Gyro detected?</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Ensure you are using the correct target (ELCOF7). The BMI270 requires a specific initialization sequence found in newer firmware versions (4.3+).</p>
                </div>

                <div>
                    <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Blackbox logging not working?</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Check if the SD card is formatted to FAT32. For onboard dash, ensure &quot;Blackbox&quot; is enabled in the Configuration tab.</p>
                </div>

                <div>
                    <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>4V5 rail issues?</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>The 4V5 pad is powered by USB. If your receiver doesn&apos;t power up on USB, ensure it&apos;s connected to a 4V5 pad, not a 5V rail which might only be active on LiPo.</p>
                </div>
            </div>
        </section>
    );
}
