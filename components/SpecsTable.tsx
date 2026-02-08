import styles from './SpecsTable.module.css';

const specs = [
    { feature: 'MCU', detail: 'STM32F722RET6 High Performance' },
    { feature: 'IMU', detail: 'BMI270 (SPI)' },
    { feature: 'Barometer', detail: 'DPS310' },
    { feature: 'OSD', detail: 'AT7456E' },
    { feature: 'BEC Output', detail: '5V/3A, 9V/3A Dual BEC' },
    { feature: 'Blackbox', detail: '16MB Flash' },
    { feature: 'UARTs', detail: '6 Available Ports' },
    { feature: 'Input Voltage', detail: '3-6S LiPo' },
    { feature: 'Dimensions', detail: '30.5 x 30.5mm Mounting Pattern' },
    { feature: 'Weight', detail: '7.8g' },
];

export default function SpecsTable() {
    return (
        <section className={`${styles.section} container`} id="specs">
            <h2 className={styles.title}>Technical <span className="text-gradient">Specifications</span></h2>
            <div className={`${styles.tableContainer} glass-panel`}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specs.map((row, index) => (
                            <tr key={index}>
                                <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.feature}</td>
                                <td>{row.detail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
