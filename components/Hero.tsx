import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.bgGlow}></div>
            <div className={`${styles.content} animate-fade-in`}>
                <h1 className={styles.title}>
                    Control the <span className="text-gradient">Skies</span>
                </h1>
                <p className={styles.subtitle}>
                    ELCO F7 Ultimate. Precision engineering for professional drone pilots.
                    <br />Advanced telemetry, redundant sensors, and limitless customizability.
                </p>
                <div className={styles.ctaGroup}>
                    <button className={styles.primaryBtn}>Get Started</button>
                    <button className={styles.secondaryBtn}>View Specs</button>
                </div>
            </div>
        </section>
    );
}
