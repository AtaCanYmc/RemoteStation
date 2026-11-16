# Contributing Guidelines

Contributions to RemoteStation are welcome. Follow these guidelines to maintain code quality, hardware stability, and Git commit discipline.

---

## Development Prerequisites

Install the PlatformIO CLI or PlatformIO IDE extension:

```bash
# Verify PlatformIO Core installation
pio --version
```

Hardware requirements for local validation:
- Arduino Leonardo (or compatible ATmega32U4 board)
- 38 kHz infrared receiver module (e.g. VS1838B)
- Micro-USB cable supporting data lines

---

## Build and Verification Workflow

Compile the firmware locally before submitting changes:

```bash
# 1. Compile firmware
pio run

# 2. Flash to connected board (optional)
pio run --target upload

# 3. Open serial monitor to capture IR codes
pio device monitor -b 9600
```

---

## Adding New Remote Codes and Mappings

### 1. Capture Raw Hex Codes
1. Flash the firmware and launch `pio device monitor -b 9600`.
2. Point your remote at the receiver and press the desired button.
3. Record the 32-bit hex value printed to the serial console (e.g. `0x80BF708F`).

### 2. Update Header Definitions
Open `include/RemoteHex.h` and define a descriptive macro for the captured hex code:

```cpp
#define BUTTON_NAME 0x80BFXXXX
```

### 3. Register Key Mapping
Open `include/IRtoHIDmapper.h` and add an `IR2HID` entry to the `buttons` array:

```cpp
{BUTTON_NAME, KEY_TARGET, 50, "TargetMode"}
```

If introducing a new application mode, add the mode name to the `modes` array in `include/IRtoHIDmapper.h` and handle switching logic in `src/IRtoHIDmapper.cpp`.

---

## Commit Message Convention

RemoteStation enforces [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Scope | Description |
| :--- | :--- | :--- |
| `feat` | Firmware / Mapping | Adds new remote codes, modes, or hardware support. |
| `fix` | Firmware / Bug | Resolves timing issues, incorrect keycodes, or build errors. |
| `docs` | Documentation | Updates README, pinouts, or governance files. |
| `refactor` | Architecture | Code cleanup without functional alteration. |
| `chore` | Build / CI | Modifies `platformio.ini`, GitHub Actions, or repository tools. |

Example commit message:
```text
feat(mapper): add play and pause controls for media mode
```

---

## Pull Request Guidelines

1. Create a descriptive branch from `main`:
   ```bash
   git checkout -b feat/add-panasonic-codes
   ```
2. Verify local compilation passes with zero warnings:
   ```bash
   pio run
   ```
3. Submit a pull request referencing any related issue. Fill out all sections in the pull request template.
