# Ground Station & Mission Planning

**Document Version:** 1.0.0  
**Last Updated:** February 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Mission Planner (ArduPilot)](#mission-planner-ardupilot)
3. [QGroundControl (PX4/ArduPilot)](#qgroundcontrol-px4ardupilot)
4. [INAV Configurator Missions](#inav-configurator-missions)
5. [Telemetry Setup](#telemetry-setup)
6. [Mission Planning Basics](#mission-planning-basics)

---

## Overview

Ground station software enables:
- Real-time telemetry monitoring
- Mission planning and waypoint navigation
- Parameter configuration
- Flight log analysis
- Autonomous flight operations

### When You Need Ground Station Software

**Required for:**
- ArduPilot autonomous missions
- PX4 complex navigation
- INAV waypoint missions
- Long-range telemetry monitoring

**NOT needed for:**
- Basic Betaflight racing/freestyle
- Manual LOS flying
- Simple FPV flying

---

## Mission Planner (ArduPilot)

### Overview

**Mission Planner** is the primary ground station for ArduPilot.

**Platform:** Windows only (use QGroundControl for Mac/Linux)  
**Download:** https://ardupilot.org/planner/  
**Best For:** ArduPilot configuration and missions

### Installation

```
1. Download: MissionPlanner-latest.msi
2. Run installer (requires .NET Framework)
3. Follow setup wizard
4. Connect FC via USB or telemetry radio
```

### First Connection

```
1. Launch Mission Planner
2. Select COM port (top right)
3. Set baud rate: 115200 (USB) or 57600 (telemetry)
4. Click "Connect"
5. Wait for parameter download (~30 seconds)
```

### Initial Setup Wizard

**Mandatory Hardware:**
```
1. Frame Type
   └─ Select: Quad, X configuration

2. Accelerometer Calibration
   └─ Follow 6-position calibration

3. Compass Calibration
   └─ Large vehicle or traditional method

4. Radio Calibration
   └─ Move all sticks to extremes

5. Flight Modes
   └─ Assign to switches

6. ESC Calibration (if needed)
```

### Flight Data Screen

**Real-time Telemetry:**
- Altitude (AGL/MSL)
- Ground speed
- Air speed (if sensor present)
- Battery voltage/current
- GPS status (satellites, HDOP)
- Attitude (artificial horizon)
- Compass heading
- Flight mode
- Warnings/errors

### Mission Planning

**Create Waypoint Mission:**
```
1. Flight Plan tab
2. Right-click map → Add waypoint
3. Set waypoint parameters:
   ├─ Altitude (meters)
   ├─ Speed (m/s)
   └─ Actions (loiter, RTL, etc.)
4. Upload to FC: Write WPs button
5. Verify in FC
```

**Mission Commands:**
| Command | Function |
|---------|----------|
| TAKEOFF | Auto takeoff to altitude |
| WAYPOINT | Fly to GPS coordinate |
| LOITER_TIME | Circle for N seconds |
| LOITER_TURNS | Circle N times |
| RTL | Return to launch |
| LAND | Auto land at current position |
| DO_SET_SERVO | Trigger servo/relay |
| DO_JUMP | Loop mission |

---

## QGroundControl (PX4/ArduPilot)

### Overview

**QGroundControl** is cross-platform ground station.

**Platform:** Windows, macOS, Linux, Android, iOS  
**Download:** http://qgroundcontrol.com  
**Best For:** PX4 (primary), ArduPilot (alternative)

### Installation

**macOS/Windows:**
```
1. Download installer
2. Run .dmg (Mac) or .exe (Windows)
3. Install normally
4. No additional drivers needed
```

**Linux:**
```
1. Download AppImage
2. Make executable: chmod +x QGroundControl.AppImage
3. Run: ./QGroundControl.AppImage
```

### Vehicle Setup

**PX4 Setup Sequence:**
```
1. Airframe
   └─ Select: Quadrotor X

2. Sensors
   ├─ Compass
   ├─ Gyroscope
   ├─ Accelerometer
   └─ Level Horizon

3. Radio
   └─ Calibrate transmitter

4. Flight Modes
   └─ Assign switches

5. Power
   └─ Battery cells and voltage

6. Safety
   └─ Failsafe actions
```

### Plan View (Mission Planning)

**Create Mission:**
```
1. Plan View (toolbar)
2. Click map to add waypoints
3. Set for each waypoint:
   ├─ Altitude
   ├─ Speed (optional)
   ├─ Camera action
   └─ Other actions
4. Patterns available:
   ├─ Survey (area coverage)
   ├─ Corridor scan
   └─ Structure scan
5. Upload: Upload Required → Yes
```

### Fly View (Real-time)

**Telemetry Display:**
- Video feed integration
- Instrument panel (attitude, altitude, speed)
- Map with home position
- Battery status
- GPS status
- Radio/telemetry link quality

---

## INAV Configurator Missions

### Overview

INAV supports waypoint missions directly in configurator.

**Best For:** Fixed-wing or long-range multirotor missions

### Mission Setup

**Enable Navigation:**
```
1. Configuration tab
2. Features → ☑ GPS
3. Navigation settings:
   ├─ Max navigation speed
   ├─ RTH altitude
   └─ Land speed
```

### Mission Planning Tab

**Create Waypoints:**
```
1. Mission Control tab
2. Right-click map → Add waypoint
3. Configure each:
   ├─ Latitude/Longitude
   ├─ Altitude (meters)
   ├─ Speed (cm/s)
   └─ Action (waypoint, RTH, land)
4. Save mission to FC
5. Activate with WAYPOINT flight mode
```

**Waypoint Types:**
- **WAYPOINT** - Fly to coordinate
- **POSHOLD_TIME** - Hold position for N seconds
- **RTH** - Return to home
- **SET_HEAD** - Point in direction
- **JUMP** - Repeat mission segment

### Safety Settings

```
Mission Settings:
├─ RTH on signal loss: ☑ Enabled
├─ RTH altitude: 50m
├─ Emergency landing: After 60s hover
└─ Geofence: Optional boundary
```

---

## Telemetry Setup

### Telemetry Options

**1. USB Cable (Config only)**
- No flying range
- Used for setup only

**2. Bluetooth Module**
- Short range (~30m)
- Good for field adjustments
- Example: HC-05/HC-06 on UART

**3. Radio Telemetry**
- Long range (1-40km depending on module)
- Best for missions
- Examples: SiK radio, RFD900, DragonLink

**4. RC Link Telemetry**
- Crossfire/ELRS passthrough
- No extra hardware needed
- Good bidirectional link

### SiK Radio Setup

**Hardware Connection:**
```
Air Unit (on drone):
├─ TX → FC RX (UART5)
├─ RX → FC TX (UART5)
├─ 5V → FC 5V
└─ GND → FC GND

Ground Unit:
└─ USB to computer running ground station
```

**Configuration:**
```
1. Set air unit to MAVLink mode
2. Air unit baud: 57600
3. Ground unit baud: 57600
4. FC UART5: Telemetry (MSP or MAVLink)
5. Test connection in ground station
```

### CRSF/ELRS Telemetry

**Uses RC link for telemetry:**
```
Betaflight:
├─ Ports → UART1 = Serial RX
└─ CRSF includes telemetry automatically

Ground Station:
└─ Connect via OpenTX/EdgeTX LUA script
    (Telemetry displayed in radio)
```

---

## Mission Planning Basics

### Pre-Mission Checklist

```
□ Mission uploaded to FC
□ GPS lock achieved (8+ satellites, HDOP <2.0)
□ Home position set
□ Compass calibrated and heading correct
□ Battery fully charged
□ Geofence configured (optional)
□ RTH altitude set above obstacles
□ Failsafe tested (turn off TX)
□ Manual control verified
□ Weather suitable
```

### Safety Guidelines

**Before Autonomous Flight:**
1. Test in manual mode first
2. Verify GPS accuracy (position hold test)
3. Test RTH from short distance
4. Start with simple missions (3-4 waypoints)
5. Always have manual override ready

**During Mission:**
1. Monitor telemetry constantly
2. Watch battery voltage
3. Check GPS status
4. Ready to switch to manual
5. Abort if anything unusual

**Abort Procedures:**
1. Switch to manual mode (immediate control)
2. Or activate RTH (return home)
3. Or trigger failsafe (land)

---

### Example Missions

**Simple Perimeter Mission:**
```
Waypoint 1: Takeoff to 20m
Waypoint 2: Fly to corner 1 (50m away)
Waypoint 3: Fly to corner 2 (50m away)
Waypoint 4: Fly to corner 3 (50m away)
Waypoint 5: Fly to corner 4 (50m away)
Waypoint 6: Return to launch
Waypoint 7: Land

Speed: 5 m/s
Altitude: 20m constant
```

**Survey Pattern:**
```
Use QGC Survey:
├─ Define polygon area
├─ Set altitude: 30m
├─ Camera overlap: 80%
├─ Pattern: Back-and-forth
└─ Auto-generates waypoints
```

---

## Advanced Features

### Geofence

**Purpose:** Virtual boundary that keeps drone within area

**Setup (ArduPilot):**
```
1. Config → GeoFence
2. Enable: ☑ Enabled
3. Type: Cylinder
4. Radius: 500m (example)
5. Max altitude: 100m
6. Action: RTH or Land
```

### Rally Points

**Purpose:** Alternative return points (not just home)

**Use Cases:**
- Obstacle avoidance on RTH
- Multiple safe landing zones
- Competition requirements

### Do-Set-Servo Actions

**Purpose:** Trigger devices during mission

**Examples:**
- Deploy payload
- Activate camera
- Drop object
- Trigger relay

---

## Troubleshooting

### No GPS Lock

```
Causes:
├─ Insufficient satellites (<8)
├─ Poor HDOP (>2.0)
├─ Interference (indoors, under trees)
└─ Compass interference

Solutions:
├─ Move to open area
├─ Wait longer (can take 2-5 minutes)
├─ Check compass orientation
└─ Move away from metal/electronics
```

### Mission Not Uploading

```
Causes:
├─ No telemetry connection
├─ Insufficient memory on FC
└─ Protocol mismatch

Solutions:
├─ Verify connection
├─ Reduce waypoints
└─ Check MAVLink/MSP protocol setting
```

### Drone Doesn't Follow Waypoints

```
Causes:
├─ GPS accuracy poor
├─ Navigation mode not active
├─ Parameters incorrect
└─ Wind too strong

Solutions:
├─ Wait for better GPS (HDOP <2.0)
├─ Verify flight mode
├─ Check navigation parameters
└─ Fly in calmer conditions
```

---

**Navigation:**
- [← Back: First Time Setup](./first-time-setup.md)
- [Return to Index](./README.md)

---

*Last updated: February 2026*
