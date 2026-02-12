# Pinout Reference & Connectivity

**Document Version:** 1.0.0  
**Hardware Revision:** Rev 1.2  
**Last Updated:** February 2026

---

## Table of Contents

1. [Pinout Overview](#pinout-overview)
2. [Top Side Pads](#top-side-pads)
3. [Bottom Side Pads](#bottom-side-pads)
4. [Detailed Pin Descriptions](#detailed-pin-descriptions)
5. [Connector Pinouts](#connector-pinouts)
6. [Alternative Pin Functions](#alternative-pin-functions)
7. [Electrical Characteristics](#electrical-characteristics)

---

## Pinout Overview

The ELCO F7 Ultimate features solder pads on both top and bottom sides. Power and motor connections are on the top for easy access, while UART and peripheral connections are on the bottom to reduce wire clutter.

### Pin Layout Philosophy

- **Top Side:** High-current paths (power, motors, BEC outputs)
- **Bottom Side:** Signal paths (UARTs, I2C, video)
- **Grouped by Function:** Related pins are physically adjacent
- **Labeled Silkscreen:** All pads clearly marked on PCB

{{INSERT_IMAGE: diagrams/pinout-overview-annotated.png}}

---

## Top Side Pads

### Power Input Section

```
┌─────────────────────────────────────┐
│  VBAT+  VBAT+  GND  GND  CURR  4V5 │  ← Top Edge
└─────────────────────────────────────┘
```

| Pad Name | Function | Voltage Range | Max Current | Notes |
|----------|----------|---------------|-------------|-------|
| **VBAT+** | Battery Positive | 7.4V - 26V | 10A cont. | Dual pads for redundancy |
| **VBAT+** | Battery Positive | 7.4V - 26V | 10A cont. | Connect both for best results |
| **GND** | Battery Negative | - | 10A cont. | Dual pads, common ground |
| **GND** | Battery Negative | - | 10A cont. | Connect both recommended |
| **CURR** | Current Sensor Input | 0 - 3.3V | 1mA | Analog input for current sensing |
| **4V5** | 4.5V Output (USB only) | 4.5V | 500mA | Active only when USB connected |

**Wiring Recommendations:**
- Use 14-18 AWG wire for VBAT and GND
- Solder both VBAT+ pads for redundancy
- Keep wires short to minimize voltage drop
- Add capacitor (35V, 1000µF) across VBAT/GND for noise filtering

---

### Motor Output Section

```
┌──────────────────────────────┐
│  M1   M2   M3   M4           │
└──────────────────────────────┘
```

| Pad | Motor Position | Signal Type | Max Current | Notes |
|-----|----------------|-------------|-------------|-------|
| **M1** | Front Right (CW) | PWM/DShot/Proshot | 50mA | Signal only, not power |
| **M2** | Back Right (CCW) | PWM/DShot/Proshot | 50mA | Signal only, not power |
| **M3** | Back Left (CW) | PWM/DShot/Proshot | 50mA | Signal only, not power |
| **M4** | Front Left (CCW) | PWM/DShot/Proshot | 50mA | Signal only, not power |

**Motor Order (QuadX):**
```
       Front
        ┌─┐
    M4  │ │  M1
     ╲  │ │  ╱
      ╲ │ │ ╱
       ╲│ │╱
    ────┘ └────
       ╱│ │╲
      ╱ │ │ ╲
     ╱  │ │  ╲
    M3  │ │  M2
        └─┘
```

**Supported Protocols:**
- PWM: 50-490Hz
- Oneshot125: 125-250µs
- Oneshot42: 42-84µs
- Multishot: 5-25µs
- DShot150/300/600/1200
- ProShot1000

---

### BEC Output Section

```
┌──────────────────────────────────┐
│  5V  5V  GND  9V  9V  GND        │
└──────────────────────────────────┘
```

| Pad | Voltage | Max Current | Notes |
|-----|---------|-------------|-------|
| **5V** | 5.0V ±2% | 3A total | Regulated output, all 5V pads connected |
| **5V** | 5.0V ±2% | - | Additional pad for convenience |
| **GND** | Ground | - | Common ground |
| **9V** | 9.0V ±2% | 3A total | Requires VBAT >12V to operate |
| **9V** | 9.0V ±2% | - | Additional pad for convenience |
| **GND** | Ground | - | Common ground |

**Current Budget:**
- **5V Total:** 3A available
  - FC internal: ~600mA
  - Available for peripherals: ~2.4A
- **9V Total:** 3A (only on 3S+ LiPo, VBAT >12V)

---

### LED & Accessories Section

```
┌────────────────────────────┐
│  LED  GND  BZ+  BZ-        │
└────────────────────────────┘
```

| Pad | Function | Signal Type | Voltage | Max Current | Notes |
|-----|----------|-------------|---------|-------------|-------|
| **LED** | LED Strip Data | WS2812B Signal | 5V logic | 500mA | DMA-driven output |
| **GND** | Ground for LED | - | - | - | Common ground |
| **BZ+** | Buzzer Positive | PWM or DC | 5V | 50mA | Frequency controllable |
| **BZ-** | Buzzer Negative | - | GND | 50mA | Piezo buzzer recommended |

**LED Strip:**
- Compatible with WS2812B, WS2813, SK6812
- Max 30 LEDs @ full brightness
- DMA-driven for smooth animations
- 800kHz data signal

**Buzzer:**
- Frequency range: 2-5 kHz
- Lost model alarm support
- Battery warning tones
- Arm/Disarm confirmation

---

## Bottom Side Pads

### UART Section

```
┌────────────────────────────────────────────────────────┐
│  TX1 RX1 TX2 RX2 TX3 RX3 TX4 RX4 TX5 RX5 TX6 RX6  GND │
└────────────────────────────────────────────────────────┘
```

| Pad | Direction | Voltage | Function | Default Assignment | Inverter | DMA |
|-----|-----------|---------|----------|-------------------|----------|-----|
| **TX1** | Output | 3.3V | UART1 Transmit | Receiver (telemetry) | Yes | Yes |
| **RX1** | Input | 3.3V/5V | UART1 Receive | Receiver (SBUS/CRSF) | Yes | Yes |
| **TX2** | Output | 3.3V | UART2 Transmit | VTX Control | No | Yes |
| **RX2** | Input | 3.3V/5V | UART2 Receive | VTX Telemetry | No | Yes |
| **TX3** | Output | 3.3V | UART3 Transmit | GPS | No | Yes |
| **RX3** | Input | 3.3V/5V | UART3 Receive | GPS | No | Yes |
| **TX4** | Output | 3.3V | UART4 Transmit | Available | No | No |
| **RX4** | Input | 3.3V/5V | UART4 Receive | ESC Telemetry | No | No |
| **TX5** | Output | 3.3V | UART5 Transmit | User Defined | No | No |
| **RX5** | Input | 3.3V/5V | UART5 Receive | User Defined | No | No |
| **TX6** | Output | 3.3V | UART6 Transmit | User Defined | No | Yes |
| **RX6** | Input | 3.3V/5V | UART6 Receive | User Defined | No | Yes |
| **GND** | - | - | Common Ground | - | - | - |

**Notes:**
- All RX pins are 5V tolerant
- TX pins output 3.3V logic levels
- UART1 has hardware inverter for SBUS
- Use external inverter for other inverted protocols

---

### I2C & SPI Section

```
┌─────────────────────────────┐
│  SDA  SCL  GND  5V          │
└─────────────────────────────┘
```

| Pad | Function | Voltage | Pull-up | Max Devices | Notes |
|-----|----------|---------|---------|-------------|-------|
| **SDA** | I2C Data | 3.3V | 2.2kΩ onboard | 8 typical | Open-drain |
| **SCL** | I2C Clock | 3.3V | 2.2kΩ onboard | - | 400kHz max |
| **GND** | Ground | - | - | - | - |
| **5V** | Power Output | 5V | - | - | For I2C devices |

**Supported I2C Devices:**
- Magnetometer (HMC5883L, QMC5883L, IST8310, QMC5883, LIS3MDL)
- Rangefinder (VL53L0X, VL53L1X, TFMini)
- OLED Display (SSD1306, SH1106)
- Airspeed Sensor (MS4525DO)
- External barometer

**I2C Address Conflicts:**
- Barometer (DPS310): 0x76 or 0x77
- Ensure external devices don't conflict

---

### Video Section

```
┌─────────────────────────────┐
│  VI  VO  GND  VBAT          │
└─────────────────────────────┘
```

| Pad | Function | Signal Type | Impedance | Notes |
|-----|----------|-------------|-----------|-------|
| **VI** | Video Input | Analog 1Vpp | 75Ω | From FPV camera |
| **VO** | Video Output | Analog 1Vpp | 75Ω | To video transmitter |
| **GND** | Video Ground | - | - | Critical for clean video |
| **VBAT** | Battery Monitor | 7.4-26V | - | For OSD voltage display |

**Video Specifications:**
- **Standards:** NTSC (525/60) and PAL (625/50)
- **Auto-detection:** Yes
- **Frequency Response:** 5.5 MHz (-3dB)
- **S/N Ratio:** >40dB

**Wiring Best Practices:**
- Use shielded cable for VI/VO
- Keep video ground separate from motor ground
- Short wire runs reduce interference
- Add LC filter if noise present

---

### Boot & Bind Section

```
┌─────────────────────┐
│  BOOT  BIND  GND    │
└─────────────────────┘
```

| Pad | Function | Normal State | Activated State | Notes |
|-----|----------|--------------|-----------------|-------|
| **BOOT** | Bootloader Entry | Float/High | Short to GND | For DFU firmware recovery |
| **BIND** | Receiver Bind | Float/High | Short to GND | Receiver-specific function |
| **GND** | Ground | - | - | Common ground |

**Usage:**
- **BOOT Button:** Press and hold while connecting USB to enter DFU mode
- **BIND Button:** For binding FrSky receivers (varies by receiver)

---

## Detailed Pin Descriptions

### VBAT+ (Battery Positive)

**Electrical:**
- Input range: 7.4V - 26V (2S-6S LiPo)
- Absolute maximum: 28V (overvoltage clamp)
- Recommended wire: 14-16 AWG silicone
- Protection: P-FET reverse polarity, TVS diode

**Connection:**
```
LiPo Red Wire (+) ──[14AWG]──► VBAT+ Pad
                   └──[1000µF 35V Capacitor]──┐
                                                ├──► GND Pad
LiPo Black Wire (-) ─[14AWG]──────────────────┘
```

**Important:**
- Always connect capacitor for noise filtering
- Use XT60/XT30 battery connector with anti-spark
- Check polarity before connecting!

---

### Motor Pads (M1-M4)

**Electrical:**
- Signal type: 3.3V push-pull output
- Current capacity: 50mA per pad
- Protocols: PWM, Oneshot, Multishot, DShot, Proshot

**DShot Configuration:**
```
DShot600:  Most common, good balance
DShot300:  Older ESCs
DShot150:  Long wire runs
DShot1200: Experimental, high performance
```

**Wiring:**
```
FC M1 Pad ──[26-28 AWG]──► ESC Signal (S)
                            ESC Ground (G) ──► FC GND
```

**Motor Direction Test:**
1. Remove props!
2. Connect in Motors tab
3. Spin motors individually
4. If reversed, change motor wire phase (swap any 2 wires on motor)

---

### 5V Output Pads

**Load Budget:**
```
5V Regulator: 3A maximum
├─ FC Internal:          600mA (reserved)
├─ Available:            2400mA
    ├─ Receiver:         100-250mA
    ├─ GPS:              50-100mA
    ├─ LED Strip:        200-500mA
    ├─ Buzzer:           30-50mA
    └─ Other:            Remaining capacity
```

**Overload Protection:**
- Current limit: 4A (then shutdown)
- Thermal limit: 125°C (automatic shutdown)
- Recovery: Automatic after cool-down

---

### 9V Output Pads

**Activation Condition:**
- Requires VBAT >12V to turn on
- Disabled on 2S batteries
- Active on 3S+ (11.1V nominal, 12.6V fully charged)

**Typical Loads:**
```
9V @ 3A available:
├─ FPV Camera:         150-300mA @ 9V
├─ Video Transmitter:  300-800mA @ 9V (depending on power)
└─ Remaining:          1900-2550mA
```

**Why 9V for Analog FPV:**
- Most cameras perform best at 9-12V
- Lower noise than direct VBAT
- Better image quality
- Stable voltage (no battery sag effects)

---

### UART Pins (TX/RX)

**Signal Levels:**
- **TX Output:** 3.3V (CMOS logic)
- **RX Input:** 5V tolerant (with clamping diodes)
- **Logic High:** >2.4V
- **Logic Low:** <0.8V

**UART1 Special Features:**
- Hardware inverter for SBUS/FPort
- Software configurable in Betaflight CLI
- Example: `set serialrx_inverted = ON`

**Common Protocols & Baud Rates:**
| Protocol | Baud Rate | UART Typically |
|----------|-----------|----------------|
| SBUS | 100000 | UART1 (inverted) |
| iBUS | 115200 | UART1 |
| CRSF/ELRS | 420000 | UART1 |
| Crossfire | 420000 | UART1 |
| FrSky SmartPort | 57600 | UART2 |
| SmartAudio | 4800 | UART2 |
| Tramp | 9600 | UART2 |
| GPS (NMEA) | 9600 | UART3 |
| GPS (UBX) | 115200 | UART3 |
| ESC Telemetry | 115200 | UART4 |

---

### I2C Bus (SDA/SCL)

**Electrical:**
- Bus voltage: 3.3V
- Pull-up resistors: 2.2kΩ (onboard)
- Speed: 400kHz (Fast Mode I2C)
- Cable length: <30cm recommended

**Address Space:**
```
Onboard Devices:
├─ DPS310 Barometer: 0x76 (or 0x77)

Common External Devices:
├─ HMC5883L Mag:     0x1E
├─ QMC5883L Mag:     0x0D
├─ VL53L0X Range:    0x29
└─ SSD1306 OLED:     0x3C
```

**Multi-device Wiring:**
```
FC SDA ────┬──[Short wire]──► Device1 SDA
           ├──[Short wire]──► Device2 SDA
           └──[Short wire]──► Device3 SDA

FC SCL ────┬──[Short wire]──► Device1 SCL
           ├──[Short wire]──► Device2 SCL
           └──[Short wire]──► Device3 SCL

FC 5V  ────┬──► Device1 VCC
           ├──► Device2 VCC
           └──► Device3 VCC

FC GND ────┴──► All GND pins
```

---

### Video Pads (VI/VO)

**Signal Specifications:**
- Standard: Composite video (CVBS)
- Amplitude: 1Vpp (1 Volt peak-to-peak)
- Impedance: 75Ω
- DC offset: 0V (AC coupled)

**Wiring Example:**
```
FPV Camera:
├─ Camera Video Out ──► FC VI Pad
├─ Camera 9V ──────────► FC 9V Pad
└─ Camera GND ─────────► FC GND Pad

Video Transmitter:
├─ VTX Video In ───────► FC VO Pad
├─ VTX 9V ─────────────► FC 9V Pad
├─ VTX GND ────────────► FC GND Pad
└─ VTX Control ────────► FC TX2 Pad (SmartAudio)
```

**Troubleshooting Video Issues:**
- **No OSD:** Check SPI connection to AT7456E
- **Noisy video:** Add ferrite beads on motor wires
- **No video:** Verify VI/VO connections
- **Wrong format:** OSD auto-detects PAL/NTSC from camera

---

## Connector Pinouts

### JST-SH 1.0mm Connectors (Optional)

Some users prefer soldering JST-SH connectors for easy peripheral attachment.

**6-Pin UART Connector (Example):**
```
Pin 1: GND
Pin 2: 5V
Pin 3: TX (varies by UART)
Pin 4: RX (varies by UART)
Pin 5: Optional (CTS/RTS)
Pin 6: Optional
```

### USB-C Connector

**Pin Assignment:**
```
USB-C Connector (Viewed from front):
┌───────────────────────┐
│ A1 ──── GND           │
│ A4 ──── VBUS (5V)     │
│ A5 ──── CC1           │
│ A6 ──── D+ (USB Data) │
│ A7 ──── D- (USB Data) │
│ A8 ──── SBU1          │
│ A9 ──── VBUS (5V)     │
│ A12 ─── GND           │
│ (B-side mirrored)     │
└───────────────────────┘
```

**USB Power Delivery:**
- Standard: USB 2.0 (no USB-C PD negotiation)
- Current: 500mA max (USB 2.0 spec)
- Voltage: 5V

---

## Alternative Pin Functions

The STM32F722 supports alternate functions on many pins. Advanced users can reconfigure pins in Betaflight CLI.

### Remappable Functions

| Function | Default Pin | Alternative Pins | CLI Command Example |
|----------|-------------|------------------|---------------------|
| LED Strip | LED Pad (PA8) | TIM1_CH1 pins | `resource led_strip 1 A08` |
| Camera Control | TX2 | Any TX pad | `resource camera_control 1 B10` |
| Softserial | N/A | Any GPIO | `resource serial_tx 7 A09` |

**Warning:** Remapping requires advanced knowledge. Incorrect settings may brick firmware (recoverable via DFU).

---

## Electrical Characteristics

### Pad Current Ratings

| Pad Type | Trace Width | Copper | Max Continuous | Max Burst |
|----------|-------------|--------|----------------|-----------|
| VBAT/GND | 3mm | 2oz | 10A | 30A (<1s) |
| 5V/9V | 1.5mm | 2oz | 3A | 5A (<1s) |
| Motor | 0.4mm | 1oz | 50mA | 100mA |
| UART | 0.2mm | 1oz | 10mA | 25mA |
| I2C | 0.2mm | 1oz | 10mA | 25mA |

### ESD Protection

All signal pads include:
- Zener clamp diodes to 3.3V rail
- Series resistors on sensitive inputs
- ESD rating: ±2kV (HBM model)

### Signal Integrity

- **UART:** Good for 2m cable @ 115200 baud
- **I2C:** Good for 30cm cable @ 400kHz
- **SPI:** Onboard traces only (not exposed)
- **Video:** Shielded cable recommended >15cm

---

**Navigation:**
- [← Back: System Architecture](./system-architecture.md)
- [Next: Wiring Guide →](./wiring-guide.md)
- [Return to Index](./README.md)

---

*Last updated: February 2026 | Hardware Rev 1.2*
