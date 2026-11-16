## Description

<!-- Provide a concise technical summary of the changes in this pull request. -->

## Changes

<!-- List specific files, mapping tables, or hardware configurations modified. -->
- 

## Type of Change

- [ ] `feat`: New application mode, button mapping, or hardware support
- [ ] `fix`: Mapping correction, timing adjustment, or build fix
- [ ] `docs`: Documentation updates or pinout adjustments
- [ ] `refactor`: Structural changes without functional regression
- [ ] `chore`: Build system, CI workflow, or dependency updates

## Verification & Testing

<!-- Detail hardware validation steps performed. -->

- [ ] Compiled with PlatformIO (`pio run`)
- [ ] Verified on physical Arduino Leonardo hardware
- [ ] Serial monitor confirmed decoded hex values
- [ ] Keystroke output validated on PlayStation 4 / Host OS

```bash
# Verification commands executed:
pio run
```

## Checklist

- [ ] Commits adhere to [Conventional Commits](https://www.conventionalcommits.org/).
- [ ] Mappings in `RemoteHex.h` and `IRtoHIDmapper.h` are synchronized.
- [ ] No extraneous debug prints or unverified key codes committed.
