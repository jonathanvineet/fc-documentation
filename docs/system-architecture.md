# System Architecture & Block Diagram

**Document Version:** 1.0.0  
**Hardware Revision:** Rev 1.2  
**Last Updated:** February 2026

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Block Diagram](#block-diagram)
3. [Power Architecture](#power-architecture)
4. [Data Flow](#data-flow)
5. [Sensor Fusion](#sensor-fusion)
6. [Communication Architecture](#communication-architecture)
7. [Video System](#video-system)
8. [Design Decisions & Rationale](#design-decisions--rationale)

---

## System Overview

The ELCO F7 Ultimate implements a sophisticated architecture designed for high-performance flight control with minimal latency and maximum reliability.

### Key Architecture Features

- **Single Core Processing:** STM32F722 @ 216MHz with hardware FPU
- **DMA-accelerated I/O:** Zero-copy data transfers for UARTs and SPI
- **Priority-based Scheduling:** Real-time OS (RTOS) capabilities in Betaflight
- **Hardware Timers:** Dedicated timers for motor outputs and sensor sampling
- **Memory Hierarchy:** 256KB SRAM + 16MB external flash for logging
- **Redundant Communication:** Multiple UART/I2C/SPI buses for flexibility

---

## Block Diagram

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        ELCO F7 ULTIMATE                          │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              STM32F722RET6 MCU @ 216MHz                   │  │
│  │   ┌──────────┐  ┌──────────┐  ┌────────────┐            │  │
│  │   │   ARM    │  │   FPU    │  │   DMA      │            │  │
│  │   │ Cortex-M7│  │  FPv5    │  │ 16 Ch      │            │  │
│  │   └──────────┘  └──────────┘  └────────────┘            │  │
│  │                                                            │  │
│  │   512KB Flash Memory    256KB SRAM                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│           │          │          │          │          │         │
│     ┌─────┴────┬─────┴────┬─────┴────┬─────┴────┬────┴────┐   │
│     │  SPI1    │  SPI2    │  SPI3    │   I2C1   │  6×UART │   │
│     │          │          │          │          │         │   │
│  ┌──▼──┐    ┌──▼──┐    ┌──▼──┐    ┌──▼──┐   ┌───▼────┐  │   │
│  │BMI  │    │OSD  │    │Flash│    │Baro │   │Serial  │  │   │
│  │270  │    │AT7  │    │16MB │    │DPS  │   │ I/O    │  │   │
│  │Gyro │    │456E │    │     │    │310  │   │Devices │  │   │
│  └─────┘    └──┬──┘    └─────┘    └─────┘   └────────┘  │   │
│              │                                             │   │
│            Video                                           │   │
│          Input/Output                                      │   │
│                                                            │   │
│  Power Management                                         │   │
│  ┌──────────────────────────────────────────────────┐    │   │
│  │ VBAT ──[Protection]──┬──[5V/3A BEC]──► 5V Pads  │    │   │
│  │  (7-26V)             │                           │    │   │
│  │                      └──[9V/3A BEC]──► 9V Pads  │    │   │
│  └──────────────────────────────────────────────────┘    │   │
│                                                            │   │
│  Motor Outputs (M1-M4) ──► PWM/DShot/ProShot             │   │
└───────────────────────────────────────────────────────────┘   │
```

### Detailed Component Interconnection

```
                    ┌─────────────────────────┐
                    │   STM32F722 MCU Core    │
                    │      @ 216 MHz          │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
  ┌─────▼─────┐          ┌─────▼─────┐          ┌─────▼─────┐
  │   SPI1    │          │   SPI2    │          │   SPI3    │
  │  10 MHz   │          │  10 MHz   │          │  104 MHz  │
  └─────┬─────┘          └─────┬─────┘          └─────┬─────┘
        │                      │                       │
   ┌────▼────┐           ┌────▼────┐            ┌─────▼─────┐
   │ BMI270  │           │AT7456E  │            │  W25Q128  │
   │  Gyro   │           │   OSD   │            │   Flash   │
   │  Accel  │           │         │            │   16MB    │
   └─────────┘           └────┬────┘            └───────────┘
                              │
                    ┌─────────┴─────────┐
                    │     Video I/O     │
                    │   VI ←──→ VO     │
                    └───────────────────┘

  ┌──────────────────────────────────────────────────┐
  │                I2C1 Bus (400kHz)                 │
  ├─────────┬──────────┬──────────┬─────────────────┤
  │ DPS310  │ Compass  │ Optional │ Optional        │
  │  Baro   │ (ext)    │ Periph   │ Periph         │
  └─────────┴──────────┴──────────┴─────────────────┘

  ┌──────────────────────────────────────────────────┐
  │              UART Assignments                    │
  ├────────┬─────────────────────────────────────────┤
  │ UART1  │ RX/TX ◄─► Receiver (SBUS/CRSF/ELRS)   │
  │ UART2  │ TX    ─►  VTX (SmartAudio/Tramp)      │
  │ UART3  │ RX/TX ◄─► GPS Module                   │
  │ UART4  │ RX    ◄─  ESC Telemetry                │
  │ UART5  │ RX/TX ◄─► Available (User defined)     │
  │ UART6  │ RX/TX ◄─► Available (BLE/Other)        │
  └────────┴─────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────┐
  │            Timer & PWM Architecture              │
  ├──────────┬───────────────────────────────────────┤
  │ TIM1     │ Motors M1-M4 (DShot 300-2400)        │
  │ TIM2     │ LED Strip / Servo Outputs             │
  │ TIM3     │ System Tick (Scheduler)               │
  │ TIM4     │ Input Capture (RC Input)              │
  │ TIM5     │ Buzzer / Beeper PWM                   │
  └──────────┴───────────────────────────────────────┘
```

---

## Power Architecture

### Power Tree

```
VBAT (7.4V - 26V)
    │
    ├── Reverse Polarity Protection (P-FET: AOD417)
    │   └── Overvoltage Clamp (28V TVS diode)
    │
    ├─────────► M1-M4 Direct (Motor Power)
    │
    ├── 5V Buck Converter (MP2359, 3A)
    │   │
    │   ├─────► MCU Core (STM32F722): 500mA
    │   ├─────► BMI270 Gyro: 5mA
    │   ├─────► DPS310 Baro: 0.5mA
    │   ├─────► W25Q128 Flash: 10mA (active)
    │   ├─────► AT7456E OSD: 30mA
    │   ├─────► USB VBUS (when not powered by USB)
    │   └─────► 5V Output Pads: Up to 2A
    │             │
    │             ├─► Receiver
    │             ├─► GPS Module
    │             ├─► LED Strip
    │             └─► Other 5V Peripherals
    │
    └── 9V Buck Converter (MP2359, 3A)
        │   (Active only on VBAT >12V)
        │
        └─────► 9V Output Pads: Up to 3A
                  │
                  ├─► FPV Camera
                  ├─► Video Transmitter
                  └─► High-voltage Peripherals

USB-C Input (5V, 500mA)
    │
    └─────► USB Power Management
            │
            ├─► MCU (when USB connected)
            └─► 4V5 Rail (for USB operation)
```

### Power Sequencing

1. **Power-On Sequence:**
   ```
   1. VBAT applied
   2. Reverse protection activates (<5µs)
   3. 5V regulator starts (soft-start: 2ms)
   4. MCU powered, begins boot sequence
   5. 9V regulator starts (if VBAT >12V)
   6. Peripherals initialize (100-300ms)
   7. Flight controller ready
   ```

2. **USB Power Sequence:**
   ```
   1. USB-C connected
   2. USB enumeration (200ms)
   3. MCU powered from USB
   4. 4V5 rail activated for receiver
   5. Limited operation mode (no motor outputs)
   ```

### Power Budget Examples

**Scenario 1: Racing Quad (5-inch, 4S)**
```
Input: 14.8V nominal (12.8V-16.8V range)
├─ FC Internal:        600mA @ 5V  = 3.0W
├─ ELRS Receiver:      150mA @ 5V  = 0.75W
├─ GPS Module:         80mA  @ 5V  = 0.4W
├─ LED Strip (10):     300mA @ 5V  = 1.5W
├─ FPV Camera:         200mA @ 9V  = 1.8W
└─ VTX (600mW):        300mA @ 9V  = 2.7W
                                    ─────────
                      Total Power:  10.15W
                      Current @ 14.8V: 685mA

Available headroom:
- 5V BEC: 1370mA remaining (46%)
- 9V BEC: 2500mA remaining (83%)
```

**Scenario 2: Long Range (7-inch, 6S)**
```
Input: 22.2V nominal (18V-25.2V range)
├─ FC Internal:        600mA @ 5V  = 3.0W
├─ CRSF Receiver:      200mA @ 5V  = 1.0W
├─ GPS + Compass:      120mA @ 5V  = 0.6W
├─ Buzzer:             50mA  @ 5V  = 0.25W
├─ FPV Camera:         250mA @ 9V  = 2.25W
└─ VTX (1.6W):         600mA @ 9V  = 5.4W
                                    ─────────
                      Total Power:  12.5W
                      Current @ 22.2V: 563mA
```

### Current Sensing

The FC supports current sensor integration for:
- Battery monitoring
- Power consumption tracking
- Low battery warnings
- mAh consumed calculation

**Connection:**
- **CURR Pad:** Analog voltage input (0-3.3V)
- **Scale:** Configurable in firmware (typically 100A = 3.3V)
- **Resolution:** 12-bit ADC (0.025A @ 100A scale)

---

## Data Flow

### Real-Time Control Loop

```
┌─────────────────────────────────────────────────────────────────┐
│                     8 kHz PID Loop (125µs)                       │
└─────────────────────────────────────────────────────────────────┘
    │
    ├─► 1. Sample Gyro (32kHz internal, decimated to 8kHz)
    │       │
    │       └─► BMI270 ─(SPI, DMA)─► MCU [10µs]
    │
    ├─► 2. Receiver Input Processing
    │       │
    │       └─► UART1 ─(DMA buffer)─► RC Commands [5µs]
    │
    ├─► 3. PID Calculation
    │       │
    │       ├─► Error = Setpoint - Gyro
    │       ├─► P term = Kp × Error
    │       ├─► I term += Ki × Error × dt
    │       ├─► D term = Kd × (Error - Error_prev) / dt
    │       └─► Output = P + I + D [25µs]
    │
    ├─► 4. Mixer
    │       │
    │       └─► Distribute PID outputs to M1-M4 [5µs]
    │
    ├─► 5. Motor Protocol Encoding
    │       │
    │       └─► DShot bit stream generation [15µs]
    │
    └─► 6. Motor Output (via DMA to timers) [5µs]
            │
            └─► M1-M4 ESC Signals

Total Loop Time: ~65µs (52% CPU utilization @ 8kHz)
Remaining: 60µs for other tasks
```

### Sensor Data Pipeline

```
┌────────────────────────────────────────────────────────────┐
│                    Sensor Sampling                          │
└────────────────────────────────────────────────────────────┘

BMI270 (Gyro/Accel) @ 32kHz
    ├─► Hardware FIFO (2048 bytes)
    ├─► SPI DMA Read every 125µs (8kHz)
    ├─► Digital Filtering (Kalman/PT1)
    └─► Feed to PID loop

DPS310 (Barometer) @ 50Hz
    ├─► I2C Polling (20ms interval)
    ├─► Altitude Calculation
    └─► Feed to altitude hold controller

GPS (if connected) @ 10Hz
    ├─► UART3 DMA RX (NMEA/UBX protocol)
    ├─► Position parsing
    └─► Feed to navigation controller

Compass (if connected) @ 75Hz
    ├─► I2C Polling (13ms interval)
    ├─► Heading calculation
    └─► Feed to yaw controller
```

### Video Data Flow

```
Camera (VI Pad)
    │
    └─► AT7456E OSD Chip
            │
            ├─► Video Pass-through (analog)
            │   │
            │   └─► Add overlay characters
            │
            └─► Video Out (VO Pad) ──► VTX

MCU ←─(SPI)─► AT7456E
    │
    └─► Update OSD display elements:
        ├─ Battery voltage
        ├─ Flight time
        ├─ Armed status
        ├─ Artificial horizon
        ├─ GPS coordinates
        └─ RSSI / Link quality
```

---

## Sensor Fusion

### IMU Data Processing

The ELCO F7 implements advanced sensor fusion to combine gyroscope, accelerometer, and magnetometer (if present) data.

```
┌──────────────────────────────────────────────────────────────┐
│                  Sensor Fusion Algorithm                      │
└──────────────────────────────────────────────────────────────┘

Gyroscope (High Frequency, Drift)
    │
    ├─► Integration ──► Attitude Estimate
    │                   (Roll, Pitch, Yaw)
    │
Accelerometer (Low Frequency, No Drift) ────┐
    │                                         │
    └─► Gravity Vector ──► Tilt Correction ─┤
                                              │
Magnetometer (Low Frequency) ────────────────┤
    │                                         │
    └─► Earth's Magnetic Field ──► Heading ─┤
                                              │
                                              ▼
                            ┌─────────────────────────────┐
                            │   Complementary Filter /    │
                            │   Madgwick / Mahony         │
                            └─────────────────────────────┘
                                              │
                                              ▼
                                    Fused Attitude
                                  (Accurate & Stable)
```

### Filtering Architecture

**Stage 1: Digital Filtering (on-chip BMI270)**
- Hardware low-pass filter
- Configurable cutoff: 100-400Hz

**Stage 2: Software Filtering (MCU)**
- **Gyro:** PT1 filter cascade (2-3 stages)
  - Primary cutoff: 100-150Hz
  - Reduces noise without adding delay
- **D-term:** Additional filtering
  - PT1 or Biquad (30-100Hz)
  - Prevents D-term noise amplification

**Stage 3: Notch Filters**
- Dynamic notch filters (1-5 notches)
- Auto-detected resonant frequencies
- Removes motor/prop noise peaks

```
Raw Gyro @ 32kHz
    │
    ├─► Hardware LPF (200Hz) ──► 8kHz decimation
    │
    ├─► Software PT1 (120Hz) ──► Noise reduction
    │
    ├─► Dynamic Notch Filter ──► Remove motor noise
    │
    └─► Feed to PID controller
```

---

## Communication Architecture

### UART Assignment Strategy

**Default Configuration (Betaflight):**

```
UART1: Serial RX (Receiver)
  ├─ Protocol: SBUS/IBUS/CRSF/ELRS
  ├─ Baud: 115200-420000
  ├─ Inverter: Hardware
  └─ DMA: Yes (low latency)

UART2: VTX Control
  ├─ Protocol: SmartAudio/Tramp/MSP
  ├─ Baud: 4800-115200
  └─ DMA: Yes

UART3: GPS & Compass
  ├─ Protocol: NMEA/UBX/MSP
  ├─ Baud: 9600-115200
  └─ DMA: Yes

UART4: ESC Telemetry
  ├─ Protocol: BLHeli_32 telemetry
  ├─ Baud: 115200
  └─ DMA: No

UART5: User Defined
  ├─ Options: Spektrum, IBUS, MSP
  └─ Baud: Variable

UART6: Bluetooth/Peripherals
  ├─ Options: BLE module, MSP, etc
  └─ Baud: Variable
```

### Protocol Stack

```
┌────────────────────────────────────────────────────────┐
│                  Application Layer                      │
│  (Betaflight CLI, MSP, Blackbox, OSD, etc.)            │
└────────────────────────────────────────────────────────┘
                            │
┌────────────────────────────────────────────────────────┐
│                  Protocol Layer                         │
│  ┌──────────┬──────────┬──────────┬─────────────────┐ │
│  │   SBUS   │   CRSF   │ SmartAud │   GPS (UBX)     │ │
│  └──────────┴──────────┴──────────┴─────────────────┘ │
└────────────────────────────────────────────────────────┘
                            │
┌────────────────────────────────────────────────────────┐
│                  Transport Layer                        │
│  ┌──────────┬──────────┬──────────┐                   │
│  │   UART   │   SPI    │   I2C    │                   │
│  └──────────┴──────────┴──────────┘                   │
└────────────────────────────────────────────────────────┘
                            │
┌────────────────────────────────────────────────────────┐
│                  Hardware Layer                         │
│  (STM32 Peripherals, DMA, GPIO)                        │
└────────────────────────────────────────────────────────┘
```

---

## Video System

### OSD Architecture

```
┌──────────────────────────────────────────────────────┐
│                  OSD Data Flow                        │
└──────────────────────────────────────────────────────┘

FPV Camera ──► VI Pad ──► AT7456E ──► VO Pad ──► VTX
                            │  ▲
                            │  │
                        SPI │  │ (Character ROM,
                            │  │  Display Buffer)
                            │  │
                            ▼  │
                       ┌──────────┐
                       │   MCU    │
                       │(Overlay  │
                       │ Control) │
                       └──────────┘
                            │
                  ┌─────────┴────────┐
                  │                  │
          ┌───────▼───────┐  ┌──────▼─────┐
          │  Flight Data  │  │   Alarms   │
          │  - Voltage    │  │  - Low RSSI│
          │  - Current    │  │  - Low Batt│
          │  - Altitude   │  │  - Failsafe│
          └───────────────┘  └────────────┘
```

### OSD Update Cycle

```
60Hz OSD Refresh (PAL/NTSC)
    │
    ├─► 1. Read flight data (5ms)
    ├─► 2. Format text strings (2ms)
    ├─► 3. SPI transfer to AT7456E (5ms)
    └─► 4. OSD chip overlays on video
```

---

## Design Decisions & Rationale

### Why STM32F722?

**Chosen for:**
- High clock speed (216MHz) for 8kHz PID loops
- Hardware FPU accelerates floating-point math
- Ample SRAM (256KB) for filters and buffers
- Sufficient flash (512KB) for future firmware
- Industry-proven reliability
- Excellent community support

**Alternatives considered:**
- F405: Too slow for 8kHz+ loops
- F745: Higher cost, minimal benefit for this application
- H743: Overkill, expensive, power hungry

### Why BMI270 Gyro?

**Chosen for:**
- Ultra-low noise (0.007 °/s/√Hz)
- Native 32kHz sampling
- Proven performance in DJI systems
- Modern architecture (vs aging MPU6000)
- Low power consumption

**Trade-offs:**
- Requires Betaflight 4.3+ (older firmware incompatible)
- More expensive than MPU6000
- Longer initialization sequence

### Soft Mounting vs Hard Mounting

**Soft mounting recommended because:**
- Reduces gyro noise by 60-80%
- Better D-term performance
- Less propeller vibration transmitted
- Improved filter effectiveness

**Design accommodations:**
- Included silicone grommets
- Reinforced mounting hole areas
- Tested vibration isolation characteristics

### Dual BEC Design

**Rationale for 5V + 9V:**
- 5V: Universal compatibility (RX, GPS, LEDs)
- 9V: Analog cameras prefer 9V (better image quality)
- Separates digital (5V) and analog (9V) power domains
- Reduces interference in video signal

### 16MB Flash vs SD Card

**Flash chosen for:**
- No moving parts (more reliable)
- Faster write speeds (less latency)
- No SD card slot space requirements
- Soldered component (can't be lost)

**Trade-offs:**
- Limited capacity (~60min @ 2kHz)
- Can't swap cards for extended logging
- Must erase to reuse

---

**Navigation:**
- [← Back: Hardware Specifications](./hardware-specifications.md)
- [Next: Pinout Reference →](./pinout-reference.md)
- [Return to Index](./README.md)

---

*Last updated: February 2026 | Hardware Rev 1.2*
