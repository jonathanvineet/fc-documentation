# Wiring Examples & Integration Guide

**Document Version:** 1.0.0  
**Hardware Revision:** Rev 1.2  
**Last Updated:** February 2026

---

## Table of Contents

1. [Wiring Overview](#wiring-overview)
2. [Standard Quad Build (4S Racing)](#standard-quad-build-4s-racing)
3. [Long Range Build (6S GPS)](#long-range-build-6s-gps)
4. [Cinewhoop Build (3S Indoor)](#cinewhoop-build-3s-indoor)
5. [Component-Specific Wiring](#component-specific-wiring)
6. [Wire Sizing & Selection](#wire-sizing--selection)
7. [Best Practices](#best-practices)
8. [Common Mistakes](#common-mistakes)

---

## Wiring Overview

### General Principles

1. **Power First:** Always wire battery connections before signal wires
2. **Test Incrementally:** Test each component as you wire it
3. **Polarity Check:** Triple-check positive/negative before powering on
4. **Strain Relief:** Secure wires to prevent vibration damage
5. **Clean Routing:** Separate power and signal wires when possible

### Tools Required

- [ ] Soldering iron (60-80W recommended)
- [ ] Solder (60/40 or 63/37 lead, or lead-free)
- [ ] Wire strippers
- [ ] Flush cutters
- [ ] Heat shrink tubing
- [ ] Multimeter
- [ ] Helping hands/PCB holder
- [ ] Isopropyl alcohol (flux cleanup)

### Wire Color Convention

| Color | Typical Use |
|-------|-------------|
| **Red** | Positive power (VBAT, 5V, 9V) |
| **Black** | Ground (GND) |
| **Yellow** | Motor signal wires |
| **White** | UART TX (transmit) |
| **Green** | UART RX (receive) |
| **Blue** | Video signal |

> Note: Not all manufacturers follow this convention. Always verify with multimeter!

---

## Standard Quad Build (4S Racing)

### Build Specifications

- **Frame:** 5-inch racing quad
- **Battery:** 4S LiPo (14.8V nominal, 1300-1500mAh)
- **Motors:** 2306 2400KV
- **ESC:** 4-in-1 45A BLHeli_32
- **Receiver:** ExpressLRS 2.4GHz
- **VTX:** 25-800mW with SmartAudio
- **Camera:** 1000TVL FPV camera

### Wiring Diagram

```
Battery (4S 14.8V)
    │
    ├───[XT60]───► PDB or 4-in-1 ESC
    │                  │
    │                  ├───► Motors M1-M4 (high current)
    │                  │
    │                  ├─[14AWG]─► FC VBAT+
    │                  └─[14AWG]─► FC GND
    │
    └─► Current Sensor ──[26AWG]──► FC CURR pad

Flight Controller (ELCO F7)
    │
    ├─[Motor Signals]─► ESC Signal Pads
    │   ├─ M1 (FC) ──► ESC M1
    │   ├─ M2 (FC) ──► ESC M2
    │   ├─ M3 (FC) ──► ESC M3
    │   └─ M4 (FC) ──► ESC M4
    │
    ├─[ESC Ground]────► FC GND (important!)
    │
    ├─[5V Rail]
    │   ├─► Receiver 5V
    │   ├─► Camera 5V (or use 9V)
    │   └─► LED strip 5V (optional)
    │
    ├─[9V Rail]
    │   ├─► Camera 9V (preferred)
    │   └─► VTX 9V
    │
    ├─[UART1]
    │   ├─ RX1 ◄── ELRS TX
    │   └─ TX1 ──► ELRS RX (telemetry)
    │
    ├─[UART2]
    │   └─ TX2 ──► VTX SmartAudio pad
    │
    ├─[UART4]
    │   └─ RX4 ◄── ESC Telemetry (optional)
    │
    └─[Video]
        ├─ VI ◄── Camera Video Out
        └─ VO ──► VTX Video In
```

### Step-by-Step Wiring

#### Step 1: Battery Power to ESC

```
1. Solder XT60 connector to ESC power pads
   ├─ Red wire (BAT+) to ESC B+ pad
   └─ Black wire (BAT-) to ESC B- pad

2. Add 1000µF 35V capacitor across ESC B+ and B-
   (Polarity matters! Stripe = negative)
```

#### Step 2: ESC to Flight Controller

```
1. Solder power wires from ESC to FC:
   ├─ ESC 5V  ──[16AWG red]──► FC VBAT+
   ├─ ESC GND ──[16AWG black]─► FC GND
   └─ Also solder FC second VBAT+ and GND pads

2. Solder motor signal wires:
   ├─ ESC M1 ──[26AWG yellow]──► FC M1
   ├─ ESC M2 ──[26AWG yellow]──► FC M2
   ├─ ESC M3 ──[26AWG yellow]──► FC M3
   ├─ ESC M4 ──[26AWG yellow]──► FC M4
   └─ ESC GND ──[26AWG black]──► FC GND (important!)
```

#### Step 3: Receiver (ELRS)

```
1. Identify receiver pads:
   ├─ 5V (or VCC)
   ├─ GND
   ├─ TX (transmit - goes to FC RX)
   └─ RX (receive - goes to FC TX)

2. Solder wires:
   ├─ RX 5V  ──[26AWG red]──► FC 5V
   ├─ RX GND ──[26AWG black]─► FC GND
   ├─ RX TX  ──[26AWG white]──► FC RX1
   └─ RX RX  ──[26AWG green]──► FC TX1
```

#### Step 4: Camera

```
1. Camera wiring (9V preferred):
   ├─ Cam V+ ──[26AWG red]──► FC 9V
   ├─ Cam GND ─[26AWG black]─► FC GND
   └─ Cam VID ─[26AWG blue]──► FC VI

Alternative (5V camera):
   └─ Cam V+ ──[26AWG red]──► FC 5V instead
```

#### Step 5: Video Transmitter

```
1. VTX wiring:
   ├─ VTX V+ ─[26AWG red]──► FC 9V
   ├─ VTX GND ─[26AWG black]─► FC GND
   ├─ VTX VID ─[26AWG blue]──► FC VO
   └─ VTX SA ──[28AWG white]──► FC TX2 (SmartAudio)

2. Install VTX antenna before powering on!
```

#### Step 6: Optional - LED Strip

```
1. LED strip connection:
   ├─ LED 5V ──[22AWG red]──► FC 5V
   ├─ LED GND ─[22AWG black]─► FC GND
   └─ LED DAT ─[26AWG]─────► FC LED pad

2. Consider external 5V BEC for >10 LEDs
```

### Current Budget Check

```
5V Rail @ 3A:
├─ FC Internal:     600mA  ✓
├─ ELRS Receiver:   150mA  ✓
├─ Camera (if 5V):  200mA  ✓
├─ LED Strip (10):  300mA  ✓
└─ Available:       1750mA ✓

9V Rail @ 3A:
├─ Camera (9V):     200mA  ✓
├─ VTX (600mW):     300mA  ✓
└─ Available:       2500mA ✓

Total OK: Both rails within limits
```

---

## Long Range Build (6S GPS)

### Build Specifications

- **Frame:** 7-inch long range
- **Battery:** 6S LiPo (22.2V nominal, 3000-4000mAh)
- **Motors:** 2806.5 1300KV
- **ESC:** 4-in-1 60A
- **Receiver:** ELRS 900MHz or Crossfire
- **GPS:** M8N/M9N with compass
- **VTX:** 1.6W adjustable
- **Camera:** Low-latency FPV camera

### Additional Components

This build adds GPS for position hold and return-to-home features.

### Wiring Diagram (Additions to Standard Build)

```
GPS Module (UART3)
    │
    ├─[UART3]
    │   ├─ GPS TX ──[28AWG white]──► FC RX3
    │   └─ GPS RX ──[28AWG green]──► FC TX3
    │
    ├─[Power]
    │   ├─ GPS 5V ──[26AWG red]────► FC 5V
    │   └─ GPS GND ─[26AWG black]──► FC GND
    │
    └─[I2C] (if compass present)
        ├─ MAG SDA ─[28AWG]─► FC SDA
        └─ MAG SCL ─[28AWG]─► FC SCL

Buzzer (for lost model alarm)
    │
    ├─ BZ+ ──[26AWG red]──► FC BZ+
    └─ BZ- ──[26AWG black]─► FC BZ-
```

### GPS Mounting Recommendations

1. **Position:** Top of frame, away from power wires
2. **Orientation:** Arrow pointing forward
3. **Height:** Elevated on mast for best signal
4. **Clearance:** >5cm from ESC/motors (magnetic interference)
5. **Mounting:** Use vibration dampening

### GPS Wiring Notes

```
Standard GPS Pinout (6-pin):
┌─────┬──────┬─────────────┐
│ Pin │ Name │ Connection  │
├─────┼──────┼─────────────┤
│  1  │ 5V   │ FC 5V       │
│  2  │ GND  │ FC GND      │
│  3  │ TX   │ FC RX3      │
│  4  │ RX   │ FC TX3      │
│  5  │ SDA  │ FC SDA      │
│  6  │ SCL  │ FC SCL      │
└─────┴──────┴─────────────┘
```

---

## Cinewhoop Build (3S Indoor)

### Build Specifications

- **Frame:** 3-inch cinewhoop with ducts
- **Battery:** 3S LiPo (11.1V nominal, 650-850mAh)
- **Motors:** 1408 3000KV
- **ESC:** 4-in-1 20A
- **Receiver:** ELRS 2.4GHz
- **Camera:** Caddx Turtle V2 or similar
- **No VTX:** Using HD system (DJI/Walksnail)

### Special Considerations

- **No 9V Rail:** 3S battery only provides 11.1V, below 12V threshold
  - All devices must run on 5V
- **HD System:** Replaces analog camera/VTX with digital
- **Space Constrained:** Very tight wiring

### Wiring Diagram

```
Battery (3S 11.1V)
    │
    └─► 4-in-1 ESC ──► FC VBAT (11.1V max)
                        │
                        └─► 5V Rail ONLY (9V inactive)

HD VTX (DJI Air Unit / Walksnail Avatar)
    │
    ├─[Power]
    │   ├─ HD 5V ──► FC 5V (or direct from ESC)
    │   └─ HD GND ──► FC GND
    │
    ├─[Control] (MSP)
    │   ├─ HD TX ──► FC RX2
    │   └─ HD RX ──► FC TX2
    │
    └─[Camera] (direct to HD system, not FC)
```

### 5V Current Budget (Critical on 3S!)

```
5V Rail @ 3A (no 9V available):
├─ FC Internal:        600mA  ✓
├─ ELRS Receiver:      150mA  ✓
├─ HD VTX:             800mA  ⚠️ (check your model)
├─ LED Strip:          200mA  ✓
└─ Available:          250mA  ⚠️ (tight!)

Consider: External 5V BEC if HD VTX draws >1A
```

---

## Component-Specific Wiring

### 4-in-1 ESC Connection

**Pin Mapping:**
```
ESC Pad    │ FC Pad
───────────┼────────
M1 Signal  │ M1
M2 Signal  │ M2
M3 Signal  │ M3
M4 Signal  │ M4
GND (imp!) │ GND
TLM (opt)  │ RX4 (ESC telemetry)
5V/VBAT    │ VBAT+
GND        │ GND
```

**Important:**
- Motor signal ground MUST be connected
- DShot requires common ground
- Telemetry is optional but recommended

---

### Receiver Types

#### SBUS Receiver (FrSky, Flysky)

```
Receiver Wiring:
├─ 5V  ──► FC 5V
├─ GND ──► FC GND
└─ SBUS ──► FC RX1

Betaflight Configuration:
├─ Ports Tab: UART1 = Serial RX
├─ Configuration Tab: 
│   ├─ Serial Receiver Provider = SBUS
│   └─ Receiver Mode = SBUS
└─ SBUS is inverted (FC handles automatically)
```

#### CRSF/ELRS Receiver

```
Receiver Wiring:
├─ 5V  ──► FC 5V
├─ GND ──► FC GND
├─ TX  ──► FC RX1
└─ RX  ──► FC TX1 (for telemetry)

Betaflight Configuration:
├─ Ports Tab: UART1 = Serial RX
├─ Configuration Tab:
│   └─ Serial Receiver Provider = CRSF
└─ Baud rate: 420000 (auto-configured)
```

#### Spektrum Satellite

```
Receiver Wiring:
├─ 3.3V ──► FC 5V (tolerates 5V)
├─ GND  ──► FC GND
└─ Signal ──► FC RX2 (or any UART)

Betaflight Configuration:
└─ Serial Receiver Provider = SPEKTRUM1024/2048
```

---

### GPS Module Connection

**Standard UART GPS:**
```
GPS Pinout (common):
├─ VCC (5V) ──► FC 5V
├─ GND      ──► FC GND
├─ TX       ──► FC RX3
└─ RX       ──► FC TX3

Betaflight Configuration:
└─ Ports Tab: UART3 = GPS
```

**GPS + Compass (I2C):**
```
Additional Wiring:
├─ SDA ──► FC SDA
├─ SCL ──► FC SCL
└─ Share 5V/GND with GPS

Betaflight Configuration:
└─ Configuration Tab: Enable "Magnetometer"
```

---

### Video Transmitter Control

#### SmartAudio (TBS/ImmersionRC)

```
VTX Wiring:
├─ V+  ──► FC 9V (or VBAT)
├─ GND ──► FC GND
├─ VIN ──► FC VO
└─ SA  ──► FC TX2

Betaflight Configuration:
├─ Ports Tab: UART2 = VTX (SmartAudio)
└─ Can change channels/power via OSD
```

#### Tramp (RaceBand)

```
VTX Wiring:
├─ Same as SmartAudio
└─ Tramp pad ──► FC TX2

Betaflight Configuration:
└─ Ports Tab: UART2 = VTX (Tramp)
```

---

### LED Strip (WS2812B)

```
LED Wiring:
├─ 5V  ──[22AWG]──► FC 5V (or external BEC)
├─ GND ──[22AWG]──► FC GND
└─ DIN ──[26AWG]──► FC LED pad

Power Considerations:
├─ Each LED: ~50mA @ full white
├─ 10 LEDs: 500mA (on FC 5V OK)
├─ 20+ LEDs: Use external 5V BEC
└─ Calculate: N × 50mA = required current
```

**LED Strip Direction:**
- Data flows one direction: DIN → DOUT
- Connect FC to first LED's DIN
- Second LED's DIN connects to first LED's DOUT
- Continue chain

---

### Current Sensor

```
Analog Current Sensor:
├─ Red  ──► Battery + (in series)
├─ Black ──► ESC B+ (in series)
└─ Yellow ──► FC CURR pad

Voltage Divider:
└─ Scales 0-150A to 0-3.3V range

Calibration:
└─ In Betaflight: Configuration > Current Sensor
    ├─ Scale: (typically 100-400, check sensor docs)
    └─ Offset: 0 (adjust if needed)
```

---

## Wire Sizing & Selection

### Wire Gauge Selection

| Current | Wire Gauge | Typical Use |
|---------|------------|-------------|
| 50-100A | 10-12 AWG | Battery to PDB |
| 20-50A | 14-16 AWG | PDB to ESC/FC power |
| 5-10A | 18-20 AWG | BEC outputs, LED strips |
| 1-3A | 22-24 AWG | Receiver, GPS, peripherals |
| <500mA | 26-30 AWG | Signal wires (UART, I2C) |

### Wire Types

**Silicone Wire:**
- Flexible, easy to work with
- High strand count
- Recommended for most applications
- Temperature rating: 150-200°C

**Teflon/PTFE Wire:**
- Very flexible
- Higher temperature rating (250°C)
- More expensive
- Good for tight spaces

**Standard PVC Wire:**
- Stiffer, harder to route
- Not recommended for drones

---

## Best Practices

### Soldering Tips

1. **Temperature:** 350-380°C for lead-based, 380-400°C for lead-free
2. **Tin First:** Pre-tin both pad and wire
3. **Heat Pad:** Apply iron to pad, not solder
4. **Feed Solder:** Let it flow onto heated pad
5. **Inspect:** Shiny, smooth joint = good. Dull, lumpy = cold joint
6. **Flux:** Use flux for difficult joints

### Wire Management

1. **Route Power Separately:** Keep high-current wires away from signal wires
2. **Twist Pairs:** Twist positive/negative pairs to reduce EMI
3. **Strain Relief:** Use hot glue or zip ties at stress points
4. **Label Wires:** Use heat shrink with labels for complex builds
5. **Leave Slack:** Allow 2-3mm extra for adjustments

### Testing Procedure

```
Before Power-On Checklist:
├─ [ ] Verify polarity (VBAT+/GND)
├─ [ ] Check for shorts (multimeter resistance test)
├─ [ ] Visually inspect all joints
├─ [ ] Remove propellers
├─ [ ] Check motor/ESC connections
└─ [ ] Verify receiver bind

First Power-On:
├─ 1. Connect USB only (no battery)
├─ 2. Verify FC powers on (LED)
├─ 3. Connect to Betaflight
├─ 4. Check sensors (gyro, acc, baro)
├─ 5. Disconnect USB
├─ 6. Connect battery (voltage check)
└─ 7. Verify receiver connection

Motor Test (NO PROPS!):
├─ 1. Enable motor test in Motors tab
├─ 2. Test each motor individually (low throttle)
├─ 3. Verify rotation direction
├─ 4. Check for excessive heat
└─ 5. Listen for unusual sounds
```

### Common Wiring Patterns

**Star Ground:**
```
        FC GND (center point)
           │
     ┌─────┼─────┬─────┬─────┐
     │     │     │     │     │
   ESC   RX   GPS  Cam  VTX
```
All grounds connect to one central point (reduces ground loops).

**Daisy Chain (Avoid for Power):**
```
FC 5V ──► RX 5V ──► GPS 5V ──► Cam 5V  ❌ Bad!
         (voltage drop increases)
```

**Proper Distribution:**
```
     FC 5V Rail
        │
    ┌───┴───┬───┬───┐
    │       │   │   │
   RX     GPS Cam LED  ✓ Good!
```

---

## Common Mistakes

### Mistake 1: Reversed Polarity
**Symptom:** Magic smoke, dead components
**Prevention:** 
- Use multimeter to verify before connecting
- Red = positive, Black = negative
- Check battery connector orientation

### Mistake 2: No ESC Ground
**Symptom:** DShot doesn't work, erratic motor behavior
**Fix:** 
- Connect ESC signal ground to FC GND
- Common ground required for digital protocols

### Mistake 3: Overloading BEC
**Symptom:** FC reboots, brownouts, instability
**Prevention:**
- Calculate total 5V draw
- Use external BEC if >2.5A needed
- Don't exceed 3A on FC 5V rail

### Mistake 4: Wrong TX/RX Connections
**Symptom:** No receiver input, no GPS data
**Fix:**
- TX on one device → RX on other device
- Remember: transmit goes to receive!

### Mistake 5: No VTX Antenna
**Symptom:** Instant VTX death
**Prevention:**
- ALWAYS install antenna before powering VTX
- Use dummy load for bench testing
- Check antenna connection regularly

### Mistake 6: Cold Solder Joints
**Symptom:** Intermittent connection, connection fails in flight
**Prevention:**
- Proper temperature (350-380°C)
- Heat pad, not just solder
- Joint should be shiny and smooth
- Re-flow suspicious joints

### Mistake 7: Insufficient Wire Gauge
**Symptom:** Voltage sag, melted wires, fire risk
**Prevention:**
- Use wire gauge chart above
- Thicker is better for power
- Don't use 26AWG for battery leads!

### Mistake 8: Bridged Pads
**Symptom:** Short circuit, won't power on
**Detection:**
- Multimeter continuity test
- Visual inspection under magnification
- Check adjacent pads for bridges
**Fix:**
- Solder wick to remove excess
- Re-flow with fresh flux

---

**Navigation:**
- [← Back: Pinout Reference](./pinout-reference.md)
- [Next: Firmware Setup →](./firmware-setup.md)
- [Return to Index](./README.md)

---

*Last updated: February 2026 | Hardware Rev 1.2*
