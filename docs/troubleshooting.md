# Troubleshooting & FAQ

**Document Version:** 1.0.0  
**Last Updated:** February 2026

---

## Table of Contents

1. [Quick Troubleshooting Guide](#quick-troubleshooting-guide)
2. [Connection Issues](#connection-issues)
3. [Sensor Problems](#sensor-problems)
4. [Motor & ESC Issues](#motor--esc-issues)
5. [Receiver Problems](#receiver-problems)
6. [Video/OSD Issues](#videoosd-issues)
7. [Flight Performance Problems](#flight-performance-problems)
8. [Frequently Asked Questions](#frequently-asked-questions)

---

## Quick Troubleshooting Guide

### Symptom-Based Diagnosis

| Symptom | Likely Cause | Quick Fix | Section |
|---------|--------------|-----------|---------|
| FC won't power on | No power/wrong polarity | Check VBAT connection | [Connection](#connection-issues) |
| No USB connection | Driver/cable issue | Install drivers, try new cable | [Connection](#connection-issues) |
| "Gyro not found" | Firmware/hardware issue | Reflash firmware | [Sensors](#sensor-problems) |
| Motors won't spin | Not armed/protocol wrong | Check ARM mode, DShot setting | [Motors](#motor--esc-issues) |
| No receiver input | Not bound/wrong UART | Rebind, check Ports tab | [Receiver](#receiver-problems) |
| No OSD | Video connection issue | Check VI/VO wiring | [Video](#videoosd-issues) |
| Violent oscillations | PID tuning issue | Lower P&D gains | [Flight](#flight-performance-problems) |
| FC resets in flight | BEC overload | Reduce 5V load | [Power](#power-issues) |

---

## Connection Issues

### Problem: FC Won't Power On

**Symptoms:**
- No LED light
- No beeps
- No USB connection

**Diagnosis:**
```
1. Check battery voltage:
   ├─ Use multimeter
   ├─ Should be 7.4V+ (2S minimum)
   └─ If <3V per cell: Battery dead

2. Check polarity:
   ├─ VBAT+ to positive (red)
   ├─ GND to negative (black)
   └─ If reversed: May have damaged FC

3. Check solder joints:
   ├─ VBAT+ pad
   ├─ GND pad
   └─ Look for cold joints

4. Test with USB:
   └─ If works on USB but not battery:
      Power circuit issue
```

**Solutions:**
- Verify VBAT voltage with multimeter
- Check for short circuits (resistance test)
- Inspect reverse polarity protection (P-FET)
- Contact support if hardware damage

---

### Problem: No USB Connection / Not Recognized

**Symptoms:**
- Configurator doesn't see FC
- No COM port appears
- "Device not recognized" error

**Solutions by OS:**

**Windows:**
```
1. Install USB drivers:
   ├─ Download Zadig (zadig.akeo.ie)
   ├─ Connect FC via USB
   ├─ Open Zadig
   ├─ Select "STM32 Virtual COM Port"
   ├─ Install WinUSB driver
   └─ Restart Configurator

2. Check Device Manager:
   ├─ Look for "Ports (COM & LPT)"
   ├─ Should show "USB Serial Device (COMx)"
   └─ If yellow exclamation: Driver issue

3. Try different USB port:
   └─ USB 2.0 ports sometimes work better
```

**macOS:**
```
1. Check System Report:
   ├─ Apple Menu → About This Mac
   ├─ System Report → USB
   └─ Look for "STM32" device

2. Grant permissions:
   ├─ System Preferences → Security & Privacy
   └─ Allow Betaflight Configurator

3. No drivers needed on macOS!
```

**Linux:**
```
1. Add user to dialout group:
   └─ sudo usermod -a -G dialout $USER

2. Log out and log back in

3. Check permissions:
   └─ ls -l /dev/ttyUSB* or /dev/ttyACM*

4. Install udev rules (if needed)
```

**Still not working?**
- Try different USB cable (must support data!)
- Test on different computer
- Enter DFU mode and reflash firmware

---

## Sensor Problems

### Problem: "Gyro Not Detected" Error

**Symptoms:**
- Betaflight shows "Gyro not found"
- Can't arm
- No stabilization

**Causes:**
- Firmware incompatibility (BMI270 needs BF 4.3+)
- Corrupted flash
- Hardware failure

**Solutions:**
```
1. Verify firmware version:
   ├─ Setup tab → Version info
   └─ Must be 4.3.0 or newer for BMI270

2. Reflash firmware:
   ├─ Enter DFU mode
   ├─ Enable "Full Chip Erase"
   ├─ Flash Betaflight 4.5+
   └─ Target: ELCOF7

3. Check CLI for errors:
   ├─ Type: status
   └─ Look for gyro-related errors

4. If still fails:
   └─ Hardware issue - contact support
```

---

### Problem: Accelerometer Calibration Fails

**Symptoms:**
- "Calibration failed" error
- Model tilts in Setup tab
- Auto-level doesn't work

**Solutions:**
```
1. Ensure level surface:
   ├─ Use spirit level
   ├─ Table must be perfectly flat
   └─ No vibrations during calibration

2. FC must be still:
   ├─ Don't touch during calibration
   ├─ No fans blowing nearby
   └─ Wait full 5 seconds

3. Verify gyro is working:
   ├─ Tilt FC in Setup tab
   └─ Model should respond

4. Try CLI calibration:
   ├─ Type: calibrate acc
   └─ Press Enter
```

---

### Problem: Barometer Reading Incorrect

**Symptoms:**
- Altitude drifts significantly
- Altitude hold doesn't work (INAV)
- Pressure readings seem wrong

**Solutions:**
```
1. Ensure baro not covered:
   ├─ DPS310 has small hole on chip
   └─ Don't cover with hot glue or tape

2. Recalibrate baro:
   ├─ Power cycle FC
   ├─ Baro calibrates on boot
   └─ Wait 30 seconds after power-on

3. Check for air leaks:
   └─ FC must not be in sealed enclosure

4. Temperature compensation:
   └─ Baro affected by temperature changes
      (Normal behavior)
```

---

## Motor & ESC Issues

### Problem: Motors Won't Spin

**Symptoms:**
- Motors don't spin in Motors tab
- No response when armed
- ESCs not beeping

**Diagnosis Checklist:**
```
□ Props removed? (Safety first!)
□ FC armed? (ARM mode active)
□ Motor test enabled? (Check checkbox in Motors tab)
□ ESC protocol correct? (DShot600 recommended)
□ ESC ground connected? (Critical for DShot!)
□ Motor outputs enabled? (Configuration tab)
□ Battery connected? (USB alone won't power motors)
```

**Solutions:**
```
1. Verify ARM status:
   ├─ Top right should show "ARMED"
   ├─ Check ARM mode in Modes tab
   └─ Test ARM switch

2. Check motor protocol:
   ├─ Configuration → ESC/Motor Protocol
   ├─ Set to DSHOT600 (or DSHOT300)
   └─ Save and reboot

3. Verify ESC ground:
   ├─ ESC signal ground MUST connect to FC GND
   └─ DShot requires common ground

4. Check motor output:
   ├─ Configuration → Motor Idle Throttle Value
   ├─ Should be 4.5-5.5%
   └─ If 0%, motors may not init

5. Test ESC bypass:
   └─ Connect ESC signal directly to receiver
      (If motors work: FC issue)
```

---

### Problem: Wrong Motor Spin Direction

**Symptoms:**
- Motors spin wrong way (CW instead of CCW)
- Quad flips on takeoff
- Reverse controls

**Solutions:**
```
Method 1: BLHeli Configurator (Preferred)
1. Download BLHeli Configurator
2. Connect FC via USB (battery connected)
3. "Read Setup" from ESCs
4. Select motor to reverse
5. Click "Reverse" button
6. Write setup
7. Test motor direction

Method 2: Motor Wire Swap
1. Disconnect battery
2. Swap ANY 2 of the 3 motor wires
3. Reconnect battery
4. Test direction
5. Secure wires
```

**Motor Direction Reference:**
```
      Front
   M4  ↻ ↺  M1    ↻ = Counter-clockwise
     ╲    ╱       ↺ = Clockwise
      ╲  ╱
      ╱  ╲
     ╱    ╲
   M3  ↺ ↻  M2
```

---

### Problem: ESCs Continuously Beeping

**Symptoms:**
- ESCs beep constantly
- Motors won't spin
- Beeping doesn't stop

**Meanings:**
```
Continuous beeps = ESC not receiving signal

Causes:
├─ Motor protocol mismatch
├─ ESC signal ground not connected
├─ Wrong ESC firmware
└─ Damaged ESC
```

**Solutions:**
```
1. Check motor protocol:
   ├─ BLHeli_S: DShot150/300/600
   ├─ BLHeli_32: DShot300/600/1200
   └─ Match in Betaflight Configuration

2. Verify signal ground:
   └─ ESC GND → FC GND (required!)

3. Flash ESC firmware:
   ├─ Use BLHeli Configurator
   ├─ Update to latest BLHeli_32
   └─ DShot support built-in

4. Test one ESC at a time:
   └─ Isolate faulty ESC
```

---

## Receiver Problems

### Problem: No Receiver Input

**Symptoms:**
- Receiver tab shows no channel movement
- Sticks don't respond
- "No RX" in OSD

**Step-by-Step Diagnosis:**
```
1. Check receiver power:
   ├─ Receiver LED on? (green/blue usually)
   └─ If off: Check 5V and GND connections

2. Verify bind:
   ├─ Receiver bound to transmitter?
   ├─ Transmitter on?
   └─ Receiver in correct mode (SBUS/CRSF)?

3. Check UART configuration:
   ├─ Ports tab → UART1 = Serial RX
   ├─ Configuration tab → Serial Receiver Provider
   └─ Must match receiver type (SBUS/CRSF/IBUS)

4. Verify wiring:
   ├─ RX on receiver → TX on FC? ❌ WRONG!
   ├─ TX on receiver → RX on FC? ✓ CORRECT!
   └─ Remember: TX → RX, RX → TX

5. Test in CLI:
   ├─ Type: rxrange
   └─ Should show values changing when moving sticks
```

---

### Problem: Receiver Range Issues

**Symptoms:**
- Failsafe activates nearby
- Control loss at short distance
- RSSI drops quickly

**Solutions:**
```
1. Antenna placement:
   ├─ Not blocked by carbon fiber
   ├─ Vertical orientation (perpendicular to TX)
   └─ Away from VTX/power wires

2. Check TX power:
   ├─ ELRS: 100mW-1W
   ├─ Crossfire: 25mW-2W
   └─ Ensure correct power setting

3. Receiver firmware:
   ├─ Update to latest
   └─ Match TX firmware version (ELRS)

4. Interference sources:
   ├─ Separate RX from VTX
   ├─ Use filtered power
   └─ Check for ground loops

5. Range test before flying:
   └─ Walk 100m, verify control
```

---

## Video/OSD Issues

### Problem: No OSD Display

**Symptoms:**
- Video feed OK, but no OSD overlay
- No battery voltage, etc.
- Blank screen

**Solutions:**
```
1. Enable OSD feature:
   ├─ Configuration tab
   ├─ Other Features → ☑ OSD
   └─ Save and reboot

2. Check OSD tab:
   ├─ Elements enabled?
   ├─ Positioned on screen?
   └─ Preview should show overlay

3. Verify video connections:
   ├─ Camera → FC VI pad
   ├─ FC VO pad → VTX
   └─ Good solder joints?

4. Check video standard:
   ├─ Camera: PAL or NTSC?
   ├─ OSD auto-detects
   └─ Power cycle if just changed camera

5. Test camera direct to VTX:
   └─ If works without FC: OSD chip issue
```

---

### Problem: Noisy/Snowy Video

**Symptoms:**
- Lines in video
- Static/snow
- Interference patterns

**Causes:**
- EMI from motors/ESC
- Ground loops
- Poor shielding

**Solutions:**
```
1. Check video ground:
   ├─ Camera GND → FC GND
   ├─ VTX GND → FC GND
   └─ All same ground reference

2. Add filtering:
   ├─ Capacitor (1000µF) on VBAT
   ├─ LC filter on camera power
   └─ Ferrite beads on motor wires

3. Separate analog/digital:
   ├─ Camera on 9V (not 5V with RX)
   ├─ Reduce ground loops
   └─ Twisted pair for video cable

4. Check interference:
   ├─ Move VTX antenna away from FC
   ├─ Shield video cable
   └─ Test video with props off vs spinning
```

---

## Flight Performance Problems

### Problem: Oscillations / Bouncing

**Symptoms:**
- Quad shakes/bounces
- High-pitched noise
- Hot motors
- Poor video (jello)

**Types:**

**High-frequency oscillation (>100Hz):**
```
Cause: P too high or D too low
Fix:
├─ Reduce P gain by 10-20%
├─ Increase D gain by 10%
└─ Test incrementally
```

**Low-frequency wobble (<20Hz):**
```
Cause: I too high or P too low
Fix:
├─ Reduce I gain
├─ Increase P gain slightly
└─ Check prop balance
```

**Mid-throttle oscillation:**
```
Cause: Prop wash, D gain too low
Fix:
├─ Increase D gain by 20%
├─ Enable RPM filtering
└─ Increase D setpoint weight
```

---

### Problem: Sluggish Response

**Symptoms:**
- Slow to respond to sticks
- Feels "mushy"
- Can't do tight maneuvers

**Solutions:**
```
1. Increase P gain:
   └─ Add 5-10% at a time

2. Increase rates:
   ├─ Rates tab → Increase rates
   └─ Higher = faster rotation

3. Reduce filtering:
   ├─ Lower gyro filter cutoff
   └─ (Only if noise acceptable)

4. Check weight:
   └─ Overweight quad = sluggish
```

---

### Problem: Won't Arm

**Symptoms:**
- ARM switch doesn't work
- Error beeps
- "ARMING DISABLED" in OSD

**Common Causes:**
```
Check CLI for ARM disable reasons:
└─ Type: status

Common reasons:
├─ NOGYRO (gyro not detected)
├─ FAILSAFE (receiver not connected)
├─ RXLOSS (no RX signal)
├─ BADBATT (voltage too low)
├─ LOAD (CPU overload)
└─ CRASH (accelerometer sees impact)
```

**Solutions:**
```
Each error has specific fix:

NOGYRO:
└─ Reflash firmware

FAILSAFE/RXLOSS:
└─ Fix receiver connection

BADBATT:
├─ Charge battery
└─ Adjust voltage warning

LOAD:
├─ Reduce PID loop rate
└─ Disable unused features

CRASH:
└─ Power cycle (resets crash detection)
```

---

## Power Issues

### Problem: FC Reboots in Flight

**Symptoms:**
- Random resets
- OSD flickers
- Lost control briefly

**Causes:**
```
1. BEC overload:
   ├─ 5V rail drawing >3A
   └─ Thermal shutdown

2. Voltage sag:
   ├─ Battery too weak
   └─ High current draw

3. Loose connection:
   ├─ Intermittent power
   └─ Bad solder joint
```

**Solutions:**
```
1. Calculate 5V budget:
   └─ See Wiring Guide power calculations

2. Add capacitor:
   ├─ 1000µF, 35V
   └─ Across VBAT/GND

3. Use external BEC:
   └─ If 5V draw >2.5A

4. Check connections:
   └─ Reflow VBAT and GND pads
```

---

## Frequently Asked Questions

### Hardware FAQs

**Q: Can I use 2S battery?**
A: No. Minimum voltage is 7.4V (2S nominal is 7.4V but sags below minimum). Use 3S minimum.

**Q: Will 9V work on 3S battery?**
A: No. 9V BEC requires >12V input. On 3S, only 5V BEC active.

**Q: Can I power VTX from VBAT directly?**
A: Yes, if VTX supports wide voltage (7-26V). Check VTX specs.

**Q: How much current can motor pads handle?**
A: Motor pads are signal only (~50mA). Motor power comes from ESC.

**Q: Can I add external magnetometer?**
A: Yes, via I2C (SDA/SCL pads). Common models: HMC5883L, QMC5883L.

---

### Firmware FAQs

**Q: Which firmware is best?**
A:
- **Racing/Freestyle:** Betaflight
- **Long range/GPS:** INAV
- **Research:** ArduPilot/PX4

**Q: Can I switch firmware?**
A: Yes! Just reflash in DFU mode.

**Q: Will I lose settings when flashing?**
A: Yes, unless you uncheck "Full Chip Erase". Always backup via CLI dump.

**Q: How often should I update firmware?**
A: When new features needed or bugs fixed. Don't update if flying well!

---

### Configuration FAQs

**Q: Why won't DShot work?**
A: Ensure ESC signal ground connected to FC GND. Required for digital protocols.

**Q: Do I need to calibrate ESCs?**
A: No, not with DShot. Only needed for PWM/Oneshot.

**Q: How do I enable Blackbox?**
A:
```
1. Configuration → Features → ☑ BLACKBOX
2. Blackbox → Device: Onboard Flash
3. Save and reboot
```

**Q: Can I use GPS without compass?**
A: Depends on firmware:
- INAV: Compass required
- Betaflight: GPS works but limited features

---

### Flying FAQs

**Q: What mode for beginners?**
A: ANGLE mode (auto-levels)

**Q: How long to wait after powering on?**
A: 
- Without GPS: 5 seconds
- With GPS: Wait for 8+ satellites (~60 seconds)

**Q: Why does it flip on takeoff?**
A: Motor direction or order wrong. Check motor mapping.

**Q: Battery voltage drops quickly!**
A: 
- Normal under load (voltage sag)
- Check battery health
- May need higher C-rating battery

---

### Maintenance FAQs

**Q: How often to clean FC?**
A: After crashes in dirt/grass. Use isopropyl alcohol.

**Q: Can I fly in rain?**
A: Not recommended unless conformal coated. Water can short components.

**Q: How long does Blackbox flash last?**
A: 100,000 erase cycles (years of normal use)

**Q: Should I soft mount?**
A: Yes! Reduces vibration by 60-80%. Always recommended.

---

## Getting Help

If issues persist after troubleshooting:

**Community Support:**
- Discord: https://discord.gg/elco-fc
- Facebook: ELCO Flight Controllers Group
- Reddit: r/Multicopter

**Official Support:**
- Email: support@elco-fc.com
- Include:
  - Clear description
  - Photos/videos
  - Betaflight diff output
  - Blackbox log (if applicable)

**Hardware Issues:**
- Check warranty status (12 months)
- Contact support for RMA

---

**Navigation:**
- [← Back: First Time Setup](./first-time-setup.md)
- [Next: Safety & Regulatory →](./safety-regulatory.md)
- [Return to Index](./README.md)

---

*Last updated: February 2026*
