# ELCO F7 Ultimate Flight Controller - Documentation

**Version:** 1.0.0  
**Document Revision:** Rev A  
**Last Updated:** February 2026  
**Firmware Compatibility:** Betaflight 4.3+, INAV 7.0+

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | Feb 2026 | {{AUTHOR_NAME}} | Initial release documentation |
| 0.9.0 | Jan 2026 | {{AUTHOR_NAME}} | Pre-release draft |

---

## Table of Contents

1. [Introduction & Overview](#1-introduction--overview)
2. [Quick Start Guide](#2-quick-start-guide)
3. [Hardware Specifications](./hardware-specifications.md)
4. [System Architecture & Block Diagram](./system-architecture.md)
5. [Pinout Reference & Connectivity](./pinout-reference.md)
6. [Wiring Examples & Integration](./wiring-guide.md)
7. [Firmware Setup & Configuration](./firmware-setup.md)
8. [First Time Setup & Calibration](./first-time-setup.md)
9. [Ground Station & Mission Planning](./ground-station.md)
10. [Troubleshooting & FAQ](./troubleshooting.md)
11. [Safety & Regulatory Compliance](./safety-regulatory.md)
12. [Appendix & Resources](./appendix.md)

---

## 1. Introduction & Overview

### About the ELCO F7 Ultimate

The **ELCO F7 Ultimate** is a high-performance flight controller designed for racing and freestyle FPV drones. Built around the powerful STM32F722RET6 microcontroller and featuring the latest BMI270 gyroscope, it delivers exceptional flight performance in a compact 30.5×30.5mm form factor.

#### Key Features

- **High-Performance MCU:** STM32F722RET6 @ 216MHz with hardware FPU
- **Advanced IMU:** BMI270 SPI gyroscope with ultra-low noise
- **Integrated OSD:** AT7456E MAX7456 compatible chip
- **Dual BEC System:** 5V/3A and 9V/3A regulated outputs
- **16MB Blackbox Flash:** High-speed logging without SD card
- **DPS310 Barometer:** Altitude hold and position hold support
- **6 UART Ports:** Extensive peripheral connectivity
- **3-6S LiPo Support:** Wide voltage input range
- **Lightweight Design:** Only 7.8g

#### Target Applications

- Racing quads (3-7 inch)
- Freestyle drones
- Long-range cruisers
- Cinematic rigs
- Autonomous flight platforms (INAV/ArduPilot)

#### What's in the Box

- [ ] ELCO F7 Ultimate Flight Controller
- [ ] Silicone mounting grommets (8×)
- [ ] JST-SH 1.0mm connector kit
- [ ] Quick start card
- [ ] Warranty card

---

## 2. Quick Start Guide

### Prerequisites

Before you begin, ensure you have:

- Compatible frame (30×30mm mounting pattern)
- ESCs (4-in-1 or individual with BLHeli_32/BLHeli_S)
- Compatible receiver (SBUS/IBUS/CRSF/ELRS)
- USB-C cable for configuration
- 3-6S LiPo battery
- Betaflight Configurator 10.10+ or INAV Configurator 7.0+

### 5-Minute Setup

1. **Mount the FC** using soft mounting grommets
2. **Connect ESC** to VBAT and GND pads
3. **Wire receiver** to UART1 (RX1/TX1)
4. **Connect USB-C** to computer
5. **Flash firmware** using Betaflight Configurator (target: ELCOF7)
6. **Configure receiver** protocol in Ports tab
7. **Calibrate accelerometer** in Setup tab
8. **Set up failsafe** in Failsafe tab
9. **Test motors** (props off!) in Motors tab
10. **Go fly!** (After thorough ground testing)

> ⚠️ **Safety First:** Always remove propellers during bench testing and configuration!

---

## 3. Document Structure

This documentation is organized to support both first-time users and advanced builders:

### For Beginners
1. Start with [First Time Setup](./first-time-setup.md)
2. Review [Wiring Guide](./wiring-guide.md) for your specific build
3. Follow [Firmware Setup](./firmware-setup.md) step-by-step
4. Consult [Troubleshooting](./troubleshooting.md) if issues arise

### For Advanced Users
1. Review [Hardware Specifications](./hardware-specifications.md) for electrical limits
2. Study [System Architecture](./system-architecture.md) for design details
3. Reference [Pinout Reference](./pinout-reference.md) for custom wiring
4. Check [Appendix](./appendix.md) for schematics and BOM

### For Autonomous Flight (PX4/ArduPilot)
1. Read [Firmware Setup](./firmware-setup.md) - ArduPilot/PX4 sections
2. Configure following [Ground Station](./ground-station.md) guide
3. Follow calibration procedures in [First Time Setup](./first-time-setup.md)

---

## 4. Support & Community

### Official Support
- **Email:** support@elco-fc.com
- **Documentation:** https://docs.elco-fc.com
- **Firmware Updates:** https://github.com/elco-fc/firmware

### Community Forums
- **Discord:** https://discord.gg/elco-fc
- **Facebook Group:** ELCO Flight Controllers
- **Reddit:** r/Multicopter

### Reporting Issues
Please report hardware defects or documentation errors through:
- GitHub Issues: https://github.com/elco-fc/fc-documentation/issues
- Email support with clear photos and description

---

## 5. Compliance & Certifications

- **CE:** EN 301 489-1, EN 301 489-17
- **FCC:** Part 15 Class B
- **RoHS:** 2011/65/EU Compliant
- **WEEE:** Recyclable electronic waste

See [Safety & Regulatory Compliance](./safety-regulatory.md) for detailed information.

---

## 6. Warranty Information

**Warranty Period:** 12 months from date of purchase

**Coverage:**
- Manufacturing defects
- Component failures under normal use
- PCB defects

**Not Covered:**
- Crash damage
- Water damage
- Incorrect wiring causing damage
- Firmware modifications
- Normal wear and tear

For warranty claims, contact support@elco-fc.com with:
- Proof of purchase
- Serial number (on FC bottom)
- Detailed description of issue
- Clear photos

---

## Contributing to Documentation

Found an error or want to improve these docs? We welcome contributions!

1. Fork the repository: https://github.com/elco-fc/fc-documentation
2. Make your changes
3. Submit a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

---

**Navigation:**
- Next: [Hardware Specifications →](./hardware-specifications.md)
- [Return to Top ↑](#elco-f7-ultimate-flight-controller---documentation)

---

*This documentation is maintained by the ELCO development team and community contributors. For the latest version, visit https://docs.elco-fc.com*
