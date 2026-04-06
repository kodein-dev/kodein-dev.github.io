const T = {
  en: {
    motd_desc: 'roblox injector',
    motd_hint: "type 'help' to see available commands",

    help_title: 'available commands',
    h_help:     'show this help',
    h_about:    'about kodein',
    h_features: 'list all features',
    h_inject:   'start injection',
    h_scan:     'scan for roblox process',
    h_scripts:  'browse & select scripts',
    h_status:   'show current status',
    h_faq:      'frequently asked questions',
    h_download: 'download info',
    h_clear:    'clear terminal',
    h_lang:     'switch language',

    about_desc: 'roblox process injector',
    about_p:    'attaches to roblox, bypasses byfron/hyperion, executes lua. free forever.',

    feat_title: 'features',
    f1: 'kernel-level process injection',
    f2: 'byfron + hyperion bypass, updated hourly',
    f3: 'full lua 5.1 executor built-in',
    f4: 'auto-inject on roblox launch',
    f5: 'hidden from task manager & av scanners',
    f6: 'no key system, no discord, no paywall',

    status_title: 'system status',

    scan_start: 'scanning for RobloxPlayerBeta.exe...',
    scan_found: 'process found',

    scripts_title: 'script library',
    scripts_hint:  'select a script to inject:',
    script_selected: 'selected',

    inj_busy:    'injection already in progress',
    inj_no_proc: 'process not found',
    inj_hint:    "run 'scan' first, then 'inject'",
    inj_start:   'injecting',
    inj_done:    'injection complete —',

    ps1: 'attaching to process...',
    ps2: 'bypassing byfron...',
    ps3: 'writing payload...',
    ps4: 'executing script...',
    pd1: 'process attached',
    pd2: 'byfron bypassed — undetected',
    pd3: 'payload written — 0 errors',
    pd4: 'script executed',

    dl_title: 'download',
    dl_warn:  'antivirus will flag this — false positive',
    dl_fix:   'add to av exclusions before running',

    q1: "what's the difference between an injector and an executor?",
    a1: "an executor runs lua inside an already-injected env. an injector does the actual process attachment and memory write. kodein does both.",
    q2: 'is kodein free?',
    a2: 'yes. no key system, no discord, no premium, no subscription. everything free forever.',
    q3: 'will i get banned?',
    a3: 'kodein updates within hours of any roblox patch. zero bans reported. use at your own risk.',
    q4: 'why does av flag it?',
    a4: "process injection looks like malware to heuristic av. it's a false positive. add to exclusions.",
    q5: 'what scripts can i run?',
    a5: 'any lua script. built-in library has esp, aimbot, speed, fly, noclip, autofarm and more.',

    cmd_not_found: 'command not found',
  },

  ru: {
    motd_desc: 'инжектор для roblox',
    motd_hint: "введи 'help' для списка команд",

    help_title: 'доступные команды',
    h_help:     'показать эту справку',
    h_about:    'о kodein',
    h_features: 'список всех функций',
    h_inject:   'начать инжекцию',
    h_scan:     'найти процесс roblox',
    h_scripts:  'выбрать скрипт',
    h_status:   'текущий статус',
    h_faq:      'частые вопросы',
    h_download: 'информация о загрузке',
    h_clear:    'очистить терминал',
    h_lang:     'сменить язык',

    about_desc: 'инжектор процессов roblox',
    about_p:    'подключается к roblox, обходит byfron/hyperion, выполняет lua. бесплатно навсегда.',

    feat_title: 'функции',
    f1: 'инжекция на уровне ядра',
    f2: 'обход byfron + hyperion, обновляется ежечасно',
    f3: 'встроенный lua 5.1 экзекутор',
    f4: 'авто-инжект при запуске roblox',
    f5: 'скрыт от диспетчера задач и av',
    f6: 'без ключей, без discord, без пейволла',

    status_title: 'статус системы',

    scan_start: 'поиск RobloxPlayerBeta.exe...',
    scan_found: 'процесс найден',

    scripts_title: 'библиотека скриптов',
    scripts_hint:  'выбери скрипт для инжекта:',
    script_selected: 'выбран',

    inj_busy:    'инжекция уже выполняется',
    inj_no_proc: 'процесс не найден',
    inj_hint:    "сначала запусти 'scan', потом 'inject'",
    inj_start:   'инжектирую',
    inj_done:    'инжекция завершена —',

    ps1: 'подключение к процессу...',
    ps2: 'обход byfron...',
    ps3: 'запись пейлоада...',
    ps4: 'выполнение скрипта...',
    pd1: 'процесс подключён',
    pd2: 'byfron обойден — необнаружен',
    pd3: 'пейлоад записан — 0 ошибок',
    pd4: 'скрипт выполнен',

    dl_title: 'загрузка',
    dl_warn:  'антивирус сработает — ложное срабатывание',
    dl_fix:   'добавь в исключения av перед запуском',

    q1: 'в чём разница между инжектором и экзекутором?',
    a1: 'экзекутор запускает lua внутри уже инжектированной среды. инжектор занимается подключением к процессу и записью в память. kodein делает оба.',
    q2: 'kodein бесплатен?',
    a2: 'да. без ключей, без discord, без премиума, без подписки. всё бесплатно навсегда.',
    q3: 'меня забанят?',
    a3: 'kodein обновляется в течение нескольких часов после любого патча roblox. ноль банов. используй на свой страх и риск.',
    q4: 'почему av ругается?',
    a4: 'инжекция процессов выглядит как малварь для эвристических av. это ложное срабатывание. добавь в исключения.',
    q5: 'какие скрипты можно запускать?',
    a5: 'любые lua скрипты. встроенная библиотека: esp, аимбот, скорость, полёт, ноклип, авто-фарм и другие.',

    cmd_not_found: 'команда не найдена',
  }
};
