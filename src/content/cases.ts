// 17 verified launch cases (from ~/workspace/hardware-case-library/cases.md).
// Numbering: 0001 = oldest known publish date. GitHub repo created_at dates are
// grounded via the GitHub API (2026-10-08). The 3 social posts have estimated
// dates (2026-10-01, marked below) because Instagram/Threads block scraping.
// Iron rules observed: no invented prices/quotes/experiences; every case has a
// real public sourceUrl; editorial summaries are third-person paraphrase.
import type { CaseStudy } from "./schema";

export const CASES: CaseStudy[] = [
  {
    slug: "ha-muse-stt",
    number: "0001",
    shelf: "smart-home",
    sourceType: "github",
    sourceUrl: "https://github.com/zraken/ha-muse-stt",
    title: {
      en: "Muse Voice Transcribe as a Home Assistant STT Engine",
      zh: "把 Muse 语音转写做成 Home Assistant 的 STT 引擎",
    },
    summary: {
      en: "A HACS custom integration that makes Muse's realtime speech-to-text the voice engine of any Home Assistant Assist pipeline.",
      zh: "一个 HACS 自定义集成，让 Muse 的实时语音转写成为任何 Home Assistant Assist 语音管线的转写引擎。",
    },
    description: {
      en: "Muse Voice Transcribe for Home Assistant wires Meta's realtime WebSocket speech-to-text API into Home Assistant as a native STT engine. Once selected in an Assist pipeline, voice commands are transcribed frame-by-frame while you speak — with interim results and no intermediate services. It is installed via HACS and configured with a Meta Model API key.",
      zh: "这个 Home Assistant 自定义集成把 Meta 的实时 WebSocket 语音转写 API 接成了原生 STT 引擎。在 Assist 管线里选定后，说话的同时逐帧转写、有中间结果、不经过任何中转服务。通过 HACS 安装，用 Meta Model API key 配置。",
    },
    author: { name: "zraken", url: "https://github.com/zraken" },
    date: "2026-09-20",
    hardware: ["Home Assistant", "Meta Model API"],
    bom: [
      {
        item: {
          en: "Home Assistant instance (any host)",
          zh: "Home Assistant 实例（任意主机）",
        },
      },
      {
        item: {
          en: "Meta Model API key",
          zh: "Meta Model API 密钥",
        },
      },
    ],
    difficulty: 2,
    buyLinks: [],
    quote: {
      en: "Select Muse Voice Transcribe as the STT engine of any Assist pipeline and your voice commands are transcribed by Muse's realtime WebSocket API.",
      zh: "把 Muse Voice Transcribe 选为任何 Assist 管线的 STT 引擎，你的语音指令就由 Muse 的实时 WebSocket API 转写。",
      by: "zraken (README)",
    },
    officialReference: "Home Assistant Voice Preview Edition",
  },
  {
    // Date estimated: Instagram reels block scraping; research collected 2026-10-08.
    slug: "muse-tamagotchi-erik-taveras",
    number: "0002",
    shelf: "wearable",
    sourceType: "social",
    sourceUrl: "https://www.instagram.com/reel/DeCsA2CJDMD/",
    title: {
      en: "Muse Tamagotchi: a White Lamb Muse on ESP32-S3",
      zh: "Muse 电子宠物：一只白色小羊住进 ESP32-S3",
    },
    summary: {
      en: "A Tamagotchi-style Muse pet — a little white lamb — running on a $18.99 Hosyond ESP32-S3 board with a 2.8-inch screen.",
      zh: "电子宠物形态的 Muse：一只白色小羊，跑在一块 18.99 美元的 Hosyond ESP32-S3 开发板上，配 2.8 寸屏幕。",
    },
    description: {
      en: "Creator Erik Taveras built a Tamagotchi-style companion for Muse: a white lamb character living on a Hosyond ESP32-S3 board with a 2.8-inch display. It shows the pocket-pet direction of the Muse gadget community — cheap commodity ESP32-S3 screens turned into AI companions. The build was shared as an Instagram reel.",
      zh: "创作者 Erik Taveras 做了一个电子宠物形态的 Muse 伴侣：一只白色小羊，住在带 2.8 寸屏的 Hosyond ESP32-S3 板子上。这代表了 Muse gadget 社区的一个方向——用廉价的 ESP32-S3 屏幕做 AI 伴侣。该作品以 Instagram reel 形式分享。",
    },
    author: { name: "Erik Taveras" },
    date: "2026-10-01",
    hardware: ["Hosyond ESP32-S3", "2.8-inch display"],
    bom: [
      {
        item: {
          en: "Hosyond ESP32-S3 board with 2.8-inch screen",
          zh: "Hosyond ESP32-S3 开发板（带 2.8 寸屏）",
        },
        cost: "$18.99",
      },
    ],
    difficulty: 3,
    buyLinks: [],
    officialReference: "AiPi Lite",
  },
  {
    // Date estimated: Instagram reels block scraping; research collected 2026-10-08.
    slug: "muse-tamagotchi-harper-carroll",
    number: "0003",
    shelf: "wearable",
    sourceType: "social",
    sourceUrl: "https://www.instagram.com/reel/DeFPKoBpbW3/",
    title: {
      en: "Building a Muse Tamagotchi on a Round AMOLED",
      zh: "在圆形 AMOLED 上做一只 Muse 电子宠物",
    },
    summary: {
      en: "A creator with 660K followers picked up a Waveshare round AMOLED screen to build her own Muse Tamagotchi — documented in a build-plan reel.",
      zh: "一位 66 万粉博主买了一块微雪圆形 AMOLED 屏，计划做一只 Muse 电子宠物——以制作计划 reel 记录。",
    },
    description: {
      en: "Creator Harper Carroll (660K followers) bought a Waveshare round AMOLED display specifically to build a Muse Tamagotchi. The reel documents the build plan rather than a finished device — a sign of how fast round-screen ESP32 boards are becoming the default canvas for Muse pets. It pairs naturally with community firmware ports for round AMOLED boards.",
      zh: "博主 Harper Carroll（66 万粉丝）专门买了一块微雪圆形 AMOLED 屏来做 Muse 电子宠物。这条 reel 记录的是制作计划而非成品——说明圆形屏 ESP32 开发板正迅速成为 Muse 宠物类项目的默认画布。它与社区为圆形 AMOLED 板做的固件移植天然搭配。",
    },
    author: { name: "Harper Carroll" },
    date: "2026-10-01",
    hardware: ["Waveshare round AMOLED display", "ESP32-S3"],
    bom: [
      {
        item: {
          en: "Waveshare round AMOLED display board",
          zh: "微雪圆形 AMOLED 显示屏开发板",
        },
      },
    ],
    difficulty: 3,
    buyLinks: [],
    officialReference: "Waveshare ESP32-S3-Touch-AMOLED-1.75C",
  },
  {
    // Date estimated: Threads blocks scraping; research collected 2026-10-08.
    slug: "stackchan-muse-cantonese-demo",
    number: "0004",
    shelf: "robots",
    sourceType: "social",
    sourceUrl: "https://www.threads.com/@dennisngcyeung/post/DeEsOzugNxK",
    title: {
      en: "StackChan + Muse Speaking Cantonese",
      zh: "StackChan + Muse 讲粤语演示",
    },
    summary: {
      en: "A StackChan robot running Muse with a Gemini TTS-cloned voice, checking calendars and reading emails — in Cantonese.",
      zh: "StackChan 机器人跑 Muse，配 Gemini TTS 克隆的声音讲粤语：查日历、读邮件。",
    },
    description: {
      en: "Shared by @dennisngcyeung on Threads, this demo pairs the M5Stack StackChan robot with Muse and a Gemini TTS voice clone, and has it handle calendar checks and email reading in Cantonese. It shows how little it takes to localize a Muse gadget — the voice layer is swappable, and a regional-language demo is a full project on its own.",
      zh: "@dennisngcyeung 在 Threads 分享的演示：M5Stack StackChan 机器人接入 Muse，配上 Gemini TTS 克隆的声音，用粤语查日历、读邮件。它说明给 Muse gadget 做本地化成本很低——语音层可替换，一个方言演示本身就是一个完整项目。",
    },
    author: {
      name: "dennisngcyeung",
      url: "https://www.threads.com/@dennisngcyeung",
    },
    date: "2026-10-01",
    hardware: ["M5Stack StackChan", "Muse Gadget SDK", "Gemini TTS"],
    bom: [
      {
        item: {
          en: "M5Stack StackChan robot kit",
          zh: "M5Stack StackChan 机器人套件",
        },
      },
      {
        item: {
          en: "Muse SDK token + Gemini TTS voice",
          zh: "Muse SDK token + Gemini TTS 声音",
        },
      },
    ],
    difficulty: 4,
    buyLinks: [],
    officialReference: "M5Stack StickS3",
  },
  {
    slug: "musechan",
    number: "0005",
    shelf: "robots",
    sourceType: "github",
    sourceUrl: "https://github.com/Tjtelenda/musechan",
    title: {
      en: "MuseChan: Muse on the M5Stack StackChan Robot",
      zh: "MuseChan：Muse 住进 M5Stack StackChan 桌面机器人",
    },
    summary: {
      en: "Meta's Muse gadget SDK ported to the M5Stack StackChan (CoreS3) — head servos, live expressions, pet reactions, and over-the-air outfit updates.",
      zh: "把 Meta Muse gadget SDK 移植到 M5Stack StackChan（CoreS3）：头部舵机、实时表情、宠物反应，还支持 OTA 换装。",
    },
    description: {
      en: "MuseChan is a fork of Meta's muse-gadget-sdk that adds the M5Stack StackChan (CoreS3) board: head servos, pet reactions, live face and head device commands, plus over-the-air outfit updates. A CoreS3-only build with the robot harness compiled out is included. The repo ships MUSECHAN.md as the starting guide and AGENT-RULES.md as an operating contract for Muse itself.",
      zh: "MuseChan 是 Meta muse-gadget-sdk 的一个 fork，新增了 M5Stack StackChan（CoreS3）板级支持：头部舵机、宠物反应、实时表情与头部控制指令，以及 OTA 换装。还附带一个去掉机器人线束的纯 CoreS3 构建。仓库以 MUSECHAN.md 为上手指南，AGENT-RULES.md 则是给 Muse 本身的操作契约。",
    },
    author: { name: "Tjtelenda", url: "https://github.com/Tjtelenda" },
    date: "2026-10-02",
    hardware: ["M5Stack StackChan", "M5Stack CoreS3", "Servo motors"],
    bom: [
      {
        item: {
          en: "M5Stack CoreS3",
          zh: "M5Stack CoreS3",
        },
      },
      {
        item: {
          en: "StackChan robot parts (servos, printed shell)",
          zh: "StackChan 机器人配件（舵机、打印外壳）",
        },
      },
    ],
    difficulty: 4,
    buyLinks: [],
    quote: {
      en: "This tree adds the M5Stack StackChan (CoreS3) board, head servos, pet reactions, live face/head device commands, and over-the-air outfit updates.",
      zh: "这个分支新增了 M5Stack StackChan（CoreS3）板级支持、头部舵机、宠物反应、实时表情/头部控制指令，以及 OTA 换装。",
      by: "Tjtelenda (README)",
    },
    officialReference: "M5Stack StickS3",
  },
  {
    slug: "muse-pocket",
    number: "0006",
    shelf: "displays",
    sourceType: "github",
    sourceUrl: "https://github.com/viticci/muse-pocket",
    title: {
      en: "Muse Pocket: an E-Paper Companion on the Xteink X4 Pro",
      zh: "Muse Pocket：Xteink X4 Pro 墨水屏上的随身 Muse",
    },
    summary: {
      en: "MacStories' Federico Viticci turned the Xteink X4 Pro e-reader into an e-paper Muse companion — character, status, settings, recoverable SD firmware updates.",
      zh: "MacStories 的 Federico Viticci 把 Xteink X4 Pro 墨水屏阅读器变成 Muse 随身伴侣：角色形象、状态、设置，可通过 SD 卡恢复的固件更新。",
    },
    description: {
      en: "Muse Pocket repurposes an Xteink X4 Pro e-reader as a small e-paper companion for Muse: it shows the Muse character, name and short status updates, with settings for brightness, warmth, refresh speed, orientation and sleep. Installation goes through CrossPoint's SD firmware updater, so it never needs the reader's magnetic USB adapter. Built by Federico Viticci of MacStories on Meta's Muse Gadget SDK.",
      zh: "Muse Pocket 把 Xteink X4 Pro 墨水屏阅读器改造成 Muse 的随身小伴侣：显示 Muse 角色形象、名字和简短状态，支持亮度、色温、刷新速度、方向和休眠设置。安装走 CrossPoint 的 SD 卡固件更新器，不需要阅读器的磁吸 USB 线。由 MacStories 的 Federico Viticci 基于 Meta Muse Gadget SDK 制作。",
    },
    author: { name: "Federico Viticci", url: "https://github.com/viticci" },
    date: "2026-10-02",
    hardware: ["Xteink X4 Pro", "microSD card"],
    bom: [
      {
        item: {
          en: "Xteink X4 Pro e-reader (the plain X4/X3 use different hardware)",
          zh: "Xteink X4 Pro 墨水屏阅读器（普通 X4/X3 硬件不同）",
        },
      },
      {
        item: {
          en: "microSD card + Wi-Fi",
          zh: "microSD 卡 + Wi-Fi",
        },
      },
    ],
    difficulty: 4,
    buyLinks: [],
    quote: {
      en: "Turn an Xteink X4 Pro e-reader into a small e-paper companion for your Muse.",
      zh: "把一台 Xteink X4 Pro 墨水屏阅读器变成你的 Muse 随身小伴侣。",
      by: "Federico Viticci (README)",
    },
    officialReference: "Seeed reTerminal E1002",
  },
  {
    slug: "muse-r1",
    number: "0007",
    shelf: "dev-boards",
    sourceType: "github",
    sourceUrl: "https://github.com/cameronapak/muse-r1",
    title: {
      en: "Muse r1: the Rabbit r1 Resurrected as a Muse Gadget",
      zh: "Muse r1：把 Rabbit r1 复活成 Muse 按压通话硬件",
    },
    summary: {
      en: "A native Android Home app that turns a Rabbit r1 running LineageOS 21 into a push-to-talk Muse gadget.",
      zh: "一个原生 Android Home 应用，把刷了 LineageOS 21 的 Rabbit r1 变成按压通话的 Muse 硬件。",
    },
    description: {
      en: "Muse r1 is a native Android Home app, tested on LineageOS 21 / Android 14, that resurrects the Rabbit r1 as a Muse gadget. Hold the side button, speak, release — Muse replies with text and Android reads it aloud. The README is explicit about tradeoffs: installing LineageOS wipes the device and reduces boot-chain security, and the setup guide includes a rollback path. It is not RabbitOS, nor an official Rabbit or Meta app.",
      zh: "Muse r1 是一个原生 Android Home 应用，在 LineageOS 21 / Android 14 上测试过，让 Rabbit r1 以 Muse gadget 的身份复活。按住侧边键说话、松开，Muse 以文字回复、Android 朗读出来。README 把代价写得很清楚：刷 LineageOS 会清空设备并降低启动链安全，安装指南里附带回滚方案。它不是 RabbitOS，也不是 Rabbit 或 Meta 的官方应用。",
    },
    author: { name: "cameronapak", url: "https://github.com/cameronapak" },
    date: "2026-10-03",
    hardware: ["Rabbit r1", "LineageOS 21 / Android 14"],
    bom: [
      {
        item: {
          en: "Rabbit r1 with unlocked bootloader",
          zh: "Rabbit r1（已解锁 bootloader）",
        },
      },
      {
        item: {
          en: "LineageOS 21 build for r1",
          zh: "适用于 r1 的 LineageOS 21 构建",
        },
      },
    ],
    difficulty: 5,
    buyLinks: [],
    quote: {
      en: "Turn a Rabbit r1 into a push-to-talk Muse gadget. Hold the side button, speak, and release.",
      zh: "把 Rabbit r1 变成按压通话的 Muse gadget。按住侧边键，说话，松开。",
      by: "cameronapak (README)",
    },
  },
  {
    slug: "muse-gadget-xiaozhi",
    number: "0008",
    shelf: "dev-boards",
    sourceType: "github",
    sourceUrl: "https://github.com/moerdowo/muse-gadget-xiaozhi",
    title: {
      en: "Muse Gadget UI on China's XiaoZhi Voice Hardware",
      zh: "国产小智语音硬件上跑 Muse Gadget UI",
    },
    summary: {
      en: "Meta's Muse gadget UI — pixel character, push-to-talk, captions — rewired to talk to the xiaozhi.me voice AI on ESP32-S3. No Muse account needed.",
      zh: "Meta Muse Gadget 的 UI（像素小人、按压通话、字幕）被接到国产小智 xiaozhi.me 语音 AI 上，跑在 ESP32-S3。不需要 Muse 账号。",
    },
    description: {
      en: "This project takes Meta's Muse Gadget firmware — the pixel character, push-to-talk and touch settings — and rewires it to the xiaozhi.me voice AI (xiaozhi-esp32) instead of Muse. Hold the button, ask, let go: xiaozhi hears it, thinks, and answers out loud with the reply captioned on screen sentence by sentence. Tested on the Waveshare ESP32-S3-Touch-AMOLED-1.8. No Muse account, Muse app, or SDK token is required.",
      zh: "这个项目把 Meta Muse Gadget 的固件——像素小人、按压通话、触屏设置——改接到国产小智 xiaozhi.me 语音 AI（xiaozhi-esp32），而不是 Muse。按住按键提问、松开，小智听见、思考、大声回答，回复逐句显示字幕。已在微雪 ESP32-S3-Touch-AMOLED-1.8 上测试。不需要 Muse 账号、Muse App 或 SDK token。",
    },
    author: { name: "moerdowo", url: "https://github.com/moerdowo" },
    date: "2026-10-03",
    hardware: ["ESP32-S3", "Waveshare ESP32-S3-Touch-AMOLED-1.8", "xiaozhi.me hardware"],
    bom: [
      {
        item: {
          en: "ESP32-S3 board (tested on Waveshare ESP32-S3-Touch-AMOLED-1.8) or xiaozhi voice hardware",
          zh: "ESP32-S3 开发板（已在微雪 ESP32-S3-Touch-AMOLED-1.8 测试）或小智语音硬件",
        },
      },
    ],
    difficulty: 2,
    buyLinks: [],
    quote: {
      en: "You don't need a Muse account, the Muse app or an SDK token.",
      zh: "你不需要 Muse 账号、Muse App 或 SDK token。",
      by: "moerdowo (README)",
    },
    officialReference: "Waveshare ESP32-S3-Touch-AMOLED-1.75C",
  },
  {
    slug: "muse-ai-passport",
    number: "0009",
    shelf: "wearable",
    sourceType: "github",
    sourceUrl: "https://github.com/timzenxia/muse-ai-passport",
    title: {
      en: "Muse on the FoloToy AI Passport (ESP32-C3 Wearable)",
      zh: "Muse 登上 FoloToy AI Passport（ESP32-C3 可穿戴）",
    },
    summary: {
      en: "An unofficial port of Meta's Muse Gadget SDK firmware to the open ESP32-C3 FoloToy AI Passport: push-to-talk with Muse, replies captioned in Chinese too.",
      zh: "把 Meta Muse Gadget SDK 固件非官方移植到开源 ESP32-C3 可穿戴设备 FoloToy AI Passport：按压和 Muse 通话，回复带中文字幕。",
    },
    description: {
      en: "This is an unofficial, community port of Meta's Muse Gadget SDK ESP32 firmware to the FoloToy AI Passport, an open ESP32-C3 wearable. Pair it with the Muse app, hold a button to talk, and read Muse's reply on its screen — in Chinese too. The port tracks upstream main and has already fed two fixes back upstream (a pairing fix and CJK captions); the board itself is under review in an upstream PR.",
      zh: "这是把 Meta Muse Gadget SDK 的 ESP32 固件非官方移植到 FoloToy AI Passport——一款开源 ESP32-C3 可穿戴设备。与 Muse App 配对后，按住按键说话，在小屏幕上读 Muse 的回复，中文也可以。该移植紧跟上游 main 分支，并已向上游回馈了两个修复（配对修复和 CJK 字幕）；板级支持本身正在上游 PR 审核中。",
    },
    author: { name: "timzenxia", url: "https://github.com/timzenxia" },
    date: "2026-10-03",
    hardware: ["FoloToy AI Passport", "ESP32-C3"],
    bom: [
      {
        item: {
          en: "FoloToy AI Passport (open ESP32-C3 wearable)",
          zh: "FoloToy AI Passport（开源 ESP32-C3 可穿戴）",
        },
      },
    ],
    difficulty: 3,
    buyLinks: [],
    quote: {
      en: "Pair it with the Muse app, hold a button to talk, and read Muse's reply on its screen, in Chinese too.",
      zh: "与 Muse App 配对，按住按键说话，在它的屏幕上读 Muse 的回复，中文也可以。",
      by: "timzenxia (README)",
    },
    officialReference: "AiPi Lite",
  },
  {
    slug: "homeassistant-addon-muse-gadget",
    number: "0010",
    shelf: "smart-home",
    sourceType: "github",
    sourceUrl: "https://github.com/Josh-Archer/homeassistant-addon-muse-gadget",
    title: {
      en: "Home Assistant Add-on: Muse Gadget Bridge",
      zh: "Home Assistant 插件：Muse Gadget 桥接",
    },
    summary: {
      en: "A Home Assistant OS add-on that connects Meta Muse to your smart home with native tool calling — rooms, devices, energy, and notifications.",
      zh: "一个 Home Assistant OS 插件，把 Meta Muse 接进智能家居：原生工具调用，可查房间、设备、能耗、发通知。",
    },
    description: {
      en: "This repository provides Home Assistant OS add-ons that integrate Meta Muse personal AI agents with Home Assistant through the Muse Gadget SDK. The Muse Gadget add-on connects Home Assistant directly to your Muse agent with automatic chat priming, native tool calling (call_service, get_state, list_areas, get_energy, notify_muse, render_template and more), and 24/7 background persistence — control entire rooms with a single command.",
      zh: "这个仓库提供 Home Assistant OS 插件，通过 Muse Gadget SDK 把 Meta Muse 个人 AI 助手接入 Home Assistant。Muse Gadget 插件让 Home Assistant 直连你的 Muse：自动聊天预热、原生工具调用（call_service、get_state、list_areas、get_energy、notify_muse、render_template 等）、24/7 后台常驻——一句话控制整个房间。",
    },
    author: { name: "Josh-Archer", url: "https://github.com/Josh-Archer" },
    date: "2026-10-03",
    hardware: ["Home Assistant OS", "Always-on home server"],
    bom: [
      {
        item: {
          en: "Home Assistant OS on any always-on machine",
          zh: "跑在任意常开主机上的 Home Assistant OS",
        },
      },
      {
        item: {
          en: "Muse SDK token",
          zh: "Muse SDK token",
        },
      },
    ],
    difficulty: 2,
    buyLinks: [],
    quote: {
      en: "Connects Home Assistant directly to your Meta Muse agent with automatic chat priming, native tool calling, and 24/7 background persistence.",
      zh: "让 Home Assistant 直连你的 Meta Muse 助手：自动聊天预热、原生工具调用、24/7 后台常驻。",
      by: "Josh-Archer (README)",
    },
    officialReference: "Raspberry Pi 5 + Home Assistant",
  },
  {
    slug: "muse-arr",
    number: "0011",
    shelf: "smart-home",
    sourceType: "github",
    sourceUrl: "https://github.com/vocino/muse-arr",
    title: {
      en: "Muse-arr: Talk to Your Sonarr/Radarr/Jellyfin Media Stack",
      zh: "Muse-arr：直接跟 Muse 说话，指挥家里的 Sonarr/Radarr/Jellyfin",
    },
    summary: {
      en: "A Muse gadget on your home LAN that lets you queue movies and shows on Sonarr, Radarr and Jellyfin — just by talking to Muse. No SSH, no web UI.",
      zh: "家里局域网上的一个 Muse gadget，跟 Muse 说句话就能在 Sonarr、Radarr、Jellyfin 上排片追剧。不用 SSH，不用开网页。",
    },
    description: {
      en: "Muse-arr runs on any always-on Linux box on your home LAN via the Muse Gadgets Linux SDK. The gadget talks to Sonarr, Radarr and Jellyfin over plain HTTP using the same APIs their web UIs use, while holding an encrypted session to Muse over the internet — so your phone reaches your media stack through it. Bluetooth is only needed once, for pairing. The README notes a Muse invite code is required to join.",
      zh: "Muse-arr 跑在家里局域网任意常开的 Linux 主机上，基于 Muse Gadgets Linux SDK。它用和网页版相同的 HTTP API 跟 Sonarr、Radarr、Jellyfin 对话，同时与 Muse 保持加密会话——于是你的手机通过它就能指挥媒体库。蓝牙只在配对时用一次。README 提到加入需要 Muse 邀请码。",
    },
    author: { name: "vocino", url: "https://github.com/vocino" },
    date: "2026-10-03",
    hardware: ["Linux host (Raspberry Pi works)", "Sonarr", "Radarr", "Jellyfin"],
    bom: [
      {
        item: {
          en: "Always-on Linux box (e.g. Raspberry Pi)",
          zh: "常开的 Linux 主机（如树莓派）",
        },
      },
      {
        item: {
          en: "Sonarr / Radarr / Jellyfin stack",
          zh: "Sonarr / Radarr / Jellyfin 媒体栈",
        },
      },
    ],
    difficulty: 3,
    buyLinks: [],
    quote: {
      en: "You ask Muse for a movie. Muse tells the gadget. The gadget tells Radarr. Radarr grabs it. No SSH, no web UI.",
      zh: "你跟 Muse 要一部电影。Muse 告诉 gadget。gadget 告诉 Radarr。Radarr 去抓。不用 SSH，不用开网页。",
      by: "vocino (README)",
    },
  },
  {
    slug: "muse-gadget-core2",
    number: "0012",
    shelf: "dev-boards",
    sourceType: "github",
    sourceUrl: "https://github.com/crims0n/muse-gadget-core2",
    title: {
      en: "Muse Gadget SDK Ported to the M5Stack Core2",
      zh: "Muse Gadget SDK 移植到 M5Stack Core2",
    },
    summary: {
      en: "An unofficial community fork of Meta's Muse gadget SDK that adds an M5Stack Core2 (v1.0) port while tracking upstream.",
      zh: "Meta Muse gadget SDK 的非官方社区 fork，新增 M5Stack Core2（v1.0）移植，同时紧跟上游更新。",
    },
    description: {
      en: "This unofficial community fork of Meta's facebookincubator/muse-gadget-sdk adds an M5Stack Core2 port, with Core2 notes under esp32/devices. The fork's main branch tracks upstream, so Core2 users get upstream fixes while keeping their board support. The maintainer asks that Core2 problems be reported in this repo's issues, not upstream.",
      zh: "这是 Meta facebookincubator/muse-gadget-sdk 的非官方社区 fork，新增了 M5Stack Core2 移植，板级说明在 esp32/devices 下。fork 的 main 分支紧跟上游，Core2 用户既能拿到上游修复又不丢板级支持。维护者要求 Core2 相关问题报在这个仓库的 issue 里，不要去上游。",
    },
    author: { name: "crims0n", url: "https://github.com/crims0n" },
    date: "2026-10-03",
    hardware: ["M5Stack Core2 (v1.0)"],
    bom: [
      {
        item: {
          en: "M5Stack Core2 (v1.0)",
          zh: "M5Stack Core2（v1.0）",
        },
      },
    ],
    difficulty: 3,
    buyLinks: [],
    officialReference: "M5Stack StickS3",
  },
  {
    slug: "muse-gadget-sdk-community-fork",
    number: "0013",
    shelf: "dev-boards",
    sourceType: "github",
    sourceUrl: "https://github.com/ledienbien-ai/muse-gadget-sdk",
    title: {
      en: "Community SDK Fork: More ESP32-S3 Boards, Online Flashing",
      zh: "社区 SDK Fork：支持更多 ESP32-S3 板子，可在线刷机",
    },
    summary: {
      en: "A community fork of the Muse gadget SDK that adds ESP32-S3 boards upstream doesn't support yet — with online flashing, in English, 中文, Tiếng Việt, 日本語 and 한국어.",
      zh: "Muse gadget SDK 的社区 fork，新增上游尚不支持的 ESP32-S3 板子，支持在线刷机，文档有英文、中文、越南语、日语、韩语。",
    },
    description: {
      en: "Maintained by ledienbien-ai (DB_ROBOT), this fork adds ESP32-S3 boards the upstream ESP32 Device SDK doesn't support yet, and leaves the rest of the boards untouched. Each board runs the full on-screen UI — animated avatar, push-to-talk, touch settings — and the fork supports online flashing. The README is published in five languages (English, 中文, Tiếng Việt, 日本語, 한국어), a sign of where the community energy is.",
      zh: "由 ledienbien-ai（DB_ROBOT）维护，这个 fork 新增了上游 ESP32 Device SDK 尚不支持的 ESP32-S3 板子，其余板级支持原样保留。每块板子都跑完整屏上 UI——动画形象、按压通话、触屏设置——并且支持在线刷机。README 有五种语言版本（英文、中文、越南语、日语、韩语），可见社区热度在哪。",
    },
    author: { name: "ledienbien-ai", url: "https://github.com/ledienbien-ai" },
    date: "2026-10-03",
    hardware: ["ESP32-S3 (multiple community boards)"],
    bom: [
      {
        item: {
          en: "Any supported ESP32-S3 board (see the fork's board table)",
          zh: "任意受支持的 ESP32-S3 板子（见 fork 的板级表格）",
        },
      },
    ],
    difficulty: 2,
    buyLinks: [],
    quote: {
      en: "This fork adds ESP32-S3 boards that the upstream ESP32 Device SDK doesn't support yet.",
      zh: "这个 fork 新增了上游 ESP32 Device SDK 尚不支持的 ESP32-S3 板子。",
      by: "ledienbien-ai (README)",
    },
    officialReference: "Waveshare ESP32-S3-Touch-AMOLED-1.75C",
  },
  {
    slug: "waveshare-muse-gadget-sdk",
    number: "0014",
    shelf: "dev-boards",
    sourceType: "github",
    sourceUrl: "https://github.com/wupsbr/waveshare-muse-gadget-sdk",
    title: {
      en: "Muse Gadgets on Three Waveshare ESP32-S3 Boards",
      zh: "三块微雪 ESP32-S3 板子全跑上 Muse",
    },
    summary: {
      en: "Meta's Muse Gadget SDK on three round and square Waveshare ESP32-S3 boards — with spoken replies, proactive pushes, touch volume and battery level.",
      zh: "Meta Muse Gadget SDK 跑在三块圆形/方形微雪 ESP32-S3 板子上：语音回复、主动推送、触屏调音量、电池电量显示。",
    },
    description: {
      en: "This fork of facebookincubator/muse-gadget-sdk adds three Waveshare boards to the ESP32 Device SDK — the ESP32-S3-Touch-LCD-1.85C (in its round speaker enclosure), the round ESP32-S3-Touch-AMOLED-1.43C, and the square ESP32-S3-Touch-AMOLED-1.8 — plus features the upstream firmware doesn't have yet: spoken replies, pushes you didn't ask for, touch volume, and battery level on boards without a power chip.",
      zh: "这个 facebookincubator/muse-gadget-sdk 的 fork 给 ESP32 Device SDK 新增了三块微雪板子：ESP32-S3-Touch-LCD-1.85C（带圆形音箱外壳）、圆形 ESP32-S3-Touch-AMOLED-1.43C、方形 ESP32-S3-Touch-AMOLED-1.8，外加几个上游固件还没有的功能：语音回复、主动推送、触屏调音量、无电源芯片板子的电池电量显示。",
    },
    author: { name: "wupsbr", url: "https://github.com/wupsbr" },
    date: "2026-10-04",
    hardware: [
      "Waveshare ESP32-S3-Touch-LCD-1.85C",
      "Waveshare ESP32-S3-Touch-AMOLED-1.43C",
      "Waveshare ESP32-S3-Touch-AMOLED-1.8",
    ],
    bom: [
      {
        item: {
          en: "Waveshare ESP32-S3-Touch-LCD-1.85C (round, with speaker enclosure)",
          zh: "微雪 ESP32-S3-Touch-LCD-1.85C（圆形，带音箱外壳）",
        },
      },
      {
        item: {
          en: "Waveshare ESP32-S3-Touch-AMOLED-1.43C (round)",
          zh: "微雪 ESP32-S3-Touch-AMOLED-1.43C（圆形）",
        },
      },
      {
        item: {
          en: "Waveshare ESP32-S3-Touch-AMOLED-1.8 (square)",
          zh: "微雪 ESP32-S3-Touch-AMOLED-1.8（方形）",
        },
      },
    ],
    difficulty: 3,
    buyLinks: [],
    quote: {
      en: "Meta's Muse Gadget SDK, running on three round and square Waveshare ESP32-S3 boards — and talking back out loud.",
      zh: "Meta 的 Muse Gadget SDK，跑在三块圆形和方形的微雪 ESP32-S3 板子上——还会大声说话。",
      by: "wupsbr (README)",
    },
    officialReference: "Waveshare ESP32-S3-Touch-AMOLED-1.75C",
  },
  {
    slug: "muse-gadget-c6-n16",
    number: "0015",
    shelf: "dev-boards",
    sourceType: "github",
    sourceUrl: "https://github.com/assix/muse-gadget-c6-n16",
    title: {
      en: "Muse Gadget on a Generic ESP32-C6-N16 (No PSRAM)",
      zh: "在丐版 ESP32-C6-N16（无 PSRAM）上点亮 Muse",
    },
    summary: {
      en: "Bringing the Muse gadget SDK to a generic AliExpress ESP32-C6 module with no PSRAM — full bring-up notes, board overlay, and two upstream PRs.",
      zh: "把 Muse gadget SDK 带到一块某宝/速卖通丐版 ESP32-C6 模组（无 PSRAM）：完整点亮笔记、板级 overlay，还向上游提了两个 PR。",
    },
    description: {
      en: "This project brings Meta's muse-gadget-sdk to a generic AliExpress ESP32-C6-N16 module — 16 MB flash, no PSRAM — from a dead board to a paired device. The result: it boots, advertises BLE as MuseGadget-XXXXXX, pairs with the Muse Android app, joins Wi-Fi, and is OTA-ready. Along the way the author filed two upstream PRs: board support (#54) and LED GPIO as a Kconfig option (#55). The repo is a bring-up diary as much as a port.",
      zh: "这个项目把 Meta 的 muse-gadget-sdk 带到一块速卖通丐版 ESP32-C6-N16 模组上——16MB 闪存、无 PSRAM——从一块砖头做到可配对设备。结果：能启动、以 MuseGadget-XXXXXX 广播 BLE、与 Muse 安卓 App 配对、连 Wi-Fi、可 OTA。一路上作者还向上游提了两个 PR：板级支持（#54）和 LED GPIO 做成 Kconfig 选项（#55）。这个仓库既是移植，也是一份点亮日记。",
    },
    author: { name: "assix", url: "https://github.com/assix" },
    date: "2026-10-04",
    hardware: ["ESP32-C6-N16 (no PSRAM)", "Generic AliExpress module"],
    bom: [
      {
        item: {
          en: "Generic ESP32-C6-N16 devkit (16 MB flash, no PSRAM, native USB, RGB LED)",
          zh: "丐版 ESP32-C6-N16 开发板（16MB 闪存、无 PSRAM、原生 USB、RGB 灯）",
        },
      },
    ],
    difficulty: 4,
    buyLinks: [],
    quote: {
      en: "Boots, advertises BLE as MuseGadget-XXXXXX, pairs with the Muse Android app, joins Wi-Fi, OTA-ready.",
      zh: "能启动、以 MuseGadget-XXXXXX 广播 BLE、与 Muse 安卓 App 配对、连 Wi-Fi、可 OTA。",
      by: "assix (README)",
    },
  },
  {
    slug: "esp32-muse-agent",
    number: "0016",
    shelf: "dev-boards",
    sourceType: "github",
    sourceUrl: "https://github.com/jjenglert1/esp32-muse-agent",
    title: {
      en: "Pocket AI Agent for About $30: a Beginner's Build Guide",
      zh: "约 30 美元的口袋 AI Agent：新手保姆级教程",
    },
    summary: {
      en: "A step-by-step guide to turning a tiny touchscreen ESP32 into a pocket AI agent with an animated face — no soldering, no programming needed, about an hour.",
      zh: "保姆级教程：把一块带触屏的小 ESP32 变成口袋 AI Agent，带动画表情——不用焊接、不用会编程，约一小时搞定。",
    },
    description: {
      en: "This guide walks you through turning a tiny touchscreen gadget into a personal AI agent: hold a button, ask a question, and it answers out loud with a cute animated face. It runs on Meta's free, open-source Muse Gadget SDK, takes about an hour, and needs no soldering or programming experience. The recommended board is the Waveshare ESP32-S3-Touch-AMOLED-1.8 (V2), about $28 — the README warns to buy the V2, since some listings still describe the unsupported V1.",
      zh: "这份教程手把手教你把一块带触屏的小玩意变成个人 AI Agent：按住按键提问，它用可爱的动画表情大声回答。基于 Meta 免费开源的 Muse Gadget SDK，约一小时，不用焊接、不用会编程。推荐板子是微雪 ESP32-S3-Touch-AMOLED-1.8（V2），约 28 美元——README 提醒一定要买 V2，有些 listing 还在写不支持的 V1。",
    },
    author: { name: "jjenglert1", url: "https://github.com/jjenglert1" },
    date: "2026-10-04",
    hardware: ["Waveshare ESP32-S3-Touch-AMOLED-1.8 (V2)", "ESP32-S3"],
    bom: [
      {
        item: {
          en: "Waveshare ESP32-S3-Touch-AMOLED-1.8 (V2) — 1.8-inch AMOLED touchscreen, mic, speaker, battery connector",
          zh: "微雪 ESP32-S3-Touch-AMOLED-1.8（V2）——1.8 寸 AMOLED 触屏、麦克风、喇叭、电池接口",
        },
        cost: "~$28",
      },
    ],
    difficulty: 1,
    buyLinks: [
      {
        label: { en: "Waveshare official store", zh: "微雪官方店" },
        url: "https://www.waveshare.com/esp32-s3-touch-amoled-1.8.htm",
      },
    ],
    quote: {
      en: "Turn a tiny touchscreen gadget into a personal AI agent you can talk to.",
      zh: "把一块带触屏的小玩意变成你可以对话的个人 AI Agent。",
      by: "jjenglert1 (README)",
    },
    officialReference: "Waveshare ESP32-S3-Touch-AMOLED-1.75C",
  },
  {
    slug: "muse-gadget-psp",
    number: "0017",
    shelf: "dev-boards",
    sourceType: "github",
    sourceUrl: "https://github.com/wobsoriano/muse-gadget-psp",
    title: {
      en: "Muse Running Natively on a Sony PSP",
      zh: "索尼 PSP 原生运行 Muse",
    },
    summary: {
      en: "A native PSP app — written in C — that turns a PlayStation Portable into a Muse gadget: hold R, talk into the mic, Muse answers on screen and out loud.",
      zh: "一个原生 PSP 应用——C 语言写的——把 PlayStation Portable 变成 Muse gadget：按住 R 对着麦克风说话，Muse 在屏幕上显示、大声回答。",
    },
    description: {
      en: "This hobby project ports the Muse Gadget SDK to the Sony PSP in C. Everything runs on the PSP itself: the app holds its own encrypted session with Muse over Wi-Fi, sends your voice as a voice note, and speaks the reply. Hold R, talk into the built-in microphone, and Muse answers on screen and out loud through the speaker. Requirements are specific: a PSP-3000 (the 1000/2000 lack a mic), system software 6.61 with ARK custom firmware — which also enables the WPA2 Wi-Fi the stock firmware can't do. The README carries a clear disclaimer: not affiliated with Sony, Meta, or OpenAI; use at your own risk.",
      zh: "这个业余项目用 C 语言把 Muse Gadget SDK 移植到了索尼 PSP 上。一切都在 PSP 本机运行：应用通过 Wi-Fi 与 Muse 保持独立加密会话，把你的声音当语音消息发出去，再把回复念出来。按住 R 对着内置麦克风说话，Muse 在屏幕上显示、通过喇叭大声回答。要求很具体：PSP-3000（1000/2000 没有麦克风）、6.61 系统配 ARK 自制固件——ARK 还顺带解锁了原生固件不支持的 WPA2 Wi-Fi。README 有明确免责：与索尼、Meta、OpenAI 无关，后果自负。",
    },
    author: { name: "wobsoriano", url: "https://github.com/wobsoriano" },
    date: "2026-10-05",
    hardware: ["Sony PSP-3000 (PSP-3001 tested)", "ARK custom firmware 6.61"],
    bom: [
      {
        item: {
          en: "Sony PSP-3000 (the PSP-1000/2000 have no built-in microphone)",
          zh: "索尼 PSP-3000（PSP-1000/2000 没有内置麦克风）",
        },
      },
      {
        item: {
          en: "System software 6.61 with ARK custom firmware",
          zh: "6.61 系统 + ARK 自制固件",
        },
      },
    ],
    difficulty: 5,
    buyLinks: [],
    quote: {
      en: "Hold R, talk into the built-in microphone, and Muse answers on screen and out loud through the speaker.",
      zh: "按住 R，对着内置麦克风说话，Muse 在屏幕上显示、通过喇叭大声回答。",
      by: "wobsoriano (README)",
    },
  },
];

export function getCases(): CaseStudy[] {
  return [...CASES].sort((a, b) => b.date.localeCompare(a.date));
}

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function getRelated(c: CaseStudy, n = 4): CaseStudy[] {
  const scored = CASES.filter((x) => x.slug !== c.slug).map((x) => ({
    x,
    score:
      (x.shelf === c.shelf ? 2 : 0) +
      (x.sourceType === c.sourceType ? 1 : 0) +
      x.hardware.filter((h) => c.hardware.includes(h)).length,
  }));
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((s) => s.x);
}
