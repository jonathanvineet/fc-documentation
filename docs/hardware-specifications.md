# Hardware Specifications

**Document Version:** 1.0.0  
**Hardware Revision:** Rev 1.2  
**Last Updated:** February 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Mechanical Specifications](#mechanical-specifications)
3. [Electrical Specifications](#electrical-specifications)
4. [Microcontroller & Processing](#microcontroller--processing)
5. [Sensors & Peripherals](#sensors--peripherals)
6. [Power System](#power-system)
7. [Communication Interfaces](#communication-interfaces)
8. [Environmental & Operating Conditions](#environmental--operating-conditions)
9. [Physical Layout & Dimensions](#physical-layout--dimensions)

---

## Overview

The ELCO F7 Ultimate is engineered for high-performance flight applications, combining powerful processing, advanced sensors, and robust power management in a compact footprint.

### At-a-Glance Specifications

| Category | Specification |
|----------|---------------|
| **MCU** | STM32F722RET6 @ 216MHz |
| **IMU** | BMI270 (SPI, 32kHz sampling) |
| **Barometer** | DPS310 (I2C) |
| **Flash Memory** | 16MB Blackbox (W25Q128) |
| **OSD** | AT7456E (MAX7456 compatible) |
| **UARTs** | 6× Full-duplex |
| **BEC Outputs** | 5V/3A, 9V/3A |
| **Input Voltage** | 7.4V - 26V (2S-6S LiPo) |
| **Mounting** | 30.5×30.5mm (M3 holes) |
| **Weight** | 7.8g |
| **Dimensions** | 36×36×8mm (including connectors) |

---

## Mechanical Specifications

### Physical Dimensions

```
Board Size:          36mm × 36mm × 8mm (L×W×H)
PCB Thickness:       1.6mm (FR4)
Copper Layers:       6-layer PCB
Mounting Pattern:    30.5mm × 30.5mm (center-to-center)
Mounting Holes:      M3 (3.2mm diameter)
Corner Radius:       2mm
```

{{INSERT_IMAGE: images/board-dimensions.png}}

### Weight Budget

| Component | Weight |
|-----------|--------|
| Bare PCB | 5.2g |
| Components | 2.4g |
| Connectors | 0.2g |
| **Total** | **7.8g** |

### Mounting Specifications

- **Recommended:** Soft mounting with silicone grommets (included)
- **Alternative:** Direct mounting with M3 standoffs (min 5mm height)
- **Stack Spacing:** 10-12mm recommended for vibration isolation
- **Torque:** Max 0.5 Nm (45 in-lb) for M3 screws

> **Note:** Soft mounting reduces gyro noise and improves flight performance.

---

## Electrical Specifications

### Absolute Maximum Ratings

| Parameter | Min | Typ | Max | Unit | Notes |
|-----------|-----|-----|-----|------|-------|
| **VBAT Input** | 6.0 | - | 26.0 | V | Overvoltage protection at 28V |
| **5V Input (USB)** | 4.5 | 5.0 | 5.5 | V | USB-C PD compliant |
| **UART Signal** | -0.3 | 3.3 | 3.6 | V | 5V tolerant with clamp diodes |
| **Motor Outputs** | - | - | 50 | mA | PWM/DShot only |
| **5V BEC Output** | - | - | 3000 | mA | Thermal shutdown at 125°C |
| **9V BEC Output** | - | - | 3000 | mA | Thermal shutdown at 125°C |
| **Operating Temp** | -20 | 25 | 85 | °C | Extended industrial range |
| **Storage Temp** | -40 | - | 100 | °C | - |

### Power Input

**VBAT Pad Specifications:**
- **Input Range:** 7.4V - 26V DC (2S-6S LiPo)
- **Continuous Current:** 10A max through PCB traces
- **Transient Current:** 30A for <1s (motor start)
- **Protection:** 
  - Reverse polarity protection (P-FET)
  - Overvoltage clamp at 28V
  - ESD protection (IEC 61000-4-2, Level 4)

**Current Consumption:**
| Load Condition | Current @ 12V | Power |
|----------------|---------------|-------|
| Idle (no peripherals) | 120mA | 1.44W |
| Normal operation | 200mA | 2.40W |
| With GPS + Receiver + VTX | 450mA | 5.40W |
| Blackbox logging active | 250mA | 3.00W |

### Power Distribution

```
VBAT (7.4-26V) ──┬── Reverse Protection (P-FET)
                 │
                 ├── 5V Regulator ───┬── MCU (500mA)
                 │   (MP2359)        ├── IMU (5mA)
                 │   3A max          ├── Barometer (0.5mA)
                 │                   ├── Flash (10mA)
                 │                   ├── OSD (30mA)
                 │                   └── 5V Pads (up to 2A)
                 │
                 └── 9V Regulator ───── 9V Pads (3A max)
                     (MP2359)
```

---

## Microcontroller & Processing

### STM32F722RET6 Specifications

| Feature | Specification |
|---------|---------------|
| **Architecture** | ARM Cortex-M7 |
| **Clock Speed** | 216 MHz |
| **FPU** | Single precision (FPv5) |
| **Flash Memory** | 512 KB |
| **SRAM** | 256 KB |
| **DMA Channels** | 16 channels |
| **Timers** | 14× (16-bit/32-bit) |
| **ADC** | 3× 12-bit (2.4 MSPS) |
| **I2C** | 4× interfaces |
| **SPI** | 6× interfaces |
| **USART** | 8× interfaces (6 available) |
| **USB** | 1× USB 2.0 FS OTG |
| **CAN** | 1× CAN 2.0B |

### Performance Metrics

- **PID Loop Rate:** 8kHz (Betaflight)
- **Gyro Sampling:** 32kHz (BMI270 native)
- **Blackbox Logging:** 2kHz
- **OSD Refresh:** 60Hz (PAL/NTSC)
- **DRAM Bandwidth:** 600 MB/s
- **Processing Throughput:** 462 DMIPS @ 216MHz

---

## Sensors & Peripherals

### IMU: BMI270

The BMI270 is Bosch's latest ultra-low noise gyroscope designed for drones and robotics.

**Specifications:**
| Parameter | Value |
|-----------|-------|
| **Interface** | SPI (up to 10MHz) |
| **Gyro Range** | ±125, ±250, ±500, ±1000, ±2000 °/s |
| **Gyro Noise** | 0.007 °/s/√Hz (typ) |
| **Accel Range** | ±2, ±4, ±8, ±16 g |
| **Update Rate** | 3.2kHz - 32kHz |
| **Power** | 685 µA (normal mode) |
| **Temperature Range** | -40°C to +85°C |

**Features:**
- Advanced motion-triggered interrupt system
- On-chip FIFO buffer (2048 bytes)
- Programmable digital filters
- Self-test functionality

{{INSERT_IMAGE: images/bmi270-orientation.png}}

> **Axis Orientation:** BMI270 is mounted with X-axis forward, Z-axis up. Rotation = 0° in Betaflight.

### Barometer: DPS310

**Specifications:**
| Parameter | Value |
|-----------|-------|
| **Interface** | I2C (400kHz) |
| **Pressure Range** | 300 - 1200 hPa |
| **Altitude** | -500m to +9000m |
| **Accuracy** | ±0.06 hPa (±0.5m) |
| **Resolution** | 0.006 hPa (0.05m) |
| **Sample Rate** | 1-200 Hz |
| **Power** | 1.7 µA (standby), 50 µA (active) |

**Use Cases:**
- Altitude hold (Betaflight/INAV)
- Position hold (INAV/ArduPilot)
- Return to home altitude
- Variometer for gliders

### OSD: AT7456E

**Specifications:**
| Parameter | Value |
|-----------|-------|
| **Compatibility** | MAX7456 protocol |
| **Interface** | SPI (10MHz) |
| **Video Standards** | NTSC, PAL |
| **Character Matrix** | 30×16 (PAL), 30×13 (NTSC) |
| **Character Set** | 256 customizable chars |
| **Overlay** | White, black, transparent |

**Features:**
- Automatic PAL/NTSC detection
- Built-in LDO for clean analog power
- Buffered video input/output
- Character brightness control

### Blackbox Flash: W25Q128

**Specifications:**
| Parameter | Value |
|-----------|-------|
| **Capacity** | 16 MB (128 Mbit) |
| **Interface** | Quad-SPI |
| **Read Speed** | 104 MHz (416 Mbps) |
| **Write Speed** | 80 MB/s (page program) |
| **Erase Time** | 45ms (4KB), 200ms (64KB) |
| **Endurance** | 100,000 cycles |
| **Data Retention** | 20 years @ 85°C |

**Logging Capacity:**
- **At 1kHz:** ~120 minutes
- **At 2kHz:** ~60 minutes
- **High-Rate (4kHz):** ~30 minutes

---

## Power System

### 5V Regulator (MP2359)

**Output Specifications:**
- **Output Voltage:** 5.0V ±2%
- **Output Current:** 3A continuous
- **Input Range:** 7.4V - 26V
- **Efficiency:** >92% @ 12V input
- **Switching Frequency:** 1.4 MHz
- **Ripple:** <50mV pk-pk

**Protection Features:**
- Thermal shutdown (150°C)
- Short circuit protection
- Over-current limit (4A)
- Input under-voltage lockout

**Load Budget:**
| Device | Typical | Max | Notes |
|--------|---------|-----|-------|
| FC Internal | 550mA | 650mA | MCU, sensors, flash |
| Receiver | 100mA | 200mA | ELRS/Crossfire |
| GPS Module | 50mA | 80mA | UART GPS |
| LED Strip | 200mA | 500mA | 10 LEDs @ 50mA each |
| Buzzer | 30mA | 50mA | Piezo type |
| **Total Available** | **~2000mA** | **3000mA** | Leave 500mA margin |

### 9V Regulator (MP2359)

**Output Specifications:**
- **Output Voltage:** 9.0V ±2%
- **Output Current:** 3A continuous
- **Input Range:** 12V - 26V minimum
- **Efficiency:** >90% @ 16V input
- **Switching Frequency:** 1.4 MHz

**Typical Uses:**
- Analog FPV camera (9V preferred)
- Video transmitter (9V input)
- High-power servos

> ⚠️ **Warning:** 9V regulator requires minimum 12V input (3S+ LiPo). Do not use on 2S builds.

### Power Budgeting Example

**3S Build (11.1V nominal):**
```
Available: 5V only (9V regulator disabled on <12V input)
5V Budget: 3A
- FC: 650mA
- Receiver: 150mA
- GPS: 80mA
- Available for peripherals: ~2100mA
```

**4S-6S Build (14.8V - 22.2V nominal):**
```
Available: 5V @ 3A, 9V @ 3A
5V for: Receiver, GPS, LEDs, buzzer
9V for: Camera, VTX
```

---

## Communication Interfaces

### UART Ports (6 Available)

| UART | Primary Function | Alternative | DMA | Inverter |
|------|------------------|-------------|-----|----------|
| **UART1** | Serial RX (SBUS/CRSF/ELRS) | Telemetry | Yes | Hardware |
| **UART2** | VTX (SmartAudio/Tramp) | ESC Telem | Yes | No |
| **UART3** | GPS/Compass | - | Yes | No |
| **UART4** | ESC Telemetry | - | No | No |
| **UART5** | Available | - | No | No |
| **UART6** | Blackbox (alternate) | BLE | Yes | No |

**UART Specifications:**
- **Baud Rates:** 300 - 2,000,000 bps
- **Signal Level:** 3.3V TTL
- **5V Tolerance:** Yes (with clamp protection)
- **Buffer Size:** 256 bytes (RX/TX)
- **DMA Support:** 4 of 6 ports

### I2C Bus

**I2C1 (Primary):**
- **Speed:** 400 kHz (Fast Mode)
- **Pullup:** 2.2kΩ onboard
- **Devices:** Barometer (DPS310), Compass (optional)
- **Pads:** SDA, SCL

**Supported Peripherals:**
- Magnetometer (QMC5883L, HMC5883L, IST8310)
- Rangefinder (VL53L0X, TFMini-I2C)
- OLED displays (SSD1306)
- Airspeed sensors (MS4525DO)

### SPI Buses

| SPI | Device | Speed | CS Pin |
|-----|--------|-------|--------|
| **SPI1** | BMI270 (Gyro) | 10 MHz | PA4 |
| **SPI2** | AT7456E (OSD) | 10 MHz | PB12 |
| **SPI3** | W25Q128 (Flash) | 104 MHz | PC15 |

### USB

**USB-C Connector:**
- **Standard:** USB 2.0 Full Speed (12 Mbps)
- **Protocol:** USB CDC Virtual COM Port
- **Power:** 5V @ 500mA (USB 2.0 spec)
- **Bootloader:** DFU mode (STM32 native)

**Features:**
- Plug-and-play (no drivers needed)
- DFU bootloader for recovery
- USB power can supply 4V5 rail
- ESD protection ±8kV

---

## Environmental & Operating Conditions

### Temperature

| Condition | Min | Typ | Max | Unit |
|-----------|-----|-----|-----|------|
| **Operating** | -20 | 25 | +85 | °C |
| **Storage** | -40 | - | +100 | °C |
| **Thermal Shutdown** | - | - | 125 | °C |

**Temperature Effects:**
- Gyro drift: <0.01°/s per °C (calibrated)
- BEC efficiency: 90-92% across range
- Flash write: Slower below 0°C

### Humidity

- **Operating:** 5% - 95% RH (non-condensing)
- **Storage:** 5% - 95% RH (non-condensing)
- **Conformal Coating:** Optional (recommended for wet environments)

### Vibration Resistance

- **Frequency Range:** 10 Hz - 2000 Hz
- **Acceleration:** Up to 20G continuous
- **Shock:** 100G for 11ms (IEC 60068-2-27)

**Recommendations:**
- Soft mounting reduces vibration by 60-80%
- Use silicone grommets (included)
- Balance propellers to minimize vibration

### Altitude

- **Operational:** -500m to +9000m (barometer limited)
- **Storage:** Sea level to +10,000m

---

## Physical Layout & Dimensions

### Top View

```
    36mm
  ┌──────────────┐
  │  [USB-C]     │
  │              │
  │    BMI270    │   ← IMU (center-mounted)
30│              │
mm│ M3  M3       │
  │          M3  │
  │     M3       │
  └──────────────┘
```

### Pad Layout

**Top Side:**
- VBAT+, GND (large solder pads)
- M1-M4 (motor outputs)
- 5V, 9V BEC outputs
- LED, Buzzer, Current sensor

**Bottom Side:**
- UART pads (TX1-6, RX1-6)
- I2C (SDA, SCL)
- Camera (VI, VO)
- Boot button, Bind button

{{INSERT_IMAGE: images/pad-layout-top.png}}
{{INSERT_IMAGE: images/pad-layout-bottom.png}}

### Component Clearances

- **Top clearance:** 3mm (IMU height)
- **Bottom clearance:** 2mm (connectors)
- **Side clearance:** 5mm (for frame fitment)

### Thermal Considerations

**Heat Sources:**
- 5V BEC: Up to 2W dissipation @ 3A load
- 9V BEC: Up to 3W dissipation @ 3A load
- MCU: ~0.5W @ full load

**Cooling:**
- Airflow from propellers provides adequate cooling
- BEC regulators have thermal vias to PCB ground plane
- No heatsink required for normal operation

---

## Bill of Materials (BOM) - Key Components

| Component | Part Number | Manufacturer | Qty | Notes |
|-----------|-------------|--------------|-----|-------|
| MCU | STM32F722RET6 | STMicroelectronics | 1 | 216MHz, 512KB Flash |
| IMU | BMI270 | Bosch | 1 | SPI gyro/accel |
| Barometer | DPS310 | Infineon | 1 | I2C pressure sensor |
| OSD | AT7456E | AKK | 1 | MAX7456 compatible |
| Flash | W25Q128JVSIQ | Winbond | 1 | 16MB SPI flash |
| 5V Regulator | MP2359DJ | MPS | 1 | 3A synchronous buck |
| 9V Regulator | MP2359DJ | MPS | 1 | 3A synchronous buck |
| Reverse Protect | AOD417 | Alpha & Omega | 1 | P-channel MOSFET |

> Full BOM available in [Appendix](./appendix.md#bill-of-materials)

---

## Comparison with Other FCs

| Feature | ELCO F7 Ultimate | Typical F4 FC | High-end F7 |
|---------|------------------|---------------|-------------|
| MCU Speed | 216 MHz | 168 MHz | 216 MHz |
| Gyro | BMI270 | MPU6000 | ICM42688 |
| Gyro Noise | 0.007 °/s/√Hz | 0.01 °/s/√Hz | 0.006 °/s/√Hz |
| Blackbox | 16MB Flash | None/SD | 16MB Flash |
| BEC | Dual 3A | Single 2A | Dual 3A |
| UARTs | 6 | 3-5 | 6 |
| Weight | 7.8g | 6-8g | 8-10g |
| Price | $$ | $ | $$$ |

---

**Navigation:**
- [← Back to Index](./README.md)
- [Next: System Architecture →](./system-architecture.md)

---

*Last updated: February 2026 | Hardware Rev 1.2*
