import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={`${styles.nav} glass-panel`}>
            <div className={styles.logo}>ELCO<span style={{ color: 'var(--text-primary)' }}>FC</span></div>
            <div className={styles.links}>
                <Link href="#specs" className={styles.link}>Specs</Link>
                <Link href="#pinout" className={styles.link}>Pinout</Link>
                <Link href="#wiring" className={styles.link}>Wiring</Link>
                <Link href="#firmware" className={styles.link}>Firmware</Link>
            </div>
        </nav>
    );
}
