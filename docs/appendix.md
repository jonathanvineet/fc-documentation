# Appendix & Resources

**Document Version:** 1.0.0  
**Last Updated:** February 2026

---

## Table of Contents

1. [Glossary of Terms](#glossary-of-terms)
2. [Acronyms & Abbreviations](#acronyms--abbreviations)
3. [Bill of Materials](#bill-of-materials)
4. [Schematics & Diagrams](#schematics--diagrams)
5. [Firmware Resources](#firmware-resources)
6. [Community Resources](#community-resources)
7. [Technical References](#technical-references)
8. [Revision History](#revision-history)

---

## Glossary of Terms

### A

**Accelerometer** - Sensor that measures linear acceleration (G-forces) in 3 axes. Used for auto-leveling and launch detection.

**ACRO (Acrobatic) Mode** - Manual flight mode with no auto-leveling. Quad maintains angular velocity, not angle. Preferred by experienced pilots.

**ADC (Analog-to-Digital Converter)** - Circuit that converts analog voltage signals (like battery voltage) to digital values the FC can process.

**AGL (Above Ground Level)** - Altitude measured from ground surface, as opposed to MSL (Mean Sea Level).

**ANGLE Mode** - Stabilized flight mode that auto-levels the aircraft when sticks are centered. Beginner-friendly.

**ARM** - State where flight controller activates motor outputs. Aircraft can fly only when armed.

**AUX Channel** - Auxiliary receiver channel used for switches (beyond the 4 main control channels).

---

### B

**Barometer** - Pressure sensor used to determine altitude. The ELCO F7 uses a DPS310 barometer.

**BEC (Battery Elimination Circuit)** - Voltage regulator that provides stable 5V or 9V from variable battery voltage.

**Betaflight** - Popular open-source flight controller firmware for racing/freestyle drones.

**Bidirectional DShot** - ESC protocol that sends RPM telemetry back to FC via signal wire. Enables RPM-based filtering.

**Blackbox** - Flight data logging system that records gyro, PID, motor commands, etc. for analysis.

**BLHeli** - ESC firmware family. BLHeli_S for older ESCs, BLHeli_32 for modern 32-bit ESCs.

**Brownout** - Voltage drop that causes FC to reset or malfunction. Usually from BEC overload or weak battery.

---

### C

**C Rating** - Battery discharge rate. Example: 75C on 1000mAh battery = 75A max continuous discharge.

**CLI (Command Line Interface)** - Text-based interface for advanced FC configuration in Betaflight/INAV.

**CRSF (Crossfire)** - TBS Crossfire RC protocol. High update rate, long range. Used by ELRS too.

**Current Sensor** - Device that measures battery current draw. Enables mAh tracking and battery warnings.

---

### D

**DFU (Device Firmware Update)** - USB bootloader mode for flashing firmware. Accessed by shorting BOOT to GND.

**DMA (Direct Memory Access)** - Hardware feature that transfers data without CPU involvement. Reduces latency on UARTs.

**DPS310** - Infineon barometric pressure sensor used on ELCO F7 for altitude measurement.

**DShot** - Digital ESC protocol. Variants: DShot150/300/600/1200. More reliable than analog PWM/Oneshot.

**D-term** - Derivative component of PID controller. Damps oscillations and reduces overshoot.

---

### E

**ELRS (ExpressLRS)** - Open-source long-range RC link. Uses CRSF protocol. Very popular.

**EMI (Electromagnetic Interference)** - Electrical noise that can affect gyro, video, or other components.

**ESC (Electronic Speed Controller)** - Device that drives motor based on FC commands. Converts battery DC to 3-phase AC.

**EEPROM** - Non-volatile memory that stores FC settings. Survives power cycles.

---

### F

**Failsafe** - Safety feature that lands/disarms drone if RC signal lost.

**FC (Flight Controller)** - Central computer that stabilizes and controls the aircraft.

**FPV (First Person View)** - Flying using video feed from onboard camera, not visual line of sight.

**Frame Rate** - How often FC updates (e.g., 8kHz PID loop = 8000 times per second).

---

### G

**Geofence** - Virtual boundary that restricts where drone can fly (GPS-based).

**Gimbal** - Mechanical stabilization system for cameras (not typically on racing quads).

**GPS (Global Positioning System)** - Satellite navigation system. Required for return-to-home and waypoint features.

**Ground Loop** - Unwanted current flow between multiple ground connections. Can cause noise.

**Gyroscope** - Sensor that measures rotational velocity. Primary sensor for stabilization. BMI270 on ELCO F7.

---

### H

**HORIZON Mode** - Hybrid flight mode. Auto-levels when sticks centered, allows flips when sticks at extremes.

**Hot Glue** - Adhesive used to secure components and wires. Removable and non-conductive.

---

### I

**I2C (Inter-Integrated Circuit)** - Serial communication bus. Used for barometer, compass, etc.

**IMU (Inertial Measurement Unit)** - Combination of gyroscope and accelerometer. BMI270 on ELCO F7.

**INAV** - Flight controller firmware focused on GPS navigation and autonomous flight.

**I-term** - Integral component of PID controller. Eliminates steady-state error and wind compensation.

---

### J

**Jello** - Video artifact from vibrations. Appears as wavy/wobbly video.

**JST Connector** - Common small connector type. JST-SH 1.0mm used for peripherals.

---

### K

**kV (Velocity Constant)** - Motor rating. RPM per volt with no load. Higher kV = faster spinning, less torque.

---

### L

**LED Strip** - Addressable RGB LEDs (WS2812B) for lighting effects. Connected to LED pad.

**LiPo (Lithium Polymer)** - Battery chemistry used in drones. High power density but requires careful handling.

**LOS (Line of Sight)** - Flying while maintaining visual contact with aircraft (not through FPV).

**LPF (Low-Pass Filter)** - Filter that removes high-frequency noise. Used on gyro and D-term.

---

### M

**MAVLink** - Communication protocol used by ArduPilot and PX4 for telemetry.

**MCU (Microcontroller Unit)** - Main processor. STM32F722 on ELCO F7.

**MSP (MultiWii Serial Protocol)** - Communication protocol between FC and configurator/OSD.

**Multishot** - Fast analog ESC protocol. Timing: 5-25µs pulse width.

---

### N

**NMEA** - Text-based GPS data format. Alternative to binary UBX format.

**Notch Filter** - Narrow filter that removes specific frequency (like motor noise peak).

---

### O

**Oneshot125/42** - Analog ESC protocols. Faster than standard PWM.

**OSD (On-Screen Display)** - Text overlay on FPV video. Shows voltage, time, etc. AT7456E chip on ELCO F7.

**Overshoot** - When aircraft rotates past commanded angle. Reduced by increasing D-term.

---

### P

**PDB (Power Distribution Board)** - PCB that distributes battery power to ESCs and accessories.

**PID (Proportional-Integral-Derivative)** - Control algorithm that stabilizes aircraft. Tunable gains: P, I, D.

**Pitch** - Rotation around side-to-side axis (nose up/down).

**Prop Wash** - Turbulent air from propellers. Causes wobbles in descent.

**P-term** - Proportional component of PID. Primary response to error.

**PWM (Pulse Width Modulation)** - Method of encoding motor speed as pulse timing. Also refers to slow analog ESC protocol.

---

### Q

**QAV-X** - Popular quadcopter frame format with X motor layout.

---

### R

**Rate** - Stick responsiveness setting. Higher rate = faster maximum rotation speed.

**RC (Radio Control)** - Wireless control system. Transmitter (TX) and receiver (RX).

**Resource** - In Betaflight CLI, assignment of pin to function. Example: `resource motor 1 B07`

**Roll** - Rotation around front-to-back axis (side tilt).

**RSSI (Received Signal Strength Indicator)** - Measure of RC signal quality. Shows in OSD.

**RTH (Return to Home)** - GPS feature that autonomously flies back to launch point.

---

### S

**SBUS** - FrSky serial RC protocol. Inverted signal, single wire.

**SDA/SCL** - I2C data and clock lines for peripherals.

**Setpoint** - Commanded target value (e.g., desired rotation rate).

**Soft Mounting** - Isolating FC from frame vibrations using silicone grommets.

**SPI (Serial Peripheral Interface)** - Fast serial bus. Used for gyro, OSD, and flash.

---

### T

**Telemetry** - Data sent from aircraft back to transmitter (voltage, RSSI, GPS, etc.).

**Throttle** - Control input for motor power/altitude.

**UART (Universal Asynchronous Receiver/Transmitter)** - Serial communication port. 6 available on ELCO F7.

**UBX** - Binary GPS data format from u-blox. More efficient than NMEA.

---

### V

**VBAT** - Main battery voltage input to flight controller.

**VTX (Video Transmitter)** - Transmits FPV camera video to goggles. Common frequencies: 5.8 GHz.

---

### W

**Waypoint** - GPS coordinate used in autonomous missions.

**WS2812B** - Addressable RGB LED type. Requires timed data signal.

---

### Y

**Yaw** - Rotation around vertical axis (heading/direction change).

---

## Acronyms & Abbreviations

| Acronym | Full Name | Description |
|---------|-----------|-------------|
| **ADC** | Analog-to-Digital Converter | Converts analog signals to digital |
| **AGL** | Above Ground Level | Altitude from ground |
| **AHRS** | Attitude & Heading Reference System | Sensor fusion algorithm |
| **AMA** | Academy of Model Aeronautics | US RC organization |
| **BEC** | Battery Elimination Circuit | Voltage regulator |
| **BLHeli** | - | ESC firmware name |
| **BOM** | Bill of Materials | Parts list |
| **CASA** | Civil Aviation Safety Authority | Australian regulator |
| **CE** | Conformité Européenne | European compliance |
| **CLI** | Command Line Interface | Text configuration |
| **CRSF** | Crossfire | RC protocol |
| **DFU** | Device Firmware Update | Bootloader mode |
| **DMA** | Direct Memory Access | Hardware data transfer |
| **DoF** | Degrees of Freedom | Axes of movement |
| **DPS** | Digital Pressure Sensor | Barometer type |
| **EASA** | European Aviation Safety Agency | EU regulator |
| **ELRS** | ExpressLRS | Open-source RC link |
| **EMI** | Electromagnetic Interference | Electrical noise |
| **ESC** | Electronic Speed Controller | Motor driver |
| **FAA** | Federal Aviation Administration | US regulator |
| **FCC** | Federal Communications Commission | US RF regulator |
| **FC** | Flight Controller | Main computer |
| **FIFO** | First In, First Out | Data buffer type |
| **FPV** | First Person View | Video-based flying |
| **FPU** | Floating Point Unit | Math coprocessor |
| **FRIA** | FAA-Recognized Identification Area | Exempt from Remote ID |
| **GND** | Ground | Negative/reference voltage |
| **GPS** | Global Positioning System | Satellite navigation |
| **GPIO** | General Purpose Input/Output | Configurable pin |
| **HDOP** | Horizontal Dilution of Precision | GPS accuracy metric |
| **I2C** | Inter-Integrated Circuit | Serial bus |
| **IMU** | Inertial Measurement Unit | Gyro + accelerometer |
| **INAV** | INertial NAVigation | GPS-focused firmware |
| **I/O** | Input/Output | Data connections |
| **JST** | Japan Solderless Terminal | Connector type |
| **kV** | Velocity Constant | Motor speed rating |
| **LED** | Light Emitting Diode | Indicator light |
| **LiHV** | Lithium High Voltage | Battery type (4.35V max) |
| **LiPo** | Lithium Polymer | Battery type |
| **LOS** | Line of Sight | Visual flying |
| **LPF** | Low-Pass Filter | Noise filter |
| **MAh** | Milliamp Hour | Battery capacity |
| **MCU** | Microcontroller Unit | Processor |
| **MEMS** | Micro-Electro-Mechanical Systems | Sensor technology |
| **MSL** | Mean Sea Level | Altitude reference |
| **MSP** | MultiWii Serial Protocol | Communication protocol |
| **NTSC** | National Television System Committee | Video standard (60Hz) |
| **OSD** | On-Screen Display | Video overlay |
| **PAL** | Phase Alternating Line | Video standard (50Hz) |
| **PCB** | Printed Circuit Board | Electronic board |
| **PDB** | Power Distribution Board | Power routing board |
| **PID** | Proportional-Integral-Derivative | Control algorithm |
| **PWM** | Pulse Width Modulation | Signal encoding |
| **RC** | Radio Control | Remote control |
| **RF** | Radio Frequency | Wireless signal |
| **RGB** | Red-Green-Blue | Color LEDs |
| **RoHS** | Restriction of Hazardous Substances | EU directive |
| **RPM** | Revolutions Per Minute | Motor speed |
| **RSSI** | Received Signal Strength Indicator | Signal quality |
| **RTH** | Return to Home | GPS feature |
| **RX** | Receiver (or Receive) | Radio receiver / UART RX |
| **SBUS** | Serial BUS | FrSky protocol |
| **SDA** | Serial Data | I2C data line |
| **SCL** | Serial Clock | I2C clock line |
| **SPI** | Serial Peripheral Interface | Fast serial bus |
| **SRAM** | Static Random Access Memory | Volatile memory |
| **UART** | Universal Asynchronous Receiver/Transmitter | Serial port |
| **UBX** | u-blox Protocol | Binary GPS format |
| **USB** | Universal Serial Bus | Computer connection |
| **VBAT** | Battery Voltage | Main power input |
| **VTX** | Video Transmitter | FPV TX |
| **WEEE** | Waste Electrical & Electronic Equipment | EU directive |
| **WS2812** | WorldSemi LED Controller | Addressable LED chip |

---

## Bill of Materials

### Major Components

| Reference | Part Number | Manufacturer | Description | Qty | Notes |
|-----------|-------------|--------------|-------------|-----|-------|
| U1 | STM32F722RET6 | STMicroelectronics | 32-bit ARM MCU | 1 | Main processor |
| U2 | BMI270 | Bosch Sensortec | 6-axis IMU | 1 | Gyro + Accel |
| U3 | DPS310 | Infineon | Barometric pressure sensor | 1 | Altitude |
| U4 | AT7456E | AKK Tech | OSD chip | 1 | Video overlay |
| U5 | W25Q128JVSIQ | Winbond | 16MB SPI flash | 1 | Blackbox logging |
| U6 | MP2359DJ | Monolithic Power | 5V buck regulator | 1 | 3A output |
| U7 | MP2359DJ | Monolithic Power | 9V buck regulator | 1 | 3A output |
| Q1 | AOD417 | Alpha & Omega | P-channel MOSFET | 1 | Reverse polarity protection |
| X1 | 8MHz | Various | Crystal oscillator | 1 | MCU clock |

### Passive Components

| Type | Value | Package | Qty | Location |
|------|-------|---------|-----|----------|
| Capacitor | 1000µF 35V | Electrolytic | 2 | Power filtering |
| Capacitor | 100µF 16V | Ceramic | 5 | Decoupling |
| Capacitor | 10µF 16V | Ceramic | 10 | Decoupling |
| Capacitor | 1µF | 0805 | 15 | Decoupling |
| Capacitor | 100nF | 0603 | 25 | Decoupling |
| Resistor | 2.2kΩ | 0603 | 2 | I2C pullups |
| Resistor | 10kΩ | 0603 | 5 | Various |
| Resistor | 100Ω | 0603 | 8 | Current limiting |
| Inductor | 4.7µH | SMD | 2 | BEC filtering |
| Diode | TVS 28V | SOD-123 | 1 | Overvoltage protection |

### Connectors

| Type | Description | Qty | Notes |
|------|-------------|-----|-------|
| USB-C | USB 2.0 receptacle | 1 | Firmware/configuration |
| Solder Pads | Various | 50+ | For wiring peripherals |

### Complete BOM Available
Full detailed BOM with manufacturer part numbers available upon request from: bom@elco-fc.com

---

## Schematics & Diagrams

### Schematic Overview

{{INSERT_SCHEMATIC: diagrams/elco-f7-schematic.pdf}}

**Key Schematic Pages:**
1. Power supply and protection
2. MCU and core components
3. Sensor interfaces (IMU, Baro)
4. OSD and video
5. Communication (UART, I2C, SPI)
6. Motor outputs and timers

### Block Diagram

See [System Architecture](./system-architecture.md) for detailed block diagrams.

### PCB Layout

{{INSERT_IMAGE: diagrams/pcb-top-layer.png}}
{{INSERT_IMAGE: diagrams/pcb-bottom-layer.png}}

**PCB Specifications:**
- Layers: 6-layer
- Material: FR4
- Thickness: 1.6mm
- Copper: 2oz outer layers, 1oz inner
- Finish: ENIG (gold plating)
- Color: Matte black soldermask

### Pinout Diagrams

See [Pinout Reference](./pinout-reference.md) for complete pinout documentation.

---

## Firmware Resources

### Official Firmware

**Betaflight:**
- GitHub: https://github.com/betaflight/betaflight
- Configurator: https://github.com/betaflight/betaflight-configurator
- Target: ELCOF7
- Minimum version: 4.3.0

**INAV:**
- GitHub: https://github.com/iNavFlight/inav
- Configurator: https://github.com/iNavFlight/inav-configurator
- Target: ELCOF7
- Minimum version: 7.0.0

**ArduPilot:**
- Website: https://ardupilot.org
- GitHub: https://github.com/ArduPilot/ardupilot
- Target: Custom build required

**PX4:**
- Website: https://px4.io
- GitHub: https://github.com/PX4/PX4-Autopilot
- Target: Custom build may be required

### Configuration Tools

- **Betaflight Configurator** - Main configuration GUI
- **BLHeli Configurator** - ESC configuration/flashing
- **Blackbox Explorer** - Flight log analysis
- **PID Analyzer** - Blackbox PID tuning tool

---

## Community Resources

### Forums & Discussion

- **Betaflight Slack** - Real-time chat
- **INAV Discord** - GPS/navigation help
- **RC Groups** - General RC aircraft discussion
- **IntFPV** - International FPV community
- **Reddit r/Multicopter** - General drone discussions
- **Facebook Groups** - Various regional groups

### Video Resources

**YouTube Channels:**
- Joshua Bardwell - Excellent tutorials
- Chris Rosser - Betaflight expert
- Mr Steele - Freestyle flying
- Le Drib - Racing and tuning
- UAV Tech - Product reviews

### Learning Resources

**Websites:**
- Oscar Liang (oscarliang.com) - Comprehensive guides
- Propwashed - FPV news and reviews
- GetFPV Learn - Beginner guides
- Rotorbuilds.com - Build examples

**Recommended Simulators:**
- Liftoff - Beginner-friendly
- Velocidrone - Realistic physics
- DRL Simulator - Free, good for learning
- FPV Freerider - Budget option

---

## Technical References

### Datasheets

**Microcontroller:**
- STM32F722 Reference Manual: [Link](https://www.st.com/resource/en/reference_manual/dm00305990.pdf)
- STM32F722 Datasheet: [Link](https://www.st.com/resource/en/datasheet/stm32f722re.pdf)

**Sensors:**
- BMI270 Datasheet: [Bosch Sensortec](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bmi270-ds000.pdf)
- DPS310 Datasheet: [Infineon](https://www.infineon.com/dgdl/Infineon-DPS310-DataSheet-v01_02-EN.pdf?fileId=5546d462576f34750157750826c42242)

**Communication Protocols:**
- DShot Protocol: [GitHub](https://github.com/betaflight/betaflight/wiki/DShot-ESC-Protocol)
- CRSF Protocol: [TBS](https://www.team-blacksheep.com/products/prod:crossfire_tx)
- MSP Protocol: [Betaflight](https://github.com/betaflight/betaflight/wiki/MSP-V2)
- MAVLink: [Protocol Docs](https://mavlink.io/)

### Standards & Specifications

- USB 2.0 Specification
- I2C Bus Specification v6
- SPI Protocol Specification
- WS2812B LED Protocol

---

## Revision History

### Hardware Revisions

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| Rev 1.2 | Feb 2026 | Current production version | Current |
| Rev 1.1 | Nov 2025 | - Improved power filtering<br>- Updated BEC layout | Superseded |
| Rev 1.0 | Aug 2025 | Initial production release | Superseded |
| Rev 0.9 | Jul 2025 | Pre-production prototype | Prototype |

### Firmware Compatibility

| Hardware Rev | Compatible Firmware | Notes |
|--------------|---------------------|-------|
| Rev 1.2 | Betaflight 4.3+ | Full support |
| Rev 1.2 | INAV 7.0+ | Full support |
| Rev 1.2 | ArduPilot 4.3+ | Custom target |
| Rev 1.2 | PX4 1.14+ | Custom target |

### Documentation Revisions

| Version | Date | Major Changes |
|---------|------|---------------|
| 1.0.0 | Feb 2026 | Initial comprehensive documentation release |

---

## Contact Information

### Technical Support

**Email:** support@elco-fc.com  
**Response Time:** 24-48 hours  
**Hours:** Monday-Friday, 9AM-5PM EST

**When contacting support, please include:**
- Flight controller serial number (on bottom of FC)
- Firmware version (from Betaflight Setup tab)
- Clear description of issue
- Photos or videos if applicable
- Betaflight diff output (from CLI: `diff all`)

### Sales & Distribution

**Website:** https://www.elco-fc.com  
**Email:** sales@elco-fc.com  

**Authorized Distributors:**
- GetFPV (US)
- RaceDayQuads (US)
- DroneShop (EU)
- UnmannedTech (UK)
- RotorGeeks (AU)

### Warranty Claims

**Email:** warranty@elco-fc.com  

**Required Information:**
- Proof of purchase
- Serial number
- Clear photos of issue
- Description of problem

**Warranty Period:** 12 months from purchase date

---

## Acknowledgments

### Development Team
- Hardware Design: {{ENGINEER_NAMES}}
- Firmware Integration: Betaflight Team
- Documentation: Community Contributors
- Testing: Beta Test Team

### Open Source Credits

This product uses and builds upon open-source projects:
- **Betaflight** - GPL v3.0 License
- **INAV** - GPL v3.0 License
- **ArduPilot** - GPL v3.0 License
- **PX4** - BSD License

### Community Thanks

Special thanks to:
- Joshua Bardwell - Testing and feedback
- Oscar Liang - Documentation inspiration
- Betaflight developers - Excellent firmware
- Beta testers - Real-world validation
- The entire FPV community

---

## Legal Notices

### Copyright

© 2026 ELCO Technologies. All rights reserved.

Documentation licensed under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).

### Trademarks

- Betaflight™ is a trademark of the Betaflight Project
- CRSF™, Crossfire™ are trademarks of Team BlackSheep
- STM32™ is a trademark of STMicroelectronics
- Other trademarks are property of their respective owners

### Disclaimer

This documentation is provided "as is" without warranty of any kind. ELCO Technologies reserves the right to make changes without notice.

---

**Navigation:**
- [← Back: Safety & Regulatory](./safety-regulatory.md)
- [Return to Index](./README.md)
- [Back to Top ↑](#appendix--resources)

---

*Documentation Version 1.0.0 | February 2026*  
*For latest documentation updates, visit: https://docs.elco-fc.com*
