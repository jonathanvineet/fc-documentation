# Firmware Setup & Configuration

**Document Version:** 1.0.0  
**Hardware Revision:** Rev 1.2  
**Last Updated:** February 2026

---

## Table of Contents

1. [Firmware Options](#firmware-options)
2. [Betaflight Setup](#betaflight-setup)
3. [INAV Setup](#inav-setup)
4. [ArduPilot Setup](#ardupilot-setup)
5. [PX4 Setup](#px4-setup)
6. [CLI Commands Reference](#cli-commands-reference)
7. [Backup & Restore](#backup--restore)
8. [Recovery Procedures](#recovery-procedures)

---

## Firmware Options

The ELCO F7 Ultimate is compatible with multiple firmware options:

| Firmware | Best For | Supported Features | Min Version |
|----------|----------|-------------------|-------------|
| **Betaflight** | Racing, Freestyle | Full support, BMI270, 8kHz PID | 4.3.0+ |
| **INAV** | Long Range, GPS, Autonomous | GPS navigation, waypoints | 7.0.0+ |
| **ArduPilot** | Research, Advanced missions | Complex missions, dual GPS | 4.3.0+ |
| **PX4** | Research, Development | ROS integration, MAVROS | 1.14.0+ |

### Recommended: Betaflight

For most users (racing/freestyle), Betaflight offers:
- Best flight performance
- Extensive tuning options
- Large community support
- Easy configurator interface
- Regular updates

---

## Betaflight Setup

### Prerequisites

- [ ] **Betaflight Configurator** 10.10+ ([Download](https://github.com/betaflight/betaflight-configurator/releases))
- [ ] **USB-C cable** (data capable, not charge-only)
- [ ] **Zadig** (Windows only, for driver installation)
- [ ] **Props removed** (safety first!)

---

### Step 1: Install Betaflight Configurator

#### Windows
1. Download `betaflight-configurator-installer_X.X.X_win32.exe`
2. Run installer
3. Follow installation wizard
4. Open Betaflight Configurator

**Driver Installation (Windows only):**
```
If FC not recognized:
1. Download Zadig (https://zadig.akeo.ie/)
2. Connect FC via USB
3. Run Zadig
4. Select "STM32 Virtual COM Port"
5. Install WinUSB driver
6. Restart Configurator
```

#### macOS
1. Download `betaflight-configurator_X.X.X_macOS.dmg`
2. Open DMG file
3. Drag Betaflight Configurator to Applications
4. Open from Applications (right-click → Open first time)
5. No driver needed!

#### Linux
1. Download `betaflight-configurator_X.X.X_amd64.deb` (Debian/Ubuntu)
   - Or `.rpm` for Red Hat/Fedora
2. Install package: `sudo dpkg -i betaflight-configurator*.deb`
3. Add user to dialout group: `sudo usermod -a -G dialout $USER`
4. Logout and login
5. Run: `betaflight-configurator`

---

### Step 2: Flash Firmware

#### Connect FC in DFU Mode

**Method 1: Boot Button**
1. Disconnect FC from power
2. Locate BOOT pad on bottom of FC
3. Short BOOT pad to GND with tweezers
4. While holding short, connect USB-C
5. Release short after 2 seconds
6. FC is now in DFU mode (no LED blinking)

**Method 2: CLI Command**
1. Connect FC normally via USB
2. Open Betaflight Configurator
3. Connect to FC
4. Open CLI tab
5. Type: `bl`
6. Press Enter
7. FC reboots into DFU mode

#### Flash Process

1. **In Configurator:**
   ```
   1. Click "Firmware Flasher" (left sidebar)
   2. Verify DFU mode: Shows "DFU - STM32 BOOTLOADER"
   3. Select Target: ELCOF7
   4. Select Version: 4.5.0 (or latest stable)
   5. Options:
      ☑ Full Chip Erase (recommended for first flash)
      ☑ Flash on connect (optional)
      ☐ No reboot sequence (leave unchecked)
   6. Click "Load Firmware [Online]"
   7. Wait for download (~2-5 seconds)
   8. Click "Flash Firmware"
   9. Wait for completion (~30 seconds)
   10. Success! FC reboots automatically
   ```

2. **Verify Flash:**
   - FC LED blinks after reboot
   - Configurator shows "Serial Port" available
   - Connect and verify in Setup tab

#### Troubleshooting Flash Issues

**"No DFU devices detected":**
- Windows: Install Zadig driver
- Check USB cable (must support data)
- Try different USB port
- Ensure BOOT shorted to GND properly

**"Failed to flash":**
- Try "Full Chip Erase"
- Use older Configurator version
- Download firmware manually and flash local

---

### Step 3: Initial Configuration

#### Setup Tab

1. **Connect to FC:**
   - Select COM port
   - Baud rate: Auto
   - Click "Connect"

2. **Calibrate Accelerometer:**
   ```
   1. Place FC on level surface
   2. Click "Calibrate Accelerometer"
   3. Wait for completion (5 seconds)
   4. Do NOT move FC during calibration
   ```

3. **Verify Sensor Orientation:**
   - Pitch FC forward → model pitches forward ✓
   - Roll FC right → model rolls right ✓
   - Yaw FC right → model yaws right ✓
   
   If incorrect, check IMU alignment in Configuration tab.

---

#### Ports Tab

Configure UARTs for your peripherals:

```
Default Configuration:

UART1:
├─ Serial RX: ☑ Enabled
└─ Used for: Receiver (SBUS/CRSF/ELRS)

UART2:
├─ VTX (MSP + Displayport): ☑ Enabled
└─ Used for: SmartAudio or Tramp VTX control

UART3:
├─ GPS: ☑ Enabled (if GPS connected)
└─ Used for: GPS module

UART4:
├─ ESC Sensor: ☑ Enabled (optional)
└─ Used for: ESC telemetry (BLHeli_32)

UART5:
└─ Available for custom use

UART6:
└─ Available for custom use
```

**Click "Save and Reboot" after changes**

---

#### Configuration Tab

##### Receiver Configuration

**For CRSF/ELRS:**
```
Receiver:
├─ Receiver Mode: Serial-based receiver
├─ Serial Receiver Provider: CRSF
├─ Stick Commands: ☑ Enabled
└─ Telemetry: Auto (enabled)
```

**For SBUS:**
```
Receiver:
├─ Receiver Mode: Serial-based receiver
├─ Serial Receiver Provider: SBUS
├─ SBUS Inversion: Auto (FC handles this)
└─ Telemetry: Off (SBUS is one-way)
```

**For iBUS:**
```
Receiver:
├─ Receiver Mode: Serial-based receiver
└─ Serial Receiver Provider: IBUS
```

##### Motor/ESC Protocol

```
ESC/Motor Features:
├─ ESC/Motor Protocol: DSHOT600
│   (DSHOT300 for older ESCs)
├─ Motor PWM Rate: Not applicable (DShot)
├─ Enable Motor Output: ☑ Enabled
└─ Bidirectional DShot: ☑ (if ESCs support it)
    └─ Enables RPM-based filtering (excellent)
```

**Motor Direction:**
- Set to "Normal" (default)
- If motors spin wrong way, change in BLHeli Configurator

##### Other Settings

```
System Configuration:
├─ Gyro Update Frequency: 8kHz
├─ PID Loop Frequency: 8kHz (or 4kHz for slower FC)
└─ CPU Usage: Should be <50% (check System tab)

Features:
├─ ☑ OSD (On-Screen Display)
├─ ☑ TELEMETRY (for CRSF/SmartPort)
├─ ☑ LED_STRIP (if using LEDs)
├─ ☑ GPS (if GPS connected)
├─ ☑ BLACKBOX (always recommended)
└─ ☐ SOFTSERIAL (usually not needed)

Blackbox:
├─ Blackbox Logging Device: Onboard Flash
└─ Sample Rate: 2kHz (1kHz for longer logs)
```

**Click "Save and Reboot"**

---

#### Motors Tab

> ⚠️ **WARNING: REMOVE PROPS BEFORE MOTOR TEST!**

**Motor Order Verification:**
```
1. ☑ Enable "I understand the risks" checkbox
2. Slowly increase Master slider to ~15%
3. Test each motor individually:
   ├─ M1: Front Right (clockwise)
   ├─ M2: Back Right (counter-clockwise)
   ├─ M3: Back Left (clockwise)
   └─ M4: Front Left (counter-clockwise)

4. Verify motor spin direction:
   ┌─────────┐
   │  4 ←↑→ 1│  (arrows show spin direction)
   │    ↓ ↑  │
   │  3 ←↓→ 2│
   └─────────┘
```

**If motor spins wrong direction:**
- Use BLHeli Configurator to reverse direction
- Or swap any 2 motor wires

**Motor Order Wrong?**
- Check ESC wiring to FC
- Re-map in CLI: `resource motor 1 B07` (example)

---

#### Receiver Tab

**Bind Receiver:**
```
For ELRS:
1. Put RX in bind mode (button or via FC)
2. Put TX in bind mode
3. Wait for bind success
4. Power cycle

For Crossfire:
1. Bind via Crossfire LUA script in radio
```

**Verify Stick Inputs:**
```
1. Move sticks on transmitter
2. Watch bars move in Receiver tab
3. Verify correct channels:
   ├─ Roll:     AUX1 (Channel 0)
   ├─ Pitch:    AUX2 (Channel 1)
   ├─ Throttle: AUX3 (Channel 2)
   ├─ Yaw:      AUX4 (Channel 3)
   └─ AUX1-8:   Switches (Channel 4-11)

4. Check range: ~1000-2000 (should be symmetrical)
5. Center sticks: Should show ~1500
```

**If channels wrong:**
- Remap in transmitter
- Or use Channel Map in CLI

---

#### Modes Tab

**Configure Flight Modes:**

```
Essential Modes:

ARM (Required):
├─ Link to: AUX1 (switch)
├─ Range: 1300-2100 (switch high position)
└─ Test: Arm switch, verify "ARMED" in top right

ANGLE (Beginner):
├─ Link to: AUX2
├─ Range: 1300-2100
└─ Stabilized flight (auto-levels)

HORIZON (Intermediate):
├─ Link to: AUX2
├─ Range: 1700-2100
└─ Auto-levels when sticks centered

ACRO (Expert):
├─ No mode needed
└─ Default (when ANGLE/HORIZON off)

Optional Modes:

BEEPER (Lost Model):
├─ Link to: AUX3
└─ Activates buzzer

BLACKBOX:
├─ Link to: AUX4
└─ Start/stop logging (or always on)

FLIP OVER AFTER CRASH:
├─ Link to: AUX5 (3-position)
├─ Range: 1700-2100
└─ Motor reversal for turtle mode

GPS RESCUE (if GPS):
├─ Link to: AUX6
└─ Return to home
```

**Verify Modes:**
- Toggle switches on TX
- Watch mode indicators activate in Modes tab
- Test ARM mode (props off!)

---

#### OSD Tab

**Configure On-Screen Display:**

```
Recommended OSD Elements:

Essential:
├─ Craft Name
├─ Battery Voltage (with alarm)
├─ Flight Time
├─ Armed status
├─ RSSI / Link Quality
└─ Warnings

Performance:
├─ Throttle position
├─ Current draw
├─ mAh used
└─ GPS info (if applicable)

Position on screen (drag elements):
├─ Warnings: Top center
├─ Voltage: Top right
├─ RSSI: Top left
└─ Others: As preferred
```

**Voltage Alarm:**
- Set to 3.5V per cell
- 4S: 14.0V warning
- Displays when battery low

---

#### PID Tuning Tab

**Default PIDs (Starting Point):**

The ELCO F7 ships with safe default PIDs. For first flight:
- Leave defaults unchanged
- Fly to test
- Adjust only if needed

**If you want to tune (advanced):**
```
Typical 5" Quad PIDs:

Roll:
├─ P: 45-55
├─ I: 85-95
├─ D: 35-45
└─ FF: 60-80

Pitch:
├─ P: 48-58
├─ I: 90-100
├─ D: 38-48
└─ FF: 65-85

Yaw:
├─ P: 35-45
├─ I: 90-100
├─ D: 0
└─ FF: 70-90
```

**Filtering:**
- Use default filter settings initially
- Enable RPM-based filtering if using bidirectional DShot
- Adjust only after blackbox analysis

---

#### Failsafe Tab

**Configure Failsafe (Critical!):**

```
Failsafe Procedure:
├─ Stage 1: Land (default)
│   └─ Gradually decrease throttle
│
└─ Stage 2: Drop (after 10s)
    └─ Cut motors immediately

Settings:
├─ Throttle Low Delay: 300 (3 seconds)
├─ Throttle: 1000 (motors off)
└─ Test failsafe: Turn off TX, verify behavior
```

**GPS Rescue Failsafe (if GPS):**
```
Alternative to landing:
├─ Enable: GPS Rescue mode
├─ Behavior: Return to home and land
└─ Requires: Good GPS lock (8+ satellites)
```

---

### Step 4: Pre-Flight Checks

```
Before First Flight Checklist:

Hardware:
├─ [ ] All screws tight
├─ [ ] Props installed correctly (check direction!)
├─ [ ] Battery secured
├─ [ ] Antenna installed on VTX
├─ [ ] Camera angle adjusted
└─ [ ] No loose wires

Software:
├─ [ ] FC connects to configurator
├─ [ ] Receiver shows input (Receiver tab)
├─ [ ] Motors spin correct direction (props off!)
├─ [ ] ARM switch works
├─ [ ] Failsafe tested
├─ [ ] OSD visible in goggles
└─ [ ] Modes configured correctly

Field Check:
├─ [ ] Bind check (cycle power)
├─ [ ] Range check (walk 50m, verify control)
├─ [ ] Compass calibration (if GPS)
└─ [ ] Video check (goggles clear)
```

---

## INAV Setup

### Use Case

INAV is ideal for:
- Long-range flying
- GPS navigation
- Waypoint missions
- Position hold
- Return to home

### Download INAV Configurator

- Link: https://github.com/iNavFlight/inav-configurator/releases
- Minimum version: 7.0.0
- Target: **ELCOF7** (same as Betaflight)

### Key Differences from Betaflight

```
INAV-Specific Features:
├─ GPS Navigation (full support)
├─ Waypoint missions
├─ Position Hold
├─ Return to Launch
├─ Altitude Hold (baro-based)
└─ Fixed-wing support

Configuration Differences:
├─ More complex setup (GPS, compass, modes)
├─ Different PID structure
├─ Navigation modes (POSHOLD, RTH, WP)
└─ More failsafe options
```

### Quick INAV Setup

1. **Flash INAV firmware:**
   - Target: ELCOF7
   - Version: 7.0+ 

2. **Configure GPS (Required):**
   ```
   Ports Tab:
   └─ UART3: GPS (UBX protocol recommended)

   Configuration Tab:
   └─ Enable: GPS, MAG (if compass present)
   ```

3. **Calibrate Compass:**
   ```
   Setup Tab → Calibrate Magnetometer
   ├─ Rotate FC in all axes
   └─ Follow on-screen instructions
   ```

4. **Configure Navigation:**
   ```
   Navigation Tab:
   ├─ RTH Altitude: 50m (adjust for location)
   ├─ Max Navigation Speed: 10 m/s
   ├─ RTH Behavior: Land
   └─ Failsafe: GPS Rescue
   ```

5. **Test GPS Lock:**
   - Go outside (clear sky view)
   - Wait for GPS lock (8+ satellites)
   - Verify position on map

For detailed INAV setup, see: https://github.com/iNavFlight/inav/wiki

---

## ArduPilot Setup

### Overview

ArduPilot provides:
- Research-grade flight control
- Complex mission planning
- Dual GPS support
- Advanced telemetry
- ROS integration

### Requirements

- **Mission Planner** (Windows) or **QGroundControl** (cross-platform)
- USB connection for initial setup
- Telemetry radio for field operation (optional)

### Installation

1. **Download ArduPilot firmware:**
   - Link: https://firmware.ardupilot.org
   - Select: ChibiOS → STM32F7 → ELCOF7 target
   - Download: arducopter.apj file

2. **Flash using Mission Planner:**
   ```
   1. Connect FC via USB
   2. Open Mission Planner
   3. Initial Setup → Install Firmware
   4. Select "Quad" (or your frame type)
   5. Upload Custom Firmware → select arducopter.apj
   6. Wait for flash completion
   ```

3. **Mandatory Hardware:**
   - Compass (external recommended)
   - GPS module
   - Telemetry radio (SiK/RFD900)

4. **Initial Setup Wizard:**
   ```
   Mission Planner walks through:
   ├─ Frame selection
   ├─ Accelerometer calibration
   ├─ Compass calibration (6-point or large vehicle)
   ├─ Radio calibration
   ├─ Flight mode setup
   └─ ESC calibration
   ```

For complete ArduPilot documentation: https://ardupilot.org/copter/

---

## PX4 Setup

### Overview

PX4 is designed for research and professional applications:
- ROS/ROS2 integration
- MAVLink protocol
- MAVROS support
- Simulation (Gazebo)

### Requirements

- **QGroundControl** (all platforms)
- External compass required
- GPS module required

### Installation

1. **Download PX4 firmware:**
   - Link: https://github.com/PX4/PX4-Autopilot/releases
   - Target: May need custom build for ELCOF7

2. **Flash via QGroundControl:**
   ```
   1. Connect FC via USB
   2. Open QGroundControl
   3. Vehicle Setup → Firmware
   4. Select "PX4 Flight Stack"
   5. Select version: Stable
   6. Click OK to flash
   ```

3. **Sensor Calibration:**
   - Compass
   - Gyroscope
   - Accelerometer
   - Level Horizon

4. **Radio Setup:**
   - Calibrate sticks
   - Map flight modes

For PX4 documentation: https://docs.px4.io

---

## CLI Commands Reference

### Useful Betaflight CLI Commands

**Backup Configuration:**
```
# Dump entire config
dump

# Save to file: Copy output and save as .txt
```

**Restore Configuration:**
```
# Paste saved dump into CLI
# Type 'save' at the end
```

**View Specific Settings:**
```
# Show all serial port settings
get serialrx

# Show PID values
get pid

# Show rates
get rates
```

**Common Modifications:**
```
# Change receiver protocol
set serialrx_provider = CRSF

# Enable bidirectional DShot
set dshot_bidir = ON

# Change motor protocol
set motor_pwm_protocol = DSHOT600

# Set craft name (OSD)
set craft_name = MyQuad
```

**After changes:**
```
save
# FC reboots with new settings
```

---

## Backup & Restore

### Full Configuration Backup

**Method 1: CLI Dump**
```
1. Connect to FC in Configurator
2. Open CLI tab
3. Type: dump
4. Press Enter
5. Select all text (Ctrl+A / Cmd+A)
6. Copy to clipboard
7. Paste into text editor
8. Save as: ELCOF7_backup_2026-02-13.txt
```

**Method 2: Configurator Preset**
```
1. Presets tab
2. Click "Create Preset"
3. Save to file
```

### Restore Configuration

```
1. Flash firmware (if needed)
2. Connect to FC
3. Open CLI
4. Paste entire backup dump
5. Type: save
6. FC reboots with restored config
```

### Blackbox Backup

```
1. Connect FC via USB
2. Open Blackbox tab
3. Click "Save Flash to File"
4. Select save location
5. Analyze logs in Blackbox Explorer
```

---

## Recovery Procedures

### Procedure 1: FC Not Connecting

**Symptoms:**
- No COM port appears
- Configurator doesn't detect FC

**Solutions:**
```
1. Check USB cable (must support data)
2. Try different USB port
3. Install drivers (Windows: Zadig)
4. Reboot computer
5. Try different computer
```

### Procedure 2: DFU Recovery

**When:** FC bricked, won't boot normally

**Steps:**
```
1. Enter DFU mode:
   └─ Short BOOT to GND, connect USB
2. Open Configurator → Firmware Flasher
3. Enable "Full Chip Erase"
4. Flash latest firmware
5. FC recovers to factory state
```

### Procedure 3: Lost Configuration

**If settings corrupted:**
```
1. Flash firmware (erases config)
2. Go through initial setup again
3. Or restore from backup (CLI dump)
```

### Procedure 4: Gyro Not Detected

**Symptoms:**
- "Gyro not found" error
- FC boots but no stabilization

**Solutions:**
```
1. Reflash firmware
2. Check for hardware damage
3. Try older firmware version
4. Contact support if hardware issue
```

### Procedure 5: Motor Won't Spin

**Troubleshooting:**
```
1. Check: Are you armed? (ARM mode active)
2. Check: Props removed? (safety switch in Motors tab)
3. Check: Motor protocol (must match ESC)
4. Check: ESC signal ground connected
5. Check: Motor output enabled in Configuration
6. Test: Individual motors in Motors tab
```

---

**Navigation:**
- [← Back: Wiring Guide](./wiring-guide.md)
- [Next: First Time Setup →](./first-time-setup.md)
- [Return to Index](./README.md)

---

*Last updated: February 2026 | Firmware: Betaflight 4.5+*
