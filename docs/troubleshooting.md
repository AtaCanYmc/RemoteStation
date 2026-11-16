# Troubleshooting Guide

[← Back to Documentation Index](README.md) | [← Root README](../README.md)

Common diagnostic procedures for resolving hardware, communication, and protocol issues.

---

## 1. No Serial Output or Board Not Detected

### Symptoms
- `pio device monitor` or `make monitor` reports `Device not found`.
- No hex values appear when pressing remote buttons.

### Checks and Remediations
1. **USB Data Lines**: Many Micro-USB cables are power-only. Verify that your cable carries USB D+ and D- data lines by verifying the board appears in system devices:
   ```bash
   # On macOS
   ioreg -p IOUSB -l -w 0 | grep Leonardo
   
   # On Linux
   lsusb | grep 2341:8036
   ```
2. **Serial Baud Rate**: Ensure the terminal is configured to **9600 baud**:
   ```bash
   pio device monitor -b 9600
   ```
3. **Sensor Supply Voltage**: Verify with a multimeter that Pin 3 (`RECV_EN`) outputs approximately 5.0 V DC relative to GND.

---

## 2. Console Does Not React to Keystrokes

### Symptoms
- Serial monitor displays correct hex codes, but the PlayStation 4 does not navigate.

### Checks and Remediations
1. **Isolate on PC**: Unplug the Leonardo from the PlayStation 4 and connect it to a PC or Mac. Open a text editor (e.g. TextEdit, Notepad) and press remote buttons. Arrow keys should move the cursor and numpad keys should type numbers.
2. **PlayStation 4 USB Enumeration**: Connect the Leonardo directly to the front USB port of the PlayStation 4 without intermediate unpowered hubs.
3. **Application Mode**: If shortcuts like play/pause fail in YouTube, verify that the YouTube profile is active. Press `RADIO_TV` followed by `1` to activate `MODE_YOUTUBE`.

---

## 3. Spurious Hex Codes or Optical Noise

### Symptoms
- The serial monitor floods with random hex codes without pressing remote buttons.

### Checks and Remediations
1. **Ambient Light Interference**: Direct sunlight, plasma televisions, or low-quality compact fluorescent lamps (CFL) emit infrared noise that can trigger high-gain receivers. Shield the sensor from direct light.
2. **Supply Decoupling**: If using jumper wires longer than 15 cm, add a `0.1 µF` ceramic capacitor across `VCC` and `GND` directly at the receiver pins.
3. **Carrier Frequency Mismatch**: RemoteStation expects a 38 kHz optical carrier. Using a 36 kHz or 56 kHz receiver with a 38 kHz remote reduces range and increases decode bit errors.

---

## 4. Keystrokes Stuck or Delayed

### Symptoms
- The console acts as though a button is permanently held down.

### Checks and Remediations
1. **`releaseAll()` Execution**: RemoteStation executes `Keyboard.releaseAll()` immediately after the configured delay. If modifying `sendHID`, never remove the release call.
2. **Hold Time Limits**: The firmware clamps maximum hold times to 2000 ms to prevent lockup conditions:
   ```cpp
   if (time > 2000) time = 2000;
   ```
3. **Repeat Packet Handling**: When a button is held down, the NEC protocol sends `0xFFFFFFFF`. The firmware re-dispatches the last valid command. If rapid repetitions cause lag, increase the delay between commands.
