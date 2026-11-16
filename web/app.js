/**
 * RemoteStation Web Application
 * Web Serial terminal, firmware flasher companion, and interactive keymap explorer.
 */

// 1. Keymap Database
const KEYMAP_DATA = [
  // Movement (4)
  { name: "UP", hex: "0x80BF53AC", hid: "KEY_UP_ARROW", action: "Directional Pad Up", mode: "PS4" },
  { name: "DOWN", hex: "0x80BF4BB4", hid: "KEY_DOWN_ARROW", action: "Directional Pad Down", mode: "PS4" },
  { name: "LEFT", hex: "0x80BF9966", hid: "KEY_LEFT_ARROW", action: "Directional Pad Left", mode: "PS4" },
  { name: "RIGHT", hex: "0x80BF837C", hid: "KEY_RIGHT_ARROW", action: "Directional Pad Right", mode: "PS4" },

  // General (7)
  { name: "OK", hex: "0x80BF738C", hid: "KEY_KP_ENTER", action: "Cross (Confirm / Select)", mode: "PS4" },
  { name: "EXIT", hex: "0x80BFA35C", hid: "0x08 (Backspace)", action: "Circle (Back / Cancel)", mode: "PS4" },
  { name: "LANG", hex: "0x80BF609F", hid: "KEY_ESC", action: "Circle (Alternative Escape)", mode: "PS4" },
  { name: "MENU", hex: "0x80BFA956", hid: "KEY_PAUSE", action: "PlayStation Button (Tap / Home)", mode: "PS4" },
  { name: "ON_OFF", hex: "0x80BF3BC4", hid: "KEY_PAUSE (1000ms)", action: "PlayStation Button (Hold / Power)", mode: "PS4" },
  { name: "FAV", hex: "0x80BF916E", hid: "KEY_PRINT_SCREEN", action: "Share Menu", mode: "PS4" },
  { name: "OPT", hex: "0x80BF6996", hid: "KEY_F3", action: "Options Menu", mode: "PS4" },

  // Numpad (10)
  { name: "NUM_0", hex: "0x80BFE11E", hid: "'0'", action: "Numeric Input 0", mode: "PS4" },
  { name: "NUM_1", hex: "0x80BF49B6", hid: "'1'", action: "Numeric Input 1 / YouTube Mode Selector", mode: "PS4" },
  { name: "NUM_2", hex: "0x80BFC936", hid: "'2'", action: "Numeric Input 2 / Disney+ Mode Selector", mode: "PS4" },
  { name: "NUM_3", hex: "0x80BF33CC", hid: "'3'", action: "Numeric Input 3 / Browser Mode Selector", mode: "PS4" },
  { name: "NUM_4", hex: "0x80BF718E", hid: "'4'", action: "Numeric Input 4 / Netflix Mode Selector", mode: "PS4" },
  { name: "NUM_5", hex: "0x80BFF10E", hid: "'5'", action: "Numeric Input 5", mode: "PS4" },
  { name: "NUM_6", hex: "0x80BF13EC", hid: "'6'", action: "Numeric Input 6", mode: "PS4" },
  { name: "NUM_7", hex: "0x80BF51AE", hid: "'7'", action: "Numeric Input 7", mode: "PS4" },
  { name: "NUM_8", hex: "0x80BFD12E", hid: "'8'", action: "Numeric Input 8", mode: "PS4" },
  { name: "NUM_9", hex: "0x80BF23DC", hid: "'9'", action: "Numeric Input 9", mode: "PS4" },

  // YouTube Shortcuts (7)
  { name: "PLAY", hex: "0x80BF708F", hid: "0x20 (Space)", action: "Play / Pause Toggle", mode: "Youtube" },
  { name: "REWIND", hex: "0x80BFD02F", hid: "'J'", action: "Seek Backward 10s", mode: "Youtube" },
  { name: "FAST_FORWARD", hex: "0x80BF30CF", hid: "'L'", action: "Seek Forward 10s", mode: "Youtube" },
  { name: "MUTE", hex: "0x80BF39C6", hid: "'M'", action: "Toggle Audio Mute", mode: "Youtube" },
  { name: "PREV", hex: "0x80BFA05F", hid: "KEY_F4", action: "Previous Video / Track", mode: "Youtube" },
  { name: "NEXT", hex: "0x80BFE01F", hid: "KEY_F5", action: "Next Video / Track", mode: "Youtube" },
  { name: "INFO", hex: "0x80BF0BF4", hid: "'S'", action: "Focus Search Input", mode: "Youtube" },

  // Disney+ Shortcuts (3)
  { name: "MUTE", hex: "0x80BF39C6", hid: "'M'", action: "Toggle Audio Mute", mode: "Disney+" },
  { name: "REWIND", hex: "0x80BFD02F", hid: "'O'", action: "Rewind Stream", mode: "Disney+" },
  { name: "FAST_FORWARD", hex: "0x80BF30CF", hid: "'P'", action: "Fast Forward Stream", mode: "Disney+" },

  // PS4 Browser (2)
  { name: "INFO", hex: "0x80BF0BF4", hid: "KEY_F1", action: "Focus URL / Address Bar", mode: "Browser" },
  { name: "SUBT", hex: "0x80BF31CE", hid: "KEY_F2", action: "Toggle Full Screen Mode", mode: "Browser" },

  // Netflix Shortcuts (5)
  { name: "PLAY", hex: "0x80BF708F", hid: "0x20 (Space)", action: "Play / Pause Toggle", mode: "Netflix" },
  { name: "MUTE", hex: "0x80BF39C6", hid: "'M'", action: "Toggle Audio Mute", mode: "Netflix" },
  { name: "REWIND", hex: "0x80BFD02F", hid: "KEY_LEFT_ARROW", action: "Seek Backward 10s", mode: "Netflix" },
  { name: "FAST_FORWARD", hex: "0x80BF30CF", hid: "KEY_RIGHT_ARROW", action: "Seek Forward 10s", mode: "Netflix" },
  { name: "INFO", hex: "0x80BF0BF4", hid: "'S'", action: "Search & Audio / Subtitle", mode: "Netflix" }
];

// 2. DOM Elements
const themeToggleBtn = document.getElementById("theme-toggle");
const btnConnect = document.getElementById("btn-connect");
const btnDisconnect = document.getElementById("btn-disconnect");
const baudRateSelect = document.getElementById("baud-rate-select");
const btnClearTerm = document.getElementById("btn-clear-term");
const btnCopyTerm = document.getElementById("btn-copy-term");
const terminalScreen = document.getElementById("terminal-screen");
const statusDot = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");
const packetCountEl = document.getElementById("packet-count");
const activeProfileText = document.getElementById("active-profile-text");
const unsupportedBanner = document.getElementById("serial-unsupported-banner");

const keymapTbody = document.getElementById("keymap-tbody");
const keySearchInput = document.getElementById("key-search");
const profileTabBtns = document.querySelectorAll(".profile-tabs .tab-btn");

// 3. Web Serial State
let port = null;
let reader = null;
let readableStreamClosed = null;
let packetCounter = 0;
let activeMode = "Youtube";

// Check Web Serial support
if (!("serial" in navigator)) {
  if (unsupportedBanner) {
    unsupportedBanner.style.display = "block";
  }
  if (btnConnect) {
    btnConnect.disabled = true;
    btnConnect.title = "Web Serial API not supported in this browser";
  }
}

// 4. Web Serial Connection Functions
async function connectSerial() {
  try {
    port = await navigator.serial.requestPort();
    const baudRate = parseInt(baudRateSelect.value, 10);
    
    await port.open({ baudRate });

    statusDot.className = "status-dot status-online";
    statusText.textContent = `Connected (${baudRate} Baud)`;
    btnConnect.disabled = true;
    btnDisconnect.disabled = false;
    baudRateSelect.disabled = true;

    appendTerminal("Connected to USB Serial port successfully.", "system");

    // Stream reader setup
    const textDecoder = new TextDecoderStream();
    readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    reader = textDecoder.readable.getReader();

    readLoop();
  } catch (err) {
    if (err.name !== "NotFoundError") {
      appendTerminal(`Connection error: ${err.message}`, "error");
    }
  }
}

async function disconnectSerial() {
  if (!port) return;

  try {
    if (reader) {
      await reader.cancel();
      await readableStreamClosed.catch(() => {});
      reader = null;
      readableStreamClosed = null;
    }
    await port.close();
    port = null;

    statusDot.className = "status-dot status-offline";
    statusText.textContent = "Disconnected";
    btnConnect.disabled = false;
    btnDisconnect.disabled = true;
    baudRateSelect.disabled = false;

    appendTerminal("Serial port disconnected.", "system");
  } catch (err) {
    appendTerminal(`Disconnect error: ${err.message}`, "error");
  }
}

async function readLoop() {
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) {
        buffer += value;
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop(); // Keep incomplete tail in buffer

        for (const line of lines) {
          processIncomingLine(line.trim());
        }
      }
    }
  } catch (err) {
    if (port) {
      appendTerminal(`Read error: ${err.message}`, "error");
    }
  }
}

function processIncomingLine(rawLine) {
  if (!rawLine) return;

  packetCounter++;
  packetCountEl.textContent = packetCounter;

  // Check if line is a clean 32-bit hex code (e.g. 80BF708F)
  const hexMatch = rawLine.match(/^(?:0x)?([0-9A-Fa-f]{6,8})$/);

  if (hexMatch) {
    const normalizedHex = "0x" + hexMatch[1].toUpperCase();

    // Check repeat code
    if (normalizedHex === "0xFFFFFFFF") {
      appendTerminal(`[REPEAT] NEC hold frame received (0xFFFFFFFF)`, "rx");
      return;
    }

    // Lookup matching key
    const found = KEYMAP_DATA.find(k => k.hex.toLowerCase() === normalizedHex.toLowerCase());

    if (found) {
      appendTerminal(`[RX] ${normalizedHex} -> ${found.name} | HID: ${found.hid} | Action: ${found.action} (${found.mode})`, "action");

      // Mode switch tracking
      if (found.name === "NUM_1" && activeMode !== "Youtube") {
        activeMode = "Youtube";
        activeProfileText.textContent = "YouTube";
      } else if (found.name === "NUM_2" && activeMode !== "Disney+") {
        activeMode = "Disney+";
        activeProfileText.textContent = "Disney+";
      } else if (found.name === "NUM_3" && activeMode !== "Browser") {
        activeMode = "Browser";
        activeProfileText.textContent = "Browser";
      } else if (found.name === "NUM_4" && activeMode !== "Netflix") {
        activeMode = "Netflix";
        activeProfileText.textContent = "Netflix";
      }
    } else {
      appendTerminal(`[RX] ${normalizedHex} (Unmapped or custom NEC code)`, "rx");
    }
  } else {
    appendTerminal(`[SERIAL] ${rawLine}`, "system");
  }
}

function appendTerminal(text, type = "system") {
  const lineEl = document.createElement("div");
  lineEl.className = `terminal-line terminal-${type}`;
  lineEl.textContent = text;
  terminalScreen.appendChild(lineEl);
  terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

// 5. Terminal Event Listeners
if (btnConnect) btnConnect.addEventListener("click", connectSerial);
if (btnDisconnect) btnDisconnect.addEventListener("click", disconnectSerial);

if (btnClearTerm) {
  btnClearTerm.addEventListener("click", () => {
    terminalScreen.innerHTML = "";
    appendTerminal("Terminal cleared.", "system");
  });
}

if (btnCopyTerm) {
  btnCopyTerm.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(terminalScreen.innerText);
      const originalText = btnCopyTerm.textContent;
      btnCopyTerm.textContent = "Copied!";
      setTimeout(() => { btnCopyTerm.textContent = originalText; }, 1500);
    } catch (e) {
      appendTerminal("Failed to copy log to clipboard.", "error");
    }
  });
}

// 6. Interactive Keymap Rendering & Filtering
let activeFilter = "all";

function renderKeymap() {
  const searchTerm = keySearchInput ? keySearchInput.value.toLowerCase().trim() : "";
  keymapTbody.innerHTML = "";

  const filtered = KEYMAP_DATA.filter(item => {
    const matchesFilter = (activeFilter === "all") || (item.mode === activeFilter);
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm) ||
      item.hex.toLowerCase().includes(searchTerm) ||
      item.hid.toLowerCase().includes(searchTerm) ||
      item.action.toLowerCase().includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `<td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">No matching remote keys found.</td>`;
    keymapTbody.appendChild(emptyRow);
    return;
  }

  for (const item of filtered) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td><code>${item.hex}</code></td>
      <td><code>${item.hid}</code></td>
      <td>${item.action}</td>
      <td><span class="spec-label" style="margin: 0;">${item.mode}</span></td>
    `;
    keymapTbody.appendChild(tr);
  }
}

if (keySearchInput) {
  keySearchInput.addEventListener("input", renderKeymap);
}

profileTabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    profileTabBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    activeFilter = btn.dataset.filter;
    renderKeymap();
  });
});

// Initial render
renderKeymap();

// 7. Code Snippet Copy Buttons
document.querySelectorAll(".btn-copy-code").forEach(btn => {
  btn.addEventListener("click", async () => {
    const code = btn.dataset.code;
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      const originalText = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => { btn.textContent = originalText; }, 1500);
    } catch (e) {
      btn.textContent = "Error";
    }
  });
});

// 8. Color Scheme Toggle (Modern Web Guidance Compliant)
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const meta = document.querySelector('meta[name="color-scheme"]');
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentMeta = meta.content;

    let effective = "light";
    if (currentMeta === "dark" || (currentMeta === "light dark" && isDark)) {
      effective = "dark";
    }

    const next = effective === "dark" ? "light" : "dark";

    if ((next === "dark" && isDark) || (next === "light" && !isDark)) {
      meta.content = "light dark";
      localStorage.removeItem("color-scheme");
    } else {
      meta.content = next;
      localStorage.setItem("color-scheme", next);
    }
  });
}

// Cross-tab synchronization
window.addEventListener("storage", (e) => {
  if (e.key === "color-scheme") {
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.content = e.newValue || "light dark";
    }
  }
});
