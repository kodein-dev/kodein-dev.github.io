// ─── STATE ────────────────────────────────────────────────────────────────────
let processFound = false;
let isInjecting  = false;
let selectedScript = 'esp';
let history = [];
let histIdx  = -1;
let lang = 'en';

const input    = document.getElementById('termInput');
const output   = document.getElementById('output');
const termBody = document.getElementById('termBody');

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function scrollBottom() {
  termBody.scrollTop = termBody.scrollHeight;
}

function prompt() {
  return `<span class="prompt-full"><span class="c-green">kodein</span><span class="c-dim">@</span><span class="c-pink">injector</span><span class="c-dim">:</span><span class="c-blue">~</span><span class="c-dim">$</span></span>`;
}

// print a command echo
function printCmd(cmd) {
  const d = document.createElement('div');
  d.className = 'out-block';
  d.innerHTML = `<div class="prompt-line">${prompt()} <span class="c-white">${escHtml(cmd)}</span></div>`;
  output.appendChild(d);
}

// print output lines
function printLines(lines) {
  const d = document.createElement('div');
  d.className = 'out-block out-text';
  d.innerHTML = lines;
  output.appendChild(d);
  scrollBottom();
  return d;
}

function printBlank() {
  const d = document.createElement('div');
  d.style.height = '6px';
  output.appendChild(d);
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ─── COMMANDS ────────────────────────────────────────────────────────────────
const COMMANDS = {

  help() {
    printLines(`
<span class="c-pink bold">${T[lang].help_title}</span>

  <span class="c-blue">help</span>          <span class="c-dim">${T[lang].h_help}</span>
  <span class="c-blue">about</span>         <span class="c-dim">${T[lang].h_about}</span>
  <span class="c-blue">features</span>      <span class="c-dim">${T[lang].h_features}</span>
  <span class="c-blue">inject</span>        <span class="c-dim">${T[lang].h_inject}</span>
  <span class="c-blue">scan</span>          <span class="c-dim">${T[lang].h_scan}</span>
  <span class="c-blue">scripts</span>       <span class="c-dim">${T[lang].h_scripts}</span>
  <span class="c-blue">status</span>        <span class="c-dim">${T[lang].h_status}</span>
  <span class="c-blue">faq</span>           <span class="c-dim">${T[lang].h_faq}</span>
  <span class="c-blue">download</span>      <span class="c-dim">${T[lang].h_download}</span>
  <span class="c-blue">clear</span>         <span class="c-dim">${T[lang].h_clear}</span>
  <span class="c-blue">lang [en|ru]</span>  <span class="c-dim">${T[lang].h_lang}</span>
`);
  },

  about() {
    printLines(`
<span class="c-pink bold">kodein.cc</span> <span class="c-dim">—</span> <span class="c-white">${T[lang].about_desc}</span>

  <span class="c-dim">author</span>    <span class="c-purple">kodein team</span>
  <span class="c-dim">version</span>   <span class="c-pink">4.2.0</span>
  <span class="c-dim">target</span>    <span class="c-white">RobloxPlayerBeta.exe</span>
  <span class="c-dim">bypass</span>    <span class="c-white">Byfron, Hyperion</span>
  <span class="c-dim">price</span>     <span class="c-green">$0.00</span>
  <span class="c-dim">bans</span>      <span class="c-green">0</span>

<span class="c-dim">${T[lang].about_p}</span>
`);
  },

  features() {
    printLines(`
<span class="c-pink bold">${T[lang].feat_title}</span>

  <span class="c-green">✓</span>  <span class="c-blue">--inject</span>    <span class="c-white">${T[lang].f1}</span>
  <span class="c-green">✓</span>  <span class="c-pink">--bypass</span>    <span class="c-white">${T[lang].f2}</span>
  <span class="c-green">✓</span>  <span class="c-blue">--exec</span>      <span class="c-white">${T[lang].f3}</span>
  <span class="c-green">✓</span>  <span class="c-pink">--auto</span>      <span class="c-white">${T[lang].f4}</span>
  <span class="c-green">✓</span>  <span class="c-blue">--stealth</span>   <span class="c-white">${T[lang].f5}</span>
  <span class="c-green">✓</span>  <span class="c-pink">--free</span>      <span class="c-white">${T[lang].f6}</span>
`);
  },

  status() {
    const pid = processFound ? Math.floor(Math.random()*9000)+1000 : null;
    printLines(`
<span class="c-pink bold">${T[lang].status_title}</span>

  <span class="c-dim">process</span>   ${processFound ? `<span class="c-green">found</span>  <span class="c-dim">pid: ${pid}</span>` : `<span class="c-red">not found</span>`}
  <span class="c-dim">bypass</span>    <span class="c-green">ready</span>
  <span class="c-dim">version</span>   <span class="c-pink">4.2.0</span>
  <span class="c-dim">detection</span> <span class="c-green">0%</span>
  <span class="c-dim">script</span>    <span class="c-purple">${selectedScript}</span>
  <span class="c-dim">uptime</span>    <span class="c-green">99.9%</span>
`);
  },

  scan() {
    printLines(`<span class="c-dim">${T[lang].scan_start}</span>`);
    const block = printLines(`<span class="c-dim">...</span>`);
    setTimeout(() => {
      processFound = true;
      const pid = Math.floor(Math.random()*9000)+1000;
      block.innerHTML = `<span class="c-green">✓ ${T[lang].scan_found}</span>  <span class="c-dim">pid: ${pid}  handle: 0x${Math.floor(Math.random()*0xFFFF).toString(16).toUpperCase()}</span>`;
      scrollBottom();
    }, 900);
  },

  scripts() {
    const block = document.createElement('div');
    block.className = 'out-block';
    block.innerHTML = `
<div class="out-text"><span class="c-pink bold">${T[lang].scripts_title}</span>
<span class="c-dim">${T[lang].scripts_hint}</span></div>
<div class="script-select" id="scriptSelect">
  <button class="sc-opt ${selectedScript==='esp'?'active':''}" onclick="pickScript(this,'esp')">esp</button>
  <button class="sc-opt ${selectedScript==='aimbot'?'active':''}" onclick="pickScript(this,'aimbot')">aimbot</button>
  <button class="sc-opt ${selectedScript==='speed'?'active':''}" onclick="pickScript(this,'speed')">speed</button>
  <button class="sc-opt ${selectedScript==='fly'?'active':''}" onclick="pickScript(this,'fly')">fly</button>
  <button class="sc-opt ${selectedScript==='noclip'?'active':''}" onclick="pickScript(this,'noclip')">noclip</button>
  <button class="sc-opt ${selectedScript==='autofarm'?'active':''}" onclick="pickScript(this,'autofarm')">autofarm</button>
  <button class="sc-opt ${selectedScript==='custom'?'active':''}" onclick="pickScript(this,'custom')">custom</button>
</div>
<div class="out-text c-dim" id="scriptNote">${T[lang].script_selected}: <span class="c-pink">${selectedScript}</span></div>`;
    output.appendChild(block);
    scrollBottom();
  },

  inject() {
    if (isInjecting) {
      printLines(`<span class="c-yellow">${T[lang].inj_busy}</span>`);
      return;
    }
    if (!processFound) {
      printLines(`<span class="c-red">✗ ${T[lang].inj_no_proc}</span>\n<span class="c-dim">${T[lang].inj_hint}</span>`);
      return;
    }

    isInjecting = true;

    const steps = [
      T[lang].ps1,
      T[lang].ps2,
      T[lang].ps3,
      T[lang].ps4,
    ];
    const stepDone = [
      T[lang].pd1,
      T[lang].pd2,
      T[lang].pd3,
      T[lang].pd4,
    ];

    // build block
    const block = document.createElement('div');
    block.className = 'out-block';

    const stepsHtml = steps.map((s,i) =>
      `<div class="step-item" id="si${i}"><span class="step-dot"></span><span>${s}</span></div>`
    ).join('');

    block.innerHTML = `
<div class="out-text"><span class="c-pink bold">${T[lang].inj_start}</span> <span class="c-purple">${selectedScript}.lua</span></div>
<div class="step-list">${stepsHtml}</div>
<div class="prog-wrap">
  <div class="prog-bar">
    <div class="prog-track"><div class="prog-fill" id="pFill"></div></div>
    <span class="prog-pct" id="pPct">0%</span>
  </div>
</div>
<div class="out-text c-dim" id="injResult"></div>`;
    output.appendChild(block);
    scrollBottom();

    const fill = document.getElementById('pFill');
    const pct  = document.getElementById('pPct');
    let si = 0, progress = 0;

    function runStep() {
      if (si >= steps.length) {
        fill.style.width = '100%';
        pct.textContent = '100%';
        const res = document.getElementById('injResult');
        res.innerHTML = `<span class="c-green">✓ ${T[lang].inj_done} </span><span class="c-pink">${selectedScript}.lua</span>`;
        isInjecting = false;
        scrollBottom();
        return;
      }
      const el = document.getElementById('si' + si);
      el.classList.add('active');
      const target = (si + 1) * 25;
      const iv = setInterval(() => {
        progress += 1.5;
        if (progress >= target) {
          progress = target;
          clearInterval(iv);
          el.classList.remove('active');
          el.classList.add('done');
          el.querySelector('span:last-child').textContent = stepDone[si];
          si++;
          setTimeout(runStep, 200);
        }
        fill.style.width = progress + '%';
        pct.textContent = Math.floor(progress) + '%';
        scrollBottom();
      }, 28);
    }
    setTimeout(runStep, 300);
  },

  download() {
    printLines(`
<span class="c-pink bold">${T[lang].dl_title}</span>

  <span class="c-dim">file</span>      <span class="c-white">kodein_v4.2.0.zip</span>
  <span class="c-dim">os</span>        <span class="c-white">Windows 10/11 x64</span>
  <span class="c-dim">price</span>     <span class="c-green">free</span>
  <span class="c-dim">source</span>    <span class="c-purple">catbox.moe</span>

<span class="c-yellow">⚠  ${T[lang].dl_warn}</span>
<span class="c-dim">${T[lang].dl_fix}</span>
`);
    // небольшая задержка — имитация "wget"
    printLines(`<span class="c-dim">fetching https://www.dropbox.com/scl/fi/pw500rdrj82mz7agtzn79/Kodein-x64.zip?rlkey=87vpvv40s377s4lgrbfh9xkqk&st=jsgfj7ix&dl=1 ...</span>`);
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = 'https://www.dropbox.com/scl/fi/pw500rdrj82mz7agtzn79/Kodein-x64.zip?rlkey=87vpvv40s377s4lgrbfh9xkqk&st=jsgfj7ix&dl=1';
      a.download = 'Kodein-x64.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      printLines(`<span class="c-green">✓ download started</span>`);
      printBlank();
      scrollBottom();
    }, 600);
  },

  faq() {
    printLines(`
<span class="c-pink bold">FAQ</span>

<span class="c-blue">Q:</span> <span class="c-white">${T[lang].q1}</span>
<span class="c-dim">A:</span> ${T[lang].a1}

<span class="c-blue">Q:</span> <span class="c-white">${T[lang].q2}</span>
<span class="c-dim">A:</span> ${T[lang].a2}

<span class="c-blue">Q:</span> <span class="c-white">${T[lang].q3}</span>
<span class="c-dim">A:</span> ${T[lang].a3}

<span class="c-blue">Q:</span> <span class="c-white">${T[lang].q4}</span>
<span class="c-dim">A:</span> ${T[lang].a4}

<span class="c-blue">Q:</span> <span class="c-white">${T[lang].q5}</span>
<span class="c-dim">A:</span> ${T[lang].a5}
`);
  },

  clear() {
    output.innerHTML = '';
  },

  lang(args) {
    const l = args[0];
    if (l === 'en' || l === 'ru') {
      lang = l;
      document.getElementById('langBtn').textContent = l === 'en' ? 'RU' : 'EN';
      printLines(`<span class="c-green">✓ language set to ${l}</span>`);
    } else {
      printLines(`<span class="c-red">usage: lang [en|ru]</span>`);
    }
  },
};

// ─── SCRIPT PICKER ───────────────────────────────────────────────────────────
function pickScript(btn, name) {
  document.querySelectorAll('.sc-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedScript = name;
  const note = document.getElementById('scriptNote');
  if (note) note.innerHTML = `${T[lang].script_selected}: <span class="c-pink">${name}</span>`;
}

// ─── INPUT HANDLER ───────────────────────────────────────────────────────────
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const raw = input.value.trim();
    input.value = '';
    if (!raw) { printBlank(); return; }

    history.unshift(raw);
    histIdx = -1;

    printCmd(raw);

    const parts = raw.split(/\s+/);
    const cmd   = parts[0].toLowerCase();
    const args  = parts.slice(1);

    if (COMMANDS[cmd]) {
      COMMANDS[cmd](args);
    } else {
      printLines(`<span class="c-red">bash: ${escHtml(cmd)}: ${T[lang].cmd_not_found}</span>`);
    }
    printBlank();
    scrollBottom();
  }

  // history navigation
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx < history.length - 1) histIdx++;
    input.value = history[histIdx] || '';
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx > 0) histIdx--;
    else { histIdx = -1; input.value = ''; }
    input.value = history[histIdx] || '';
  }

  // tab autocomplete
  if (e.key === 'Tab') {
    e.preventDefault();
    const val = input.value.toLowerCase();
    const match = Object.keys(COMMANDS).find(c => c.startsWith(val) && c !== val);
    if (match) input.value = match;
  }
});

// click anywhere focuses input
document.getElementById('terminal').addEventListener('click', () => input.focus());

// lang button
document.getElementById('langBtn').addEventListener('click', () => {
  lang = lang === 'en' ? 'ru' : 'en';
  document.getElementById('langBtn').textContent = lang === 'en' ? 'RU' : 'EN';
  printCmd(`lang ${lang}`);
  printLines(`<span class="c-green">✓ language set to ${lang}</span>`);
  printBlank();
  scrollBottom();
});

// ─── BOOT SEQUENCE ───────────────────────────────────────────────────────────
const bootLines = [
  { t: 0,    html: `<span class="c-dim">[    0.000] </span><span class="c-white">kodein kernel 4.2.0 loading...</span>` },
  { t: 120,  html: `<span class="c-dim">[    0.121] </span><span class="c-green">✓ bypass module loaded</span>` },
  { t: 240,  html: `<span class="c-dim">[    0.243] </span><span class="c-green">✓ executor module loaded</span>` },
  { t: 360,  html: `<span class="c-dim">[    0.364] </span><span class="c-green">✓ stealth module loaded</span>` },
  { t: 480,  html: `<span class="c-dim">[    0.485] </span><span class="c-pink">✓ byfron nullifier ready</span>` },
  { t: 600,  html: `<span class="c-dim">[    0.606] </span><span class="c-white">scanning for roblox process...</span>` },
  { t: 900,  html: `<span class="c-dim">[    0.901] </span><span class="c-yellow">⚠  roblox not running — use 'scan' after launch</span>` },
  { t: 1050, html: `<span class="c-dim">[    1.052] </span><span class="c-green">✓ ready</span>` },
  { t: 1200, html: `<span class="c-dim">─────────────────────────────────────────</span>` },
  { t: 1300, html: `<span class="c-dim">type </span><span class="c-blue">help</span><span class="c-dim"> to get started</span>` },
];

bootLines.forEach(({ t, html }) => {
  setTimeout(() => {
    printLines(html);
    scrollBottom();
  }, t);
});

// focus input after boot
setTimeout(() => input.focus(), 1400);
