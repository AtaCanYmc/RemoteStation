/**
 * RemoteStation Web Application
 * Web Serial Console, Flashing Guide, and Interactive Keymap Inspector
 */

// 1. All 33 button mappings synchronized with RemoteHex.h and IRtoHIDmapper.cpp
const KEYMAP_DATA = [
  // Movement (4)
  { key: "UP", hex: "0x80BF53AC", hid: "KEY_UP_ARROW", action: "D-Pad Yukarı", mode: "PS4" },
  { key: "DOWN", hex: "0x80BF4BB4", hid: "KEY_DOWN_ARROW", action: "D-Pad Aşağı", mode: "PS4" },
  { key: "LEFT", hex: "0x80BF9966", hid: "KEY_LEFT_ARROW", action: "D-Pad Sol", mode: "PS4" },
  { key: "RIGHT", hex: "0x80BF837C", hid: "KEY_RIGHT_ARROW", action: "D-Pad Sağ", mode: "PS4" },

  // General (7)
  { key: "OK", hex: "0x80BF738C", hid: "KEY_KP_ENTER", action: "Çarpı / Onay (Select)", mode: "PS4" },
  { key: "EXIT", hex: "0x80BFA35C", hid: "0x08 (Backspace)", action: "Daire / Geri (Back)", mode: "PS4" },
  { key: "LANG", hex: "0x80BF609F", hid: "KEY_ESC", action: "Daire / Alternatif Geri", mode: "PS4" },
  { key: "MENU", hex: "0x80BFA956", hid: "KEY_PAUSE", action: "PlayStation Butonu (Kısa Basış)", mode: "PS4" },
  { key: "FAV", hex: "0x80BF916E", hid: "KEY_PRINT_SCREEN", action: "Share / Paylaş Menüsü", mode: "PS4" },
  { key: "OPT", hex: "0x80BF6996", hid: "KEY_F3", action: "Seçenekler (Options)", mode: "PS4" },
  { key: "ON_OFF", hex: "0x80BF3BC4", hid: "KEY_PAUSE (1000ms)", action: "PlayStation Butonu (Uzun Basış / Güç Menüsü)", mode: "PS4" },

  // Numpad (10)
  { key: "NUM_0", hex: "0x80BFE11E", hid: "'0'", action: "Rakam 0", mode: "PS4" },
  { key: "NUM_1", hex: "0x80BF49B6", hid: "'1'", action: "Rakam 1", mode: "PS4" },
  { key: "NUM_2", hex: "0x80BFC936", hid: "'2'", action: "Rakam 2", mode: "PS4" },
  { key: "NUM_3", hex: "0x80BF33CC", hid: "'3'", action: "Rakam 3", mode: "PS4" },
  { key: "NUM_4", hex: "0x80BF718E", hid: "'4'", action: "Rakam 4", mode: "PS4" },
  { key: "NUM_5", hex: "0x80BFF10E", hid: "'5'", action: "Rakam 5", mode: "PS4" },
  { key: "NUM_6", hex: "0x80BF13EC", hid: "'6'", action: "Rakam 6", mode: "PS4" },
  { key: "NUM_7", hex: "0x80BF51AE", hid: "'7'", action: "Rakam 7", mode: "PS4" },
  { key: "NUM_8", hex: "0x80BFD12E", hid: "'8'", action: "Rakam 8", mode: "PS4" },
  { key: "NUM_9", hex: "0x80BF23DC", hid: "'9'", action: "Rakam 9", mode: "PS4" },

  // YouTube Shortcuts (7)
  { key: "PLAY", hex: "0x80BF708F", hid: "0x20 (Space)", action: "Oynat / Duraklat", mode: "Youtube" },
  { key: "REWIND", hex: "0x80BFD02F", hid: "'J'", action: "10 Saniye Geri Sar", mode: "Youtube" },
  { key: "FAST_FORWARD", hex: "0x80BF30CF", hid: "'L'", action: "10 Saniye İleri Sar", mode: "Youtube" },
  { key: "MUTE", hex: "0x80BF39C6", hid: "'M'", action: "Sesi Aç / Kapat", mode: "Youtube" },
  { key: "PREV", hex: "0x80BFA05F", hid: "KEY_F4", action: "Önceki Video", mode: "Youtube" },
  { key: "NEXT", hex: "0x80BFE01F", hid: "KEY_F5", action: "Sonraki Video", mode: "Youtube" },
  { key: "INFO", hex: "0x80BF0BF4", hid: "'S'", action: "Arama Çubuğuna Odaklan", mode: "Youtube" },

  // Disney+ Shortcuts (3)
  { key: "MUTE", hex: "0x80BF39C6", hid: "'M'", action: "Sesi Aç / Kapat", mode: "Disney+" },
  { key: "REWIND", hex: "0x80BFD02F", hid: "'O'", action: "Geri Sar", mode: "Disney+" },
  { key: "FAST_FORWARD", hex: "0x80BF30CF", hid: "'P'", action: "İleri Sar", mode: "Disney+" },

  // PS4 Browser (2)
  { key: "INFO", hex: "0x80BF0BF4", hid: "KEY_F1", action: "Adres Çubuğuna Odaklan", mode: "Browser" },
  { key: "SUBT", hex: "0x80BF31CE", hid: "KEY_F2", action: "Tam Ekran Yap / Çık", mode: "Browser" }
];

// Special Keys
const SPECIAL_KEYS = {
  "RADIO_TV": "0x80BFBB44",
  "HOLD": "0xFFFFFFFF"
};

// 2. Application State
const state = {
  port: null,
  reader: null,
  inputDone: null,
  outputDone: null,
  inputStream: null,
  outputStream: null,
  activeFilter: "all",
  searchQuery: "",
  packetCount: 0,
  activeProfile: "YouTube",
  lastReceivedHex: null,
  waitingForModeChange: false
};

// 3. DOM Elements
const elements = {
  themeToggle: document.getElementById("theme-toggle"),
  metaColorScheme: document.querySelector('meta[name="color-scheme"]'),
  serialBanner: document.getElementById("serial-unsupported-banner"),
  btnConnect: document.getElementById("btn-connect"),
  btnDisconnect: document.getElementById("btn-disconnect"),
  baudSelect: document.getElementById("baud-rate-select"),
  btnClearTerm: document.getElementById("btn-clear-term"),
  btnCopyTerm: document.getElementById("btn-copy-term"),
  terminalScreen: document.getElementById("terminal-screen"),
  statusDot: document.getElementById("status-dot"),
  statusText: document.getElementById("status-text"),
  packetCount: document.getElementById("packet-count"),
  activeProfileText: document.getElementById("active-profile-text"),
  keymapTbody: document.getElementById("keymap-tbody"),
  keySearch: document.getElementById("key-search"),
  filterTabs: document.querySelectorAll(".profile-tabs .tab-btn"),
  copyCodeBtns: document.querySelectorAll(".btn-copy-code")
};

// ==========================================================================
// Theme Toggle (Modern Web Guidance Compliant)
// ==========================================================================
function initTheme() {
  if (!elements.themeToggle) return;

  elements.themeToggle.addEventListener("click", () => {
    const currentTheme = elements.metaColorScheme.content;
    const isDark = currentTheme === "dark" || (currentTheme === "light dark" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const targetTheme = isDark ? "light" : "dark";

    try {
      localStorage.setItem("color-scheme", targetTheme);
    } catch (e) {}

    elements.metaColorScheme.content = targetTheme;
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "color-scheme" && e.newValue) {
      elements.metaColorScheme.content = e.newValue;
    }
  });
}

// ==========================================================================
// Keymap Table Rendering & Filtering
// ==========================================================================
function renderKeymap() {
  if (!elements.keymapTbody) return;

  const query = state.searchQuery.toLowerCase().trim();
  const filter = state.activeFilter;

  const filtered = KEYMAP_DATA.filter(item => {
    const matchesFilter = filter === "all" || item.mode === filter;
    const matchesQuery = !query || 
      item.key.toLowerCase().includes(query) ||
      item.hex.toLowerCase().includes(query) ||
      item.action.toLowerCase().includes(query) ||
      item.hid.toLowerCase().includes(query);

    return matchesFilter && matchesQuery;
  });

  if (filtered.length === 0) {
    elements.keymapTbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 24px;">
          Eşleşen tuş kaydı bulunamadı.
        </td>
      </tr>
    `;
    return;
  }

  elements.keymapTbody.innerHTML = filtered.map(item => {
    let modeClass = "badge-mode-ps4";
    if (item.mode === "Youtube") modeClass = "badge-mode-youtube";
    else if (item.mode === "Disney+") modeClass = "badge-mode-disney";
    else if (item.mode === "Browser") modeClass = "badge-mode-browser";

    return `
      <tr>
        <td><strong>${item.key}</strong></td>
        <td><code>${item.hex}</code></td>
        <td><code>${item.hid}</code></td>
        <td>${item.action}</td>
        <td><span class="badge-mode ${modeClass}">${item.mode}</span></td>
      </tr>
    `;
  }).join("");
}

function initKeymapControls() {
  if (elements.filterTabs) {
    elements.filterTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        elements.filterTabs.forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        state.activeFilter = tab.getAttribute("data-filter");
        renderKeymap();
      });
    });
  }

  if (elements.keySearch) {
    elements.keySearch.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderKeymap();
    });
  }
}

// ==========================================================================
// Web Serial API Console & Packet Inspector
// ==========================================================================
function checkSerialSupport() {
  const isSupported = "serial" in navigator;
  if (!isSupported && elements.serialBanner) {
    elements.serialBanner.style.display = "block";
    if (elements.btnConnect) {
      elements.btnConnect.disabled = true;
      elements.btnConnect.title = "Web Serial API bu tarayıcıda desteklenmiyor.";
    }
  }
  return isSupported;
}

function appendTerminal(text, type = "system") {
  if (!elements.terminalScreen) return;

  const line = document.createElement("div");
  line.className = `terminal-line terminal-${type}`;
  line.textContent = text;
  elements.terminalScreen.appendChild(line);

  // Auto-scroll to bottom
  elements.terminalScreen.scrollTop = elements.terminalScreen.scrollHeight;
}

function parseAndLogPacket(rawLine) {
  const clean = rawLine.trim().toUpperCase();
  if (!clean) return;

  state.packetCount++;
  if (elements.packetCount) {
    elements.packetCount.textContent = state.packetCount;
  }

  const timestamp = new Date().toLocaleTimeString("tr-TR");
  let hexCode = clean;
  if (!hexCode.startsWith("0X") && !hexCode.startsWith("0x")) {
    hexCode = "0x" + hexCode;
  }

  // Check special cases
  if (hexCode === SPECIAL_KEYS.RADIO_TV) {
    state.waitingForModeChange = true;
    appendTerminal(`[${timestamp}] [MOD] RADIO_TV tuşu algılandı. Yeni profil için numara bekleniyor (1: YouTube, 2: Disney+, 3: Tarayıcı)...`, "key");
    if (elements.activeProfileText) {
      elements.activeProfileText.textContent = "Mod Seçimi...";
    }
    return;
  }

  if (state.waitingForModeChange) {
    state.waitingForModeChange = false;
    if (hexCode === "0x80BF49B6") { // NUM_1
      state.activeProfile = "YouTube";
    } else if (hexCode === "0x80BFC936") { // NUM_2
      state.activeProfile = "Disney+";
    } else if (hexCode === "0x80BF33CC") { // NUM_3
      state.activeProfile = "Tarayıcı";
    } else {
      state.activeProfile = "YouTube";
    }

    appendTerminal(`[${timestamp}] [MOD] Aktif profil değiştirildi -> ${state.activeProfile}`, "key");
    if (elements.activeProfileText) {
      elements.activeProfileText.textContent = state.activeProfile;
    }
    return;
  }

  if (hexCode === SPECIAL_KEYS.HOLD) {
    appendTerminal(`[${timestamp}] [HOLD] Tuş basılı tutuluyor (0xFFFFFFFF)`, "system");
    return;
  }

  // Find mapping
  const match = KEYMAP_DATA.find(item => item.hex.toUpperCase() === hexCode);
  if (match) {
    appendTerminal(`[${timestamp}] [RX] ${hexCode} -> ${match.key} (${match.action}) [${match.hid}]`, "rx");
  } else {
    appendTerminal(`[${timestamp}] [RX] ${hexCode} (Haritalanmamış NEC Kodu)`, "system");
  }
}

async function connectSerial() {
  if (!("serial" in navigator)) return;

  const baudRate = parseInt(elements.baudSelect ? elements.baudSelect.value : "9600", 10);

  try {
    state.port = await navigator.serial.requestPort();
    await state.port.open({ baudRate });

    elements.statusDot.className = "status-dot status-online";
    elements.statusText.textContent = `Bağlandı (${baudRate} Baud)`;
    elements.btnConnect.disabled = true;
    elements.btnDisconnect.disabled = false;

    appendTerminal(`[SİSTEM] Port açıldı (${baudRate} baud). Kızılötesi sinyalleri dinleniyor...`, "system");

    // Setup text decoder stream
    const textDecoder = new TextDecoderStream();
    state.inputDone = state.port.readable.pipeTo(textDecoder.writable);
    state.inputStream = textDecoder.readable;
    state.reader = state.inputStream.getReader();

    readLoop();
  } catch (err) {
    appendTerminal(`[HATA] Port bağlantısı kurulamadı: ${err.message}`, "system");
  }
}

async function readLoop() {
  let buffer = "";

  try {
    while (state.reader) {
      const { value, done } = await state.reader.read();
      if (done) break;
      if (value) {
        buffer += value;
        const lines = buffer.split("\n");
        buffer = lines.pop(); // keep remainder

        for (const line of lines) {
          parseAndLogPacket(line);
        }
      }
    }
  } catch (err) {
    if (state.port) {
      appendTerminal(`[HATA] Veri okuma kesintisi: ${err.message}`, "system");
    }
  }
}

async function disconnectSerial() {
  if (!state.port) return;

  try {
    if (state.reader) {
      await state.reader.cancel();
      await state.inputDone.catch(() => {});
      state.reader = null;
      state.inputDone = null;
    }

    await state.port.close();
    state.port = null;

    elements.statusDot.className = "status-dot status-offline";
    elements.statusText.textContent = "Bağlantı Kesildi";
    elements.btnConnect.disabled = false;
    elements.btnDisconnect.disabled = true;

    appendTerminal("[SİSTEM] USB port bağlantısı kapatıldı.", "system");
  } catch (err) {
    appendTerminal(`[HATA] Port kapatılırken hata oluştu: ${err.message}`, "system");
  }
}

function initSerialControls() {
  if (elements.btnConnect) {
    elements.btnConnect.addEventListener("click", connectSerial);
  }

  if (elements.btnDisconnect) {
    elements.btnDisconnect.addEventListener("click", disconnectSerial);
  }

  if (elements.btnClearTerm) {
    elements.btnClearTerm.addEventListener("click", () => {
      if (elements.terminalScreen) {
        elements.terminalScreen.innerHTML = `
          <div class="terminal-line terminal-system">Terminal ekranı temizlendi.</div>
        `;
      }
    });
  }

  if (elements.btnCopyTerm) {
    elements.btnCopyTerm.addEventListener("click", async () => {
      if (!elements.terminalScreen) return;
      const text = elements.terminalScreen.innerText;
      try {
        await navigator.clipboard.writeText(text);
        const originalText = elements.btnCopyTerm.textContent;
        elements.btnCopyTerm.textContent = "Kopyalandı!";
        setTimeout(() => {
          elements.btnCopyTerm.textContent = originalText;
        }, 1500);
      } catch (e) {}
    });
  }
}

// ==========================================================================
// Code Snippet Copy Buttons
// ==========================================================================
function initCopyButtons() {
  elements.copyCodeBtns.forEach(btn => {
    btn.addEventListener("click", async () => {
      const code = btn.getAttribute("data-code");
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code);
        const original = btn.textContent;
        btn.textContent = "Kopyalandı!";
        setTimeout(() => {
          btn.textContent = original;
        }, 1500);
      } catch (e) {}
    });
  });
}

// ==========================================================================
// App Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  checkSerialSupport();
  initKeymapControls();
  renderKeymap();
  initSerialControls();
  initCopyButtons();
});
