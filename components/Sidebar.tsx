import styles from './Sidebar.module.css';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <h3 className={styles.title}>Documentation</h3>
            <ul className={styles.list}>
                <li className={styles.item}><Link href="#specs">Specifications</Link></li>
                <li className={styles.item}><Link href="#pinout">Pinout Diagram</Link></li>
                <li className={styles.item}><Link href="#wiring">Wiring Guide</Link></li>
                <li className={styles.item}><Link href="#firmware">Firmware Update</Link></li>
                <li className={styles.item}><Link href="#faq">Troubleshooting</Link></li>
            </ul>
        </aside>
    );
}
