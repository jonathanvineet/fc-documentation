# First Time Setup & Calibration

**Document Version:** 1.0.0  
**Last Updated:** February 2026

---

## Table of Contents

1. [Pre-Flight Setup Workflow](#pre-flight-setup-workflow)
2. [Accelerometer Calibration](#accelerometer-calibration)
3. [Magnetometer Calibration](#magnetometer-calibration)
4. [ESC Calibration](#esc-calibration)
5. [Radio Calibration](#radio-calibration)
6. [PID Tuning Basics](#pid-tuning-basics)
7. [First Flight Checklist](#first-flight-checklist)
8. [Post-Flight Analysis](#post-flight-analysis)

---

## Pre-Flight Setup Workflow

### Complete Setup Sequence

```
┌─────────────────────────────────────────┐
│  1. Hardware Assembly & Wiring          │
│     └─► See: Wiring Guide               │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  2. Firmware Flash                      │
│     └─► See: Firmware Setup             │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  3. Basic Configuration                 │
│     ├─ Ports (UARTs)                    │
│     ├─ Receiver type                    │
│     └─ Motor protocol                   │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  4. Calibrations (This Document)        │
│     ├─ Accelerometer ✓                  │
│     ├─ Magnetometer (if GPS) ✓          │
│     ├─ ESC ✓                            │
│     └─ Radio ✓                          │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  5. Mode Configuration                  │
│     ├─ ARM switch                       │
│     ├─ Flight modes                     │
│     └─ Failsafe                         │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  6. Motor Test (Props Off!)             │
│     ├─ Spin direction                   │
│     └─ Order verification               │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  7. Pre-Flight Checks                   │
│     └─► See checklist below             │
└──────────────┬──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│  8. FIRST FLIGHT!                       │
└─────────────────────────────────────────┘
```

---

## Accelerometer Calibration

### Purpose
Calibrates the accelerometer so the FC knows what "level" is. Required for:
- Auto-leveling (ANGLE/HORIZON modes)
- Launch detection
- GPS rescue altitude hold

### When to Calibrate
- ✓ First time setup (required)
- ✓ After firmware flash
- ✓ If auto-level drifts
- ✓ After FC remounting
- ✗ Not needed for pure ACRO flying

### Procedure (Betaflight)

**Preparation:**
```
1. Remove quad from frame (optional but ideal)
2. Find perfectly level surface
   └─ Use spirit level to verify
3. Ensure FC can sit flat without wobbling
4. Remove battery (USB power only)
```

**Calibration Steps:**
```
1. Connect FC to Betaflight Configurator
2. Navigate to: Setup tab
3. Place FC on level surface
   ├─ Top side up
   ├─ USB port facing forward (or note orientation)
   └─ FC must be perfectly still
4. Click: "Calibrate Accelerometer"
5. Wait for completion (~5 seconds)
   └─ Do NOT move FC during this time!
6. Success: Green message appears
7. Verify: Tilt FC, model should follow accurately
```

**Verification:**
```
1. In Setup tab, watch 3D model
2. Pitch FC forward → Model pitches forward
3. Roll FC left → Model rolls left
4. Return to level → Model returns to level
5. If model doesn't level: Recalibrate
```

### Troubleshooting

**Model drifts after calibration:**
- Surface not level → Use better surface
- FC moved during calibration → Recalibrate
- Vibrations → Soft mount FC properly

**Can't calibrate:**
- Gyro not initialized → Power cycle FC
- Hardware issue → Contact support

---

## Magnetometer Calibration

### Purpose
Calibrates compass for GPS navigation features:
- Position hold
- Return to home
- Waypoint missions
- Heading hold

### When Required
- Only if using GPS with compass module
- Not needed for racing/freestyle
- Required for INAV/ArduPilot

### Preparation
```
1. Go outside (away from buildings)
2. Move away from:
   ├─ Metal structures
   ├─ Power lines
   ├─ Cars
   ├─ Electronics
   └─ Magnetic interference sources
3. Battery connected (motors will NOT spin)
4. Props removed (safety)
```

### Procedure (Betaflight with GPS)

**Method 1: Stick Commands**
```
1. Arm the quad (props off!)
2. Hold throttle high for 5 seconds
3. Calibration mode activates
4. Rotate quad slowly in all axes:
   ├─ Pitch forward/back (full rotation)
   ├─ Roll left/right (full rotation)
   └─ Yaw 360° (full rotation)
5. Continue for 30 seconds
6. Disarm to save
7. Power cycle FC
```

**Method 2: Configurator (INAV)**
```
1. Connect to INAV Configurator
2. Setup tab → "Calibrate Magnetometer"
3. Follow on-screen instructions
4. Rotate FC as shown
5. Complete all axes
6. Click "Save"
```

### Procedure (ArduPilot - Advanced)

**Large Vehicle Calibration (Recommended):**
```
1. Open Mission Planner
2. Initial Setup → Mandatory Hardware → Compass
3. Select: "Large Vehicle" calibration
4. Click "Start"
5. Walk quad in figure-8 pattern:
   ├─ Hold quad level
   ├─ Walk slowly in large figure-8
   ├─ Complete 3-4 figure-8s
   └─ Keep compass away from metal
6. Calibration completes automatically
7. Check compass health (>0.9 = good)
```

### Verification

**Check compass heading:**
```
1. In OSD or ground station
2. Note compass heading (e.g., 90° = East)
3. Rotate quad 90° clockwise
4. Heading should change by ~90°
5. Test all four directions
6. Error <10° = acceptable
7. Error >20° = recalibrate
```

**Compass Health Check:**
- Good: Smooth heading changes
- Bad: Jumping values, inconsistent
- If bad: Check for interference sources

---

## ESC Calibration

### Purpose
Teaches ESCs the FC's throttle range (1000-2000µs). 

### When Required
- ❌ **NOT needed** for DShot/Multishot (digital protocols)
- ✓ **Required** for PWM/Oneshot protocols (analog)
- ✓ If ESCs beep continuously
- ✓ If throttle response inconsistent

### Skip If:
- Using DShot (most modern setups) → Skip this section!

### Procedure (PWM/Oneshot Only)

**Manual ESC Calibration:**
```
1. Disconnect battery
2. Connect FC to Betaflight
3. Motors tab → Enable motor control (props off!)
4. Move Master slider to FULL (2000)
5. Connect battery
6. ESCs beep (high tone)
7. Move Master slider to ZERO (1000)
8. ESCs beep (confirmation tones)
9. Calibration complete
10. Disconnect battery
```

**BLHeli Configurator Method (Preferred):**
```
1. Download BLHeli Configurator
2. Connect FC via USB
3. "Read Setup" from all ESCs
4. Note ESC firmware versions
5. If needed: Flash BLHeli_S or BLHeli_32
6. ESCs automatically calibrate with DShot
```

---

## Radio Calibration

### Purpose
Teaches FC your transmitter's stick ranges and neutral positions.

### When Required
- ✓ First time setup
- ✓ After changing transmitter
- ✓ If stick ranges look wrong
- ✓ If stick centering off

### Procedure

**Betaflight:**
```
1. Turn on transmitter
2. Connect FC to Configurator
3. Receiver tab
4. Verify receiver is bound (channels move)
5. Click "Calibrate" (if available)
   OR
6. Manual verification:
   ├─ Center sticks → Values ~1500
   ├─ Full deflection → Values 1000-2000
   └─ Symmetric ranges (±500 from center)
```

**ArduPilot:**
```
1. Mission Planner → Initial Setup → Radio Calibration
2. Click "Calibrate Radio"
3. Move all sticks to extremes:
   ├─ Roll: Full left, full right
   ├─ Pitch: Full forward, full back
   ├─ Throttle: Min to max
   ├─ Yaw: Full left, full right
   └─ All switches: Each position
4. Click "Done"
5. Verify green bars show full range
```

### Verification

**Check ranges:**
```
Receiver Tab values:
├─ Minimum: ~1000 (±50)
├─ Center: ~1500 (±20)
├─ Maximum: ~2000 (±50)
└─ Symmetric: Both directions equal
```

**Common Issues:**

**Inverted channels:**
- Fix in transmitter settings
- Or use Betaflight CLI: `set <channel>_reversed = ON`

**Wrong channel order:**
- Check transmitter channel mapping
- Standard: AETR (Aileron, Elevator, Throttle, Rudder)

---

## PID Tuning Basics

### Default PIDs

The ELCO F7 ships with safe defaults. **First flight with defaults!**

### When to Tune
- ✗ NOT on maiden flight
- ✓ After initial test flights
- ✓ If oscillations present
- ✓ To improve responsiveness
- ✓ To reduce prop wash

### Basic Tuning Approach

**Step 1: Test Defaults**
```
1. Fly with default PIDs
2. Note any issues:
   ├─ Oscillations (bouncing)
   ├─ Sluggish response
   └─ Prop wash wobbles
3. Record Blackbox log
```

**Step 2: Adjust if Needed**

**If oscillating (bouncing):**
```
Reduce P and D gains by 10-20%:
├─ Lower P = Less aggressive
├─ Lower D = Less damping
└─ Test after each change
```

**If sluggish:**
```
Increase P gain by 5-10%:
└─ Higher P = More responsive
```

**If prop wash wobbles:**
```
Increase D gain by 10-20%:
└─ Higher D = Better stabilization
```

### Filtering

**Enable RPM Filtering (Best!):**
```
Requirements:
├─ Bidirectional DShot enabled
├─ ESCs support telemetry
└─ UART4 connected to ESC telemetry

Configuration:
└─ Set: dshot_bidir = ON
    (FC automatically uses RPM data)
```

### PID Tuning Tips

1. **Change one thing at a time**
2. **Test after each change**
3. **Use Blackbox to analyze**
4. **Don't over-tune** (diminishing returns)
5. **Stick with defaults** if flying well

---

## First Flight Checklist

### Pre-Flight Safety Check

```
□ PROPS INSTALLED CORRECTLY
  ├─ Match prop direction to motor spin
  ├─ Tighten prop nuts securely
  └─ Check for cracks/damage

□ BATTERY
  ├─ Fully charged (4.2V per cell)
  ├─ Connector tight (no wiggle)
  ├─ Strapped securely
  └─ Check cell voltage balance

□ HARDWARE
  ├─ All screws tight
  ├─ No loose wires
  ├─ Camera secure
  ├─ VTX antenna installed
  └─ FC mounted securely

□ SOFTWARE
  ├─ FC connects to configurator
  ├─ Receiver shows input
  ├─ ARM switch works
  ├─ Failsafe configured & tested
  └─ Modes assigned correctly

□ FIELD CHECK
  ├─ Receiver range test (50m+)
  ├─ Video feed clear
  ├─ GPS lock (if applicable, 8+ sats)
  └─ Compass heading correct
```

### First Flight Procedure

**Location:**
- Open field
- Soft grass (for crashes)
- No obstacles nearby
- No people/animals

**Steps:**
```
1. Place quad on level ground
2. Connect battery
3. Wait for startup:
   ├─ FC initializes (~5 seconds)
   ├─ GPS lock (if applicable)
   └─ ESCs beep ready tone

4. Arm quad (ARM switch)
   ├─ Check: "ARMED" shows in OSD
   └─ Motors spin slowly (idle)

5. SLOWLY increase throttle
   ├─ Hover at ~50% throttle
   ├─ Test controls:
   │   ├─ Roll left/right
   │   ├─ Pitch forward/back
   │   └─ Yaw left/right
   └─ Feel for vibrations/oscillations

6. If stable:
   ├─ Climb to 2-3m height
   ├─ Hover for 10-20 seconds
   ├─ Test gentle maneuvers
   └─ Land smoothly

7. Disarm and inspect:
   ├─ Check for hot motors/ESCs
   ├─ Verify all screws tight
   └─ Check Blackbox log
```

### If Issues During First Flight

**Immediate disarm if:**
- Uncontrollable
- Violent oscillations
- Wrong direction controls
- Excessive noise/vibration

**Troubleshoot before next attempt**

---

## Post-Flight Analysis

### Blackbox Review

```
1. Download Blackbox log:
   ├─ Blackbox tab
   └─ Save Flash to File

2. Open in Blackbox Explorer

3. Check for:
   ├─ Gyro noise (should be <5-10°/s)
   ├─ PID oscillations
   ├─ Motor output saturation
   └─ Voltage sags

4. Make adjustments based on data
```

### Visual Inspection

```
Post-flight check:
├─ [ ] Props intact (no cracks)
├─ [ ] All screws tight
├─ [ ] No melted wires
├─ [ ] Camera/VTX secure
├─ [ ] Battery connectors OK
└─ [ ] FC/ESCs not excessively hot
```

### Performance Notes

Keep a flight log:
```
Date: ________
Battery: ____S, ____mAh
Flight Time: ____ min
Issues: ___________
Changes Made: ___________
Next Test: ___________
```

---

**Navigation:**
- [← Back: Firmware Setup](./firmware-setup.md)
- [Next: Troubleshooting →](./troubleshooting.md)
- [Return to Index](./README.md)

---

*Last updated: February 2026*
