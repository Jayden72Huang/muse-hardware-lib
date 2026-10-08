import type { Lang, LocalText, Shelf, SourceType } from "@/content/schema";

type Dict = Record<string, string>;

const en: Dict = {
  siteName: "Muse Hardware Library",
  tagline: "Real hardware built with Muse.",
  heroKicker: "Community case library",
  heroTitle: "What the community is building with Muse — in hardware.",
  heroSub:
    "ESP32 · M5Stack · Raspberry Pi · e-ink · smart home · robots. Curated builds with sources, BOMs and buy links.",
  searchPlaceholder: "Search builds, boards, sensors… (coming soon)",
  navHome: "Latest",
  navCategories: "Categories",
  navSubmit: "Submit",
  navAdvertise: "Advertise",
  latestBuilds: "Latest builds",
  buildNo: "Build №",
  by: "by",
  source: "Source",
  sponsored: "Sponsored",
  yourAdHere: "Your ad here",
  yourAdSub: "Reach hardware makers — see ad rates",
  browseCategories: "Browse by category",
  newsletterTitle: "Get new builds in your inbox",
  newsletterSub:
    "One short email when notable Muse hardware projects land. No spam, unsubscribe anytime.",
  emailPlaceholder: "you@example.com",
  subscribe: "Subscribe",
  subscribing: "Subscribing…",
  subscribeOk: "You're in! Check your inbox soon.",
  subscribeFail: "Something went wrong. Please try again.",
  subscribeInvalid: "Please enter a valid email address.",
  footerAbout:
    "An independent community library of hardware projects built with Meta Muse. Not affiliated with Meta.",
  footerExplore: "Explore",
  footerContribute: "Contribute",
  footerRights: "All rights reserved.",
  detailBom: "Bill of materials",
  detailHardware: "Hardware",
  detailDifficulty: "Build difficulty",
  difficultyHint: "1 = weekend project · 5 = hardcore",
  detailBuy: "Where to buy",
  detailQuoteFrom: "From the source",
  detailViewSource: "View original source",
  detailPublished: "Published",
  detailRelated: "Related builds",
  detailBack: "← All builds",
  emptyCategory: "No builds in this category yet — submit one!",
  emptyType: "No builds of this type yet.",
  faqTitle: "FAQ",
  submitTitle: "Submit a build",
  submitSub:
    "Found a hardware project built with Muse? Send it in. Every listing must link to a public source — that's our Receipts principle.",
  submitFields: "What to include",
  submitFieldLink: "Source link",
  submitFieldLinkDesc: "A public page: GitHub repo, video, article or social post.",
  submitFieldDesc: "One-line description",
  submitFieldDescDesc: "What it is and which hardware it runs on.",
  submitFieldType: "Source type",
  submitFieldTypeDesc: "GitHub / video / article / social.",
  submitFieldShelf: "Category",
  submitFieldShelfDesc: "Smart home, robots, wearables, dev boards, sensors, displays.",
  submitStandards: "Inclusion standards",
  submitStd1: "Must have a public source link. No link, no listing.",
  submitStd2: "We quote and summarize public sources; we don't vouch for unverified claims.",
  submitStd3: "Rumored or link-less projects stay out until confirmed.",
  submitStd4: "Hardware focus: it must run on a physical device.",
  submitFormSoon: "Submission form launching soon",
  submitFormSoonDesc:
    "We're wiring up the form. Meanwhile, send your link to the contact email below.",
  submitEmailFallback: "In a hurry? Email us directly at",
  submitEmailFallbackSuffix: "with your project link and a one-line intro.",
  advertiseTitle: "Advertise to hardware makers",
  advertiseSub:
    "Your product in front of people who actually solder. Transparent rates, no auctions, no dark patterns.",
  tierFeed: "Native in-feed card",
  tierFeedDesc: "Blends into the build feed, labeled Sponsored. Seen by every visitor.",
  tierBanner: "Category banner",
  tierBannerDesc: "Top banner on a category page your buyers already browse.",
  tierNewsletter: "Newsletter sponsorship",
  tierNewsletterDesc: "One dedicated slot in the new-builds email.",
  perWeek: "/ week",
  perIssue: "/ issue",
  negotiable: "Prices negotiable — talk to us.",
  advertiseContact: "Get in touch",
  advertiseContactDesc:
    "Tell us what you sell and where you want to appear. We reply within 2 business days.",
  formName: "Name",
  formEmail: "Email",
  formMessage: "What do you want to promote?",
  formSend: "Send inquiry",
  formThanks: "Thanks! Your email client should open with the inquiry ready to send.",
  formOpenEmail: "Or email us directly:",
  stripeNote: "Self-serve Stripe checkout is coming in phase two.",
  langSwitch: "中文",
  skipToContent: "Skip to content",
  submitProjectName: "Project name",
  submitSourceUrl: "Source link",
  submitOneLiner: "One-line intro",
  submitSourceType: "Source type",
  submitShelf: "Hardware category",
  submitContactEmail: "Contact email (optional)",
  submitSubmit: "Submit",
  submitSending: "Submitting…",
  submitSuccessTitle: "Received! 🎉",
  submitSuccessBody:
    "Our editors review every submission against the Receipts principle: it must link to a public source. If it passes, we'll write it up bilingually and it goes live with the next deploy — usually within 1–3 days.",
  submitFail: "Submission failed. Please try again.",
  errRequired: "Please fill in all required fields.",
  errBadUrl: "Please enter a valid http(s) URL.",
  errTooLong: "The one-line intro must be 200 characters or fewer.",
  errBadType: "Invalid source type.",
  errBadShelf: "Invalid hardware category.",
  errBadEmail: "Please enter a valid email address.",
  errServer: "Something went wrong on our end. Please try again later.",
};

const zh: Dict = {
  siteName: "Muse 硬件案例库",
  tagline: "用 Muse 做出来的真实硬件。",
  heroKicker: "社区案例库",
  heroTitle: "看看社区用 Muse 做出了哪些硬件。",
  heroSub:
    "ESP32 · M5Stack · 树莓派 · 墨水屏 · 智能家居 · 机器人。每个案例都有来源、BOM 清单和购买链接。",
  searchPlaceholder: "搜索案例、开发板、传感器……（即将上线）",
  navHome: "最新",
  navCategories: "分类",
  navSubmit: "投稿",
  navAdvertise: "广告",
  latestBuilds: "最新案例",
  buildNo: "案例 №",
  by: "作者",
  source: "来源",
  sponsored: "赞助",
  yourAdHere: "你的广告可以出现在这里",
  yourAdSub: "触达真正的硬件玩家 — 查看刊例价",
  browseCategories: "按分类浏览",
  newsletterTitle: "新案例邮件通知",
  newsletterSub: "有值得关注的 Muse 硬件项目时，发一封短邮件给你。不打扰，可随时退订。",
  emailPlaceholder: "you@example.com",
  subscribe: "订阅",
  subscribing: "订阅中…",
  subscribeOk: "订阅成功！请留意收件箱。",
  subscribeFail: "出了点问题，请稍后再试。",
  subscribeInvalid: "请输入有效的邮箱地址。",
  footerAbout: "独立的社区案例库，收录用 Meta Muse 打造的硬件项目。与 Meta 无关。",
  footerExplore: "探索",
  footerContribute: "参与",
  footerRights: "版权所有。",
  detailBom: "BOM 物料清单",
  detailHardware: "硬件型号",
  detailDifficulty: "复刻难度",
  difficultyHint: "1 = 周末小项目 · 5 = 硬核",
  detailBuy: "购买链接",
  detailQuoteFrom: "原文引用",
  detailViewSource: "查看原文",
  detailPublished: "发布日期",
  detailRelated: "同类相关",
  detailBack: "← 全部案例",
  emptyCategory: "这个分类还没有案例 — 快来投稿！",
  emptyType: "这种来源类型还没有案例。",
  faqTitle: "常见问题",
  submitTitle: "投稿",
  submitSub:
    "发现了用 Muse 做的硬件项目？投过来。每条收录必须附公开来源链接 —— 这是我们的 Receipts 原则。",
  submitFields: "投稿需要包含",
  submitFieldLink: "来源链接",
  submitFieldLinkDesc: "公开页面：GitHub 仓库、视频、文章或社交媒体帖子。",
  submitFieldDesc: "一句话描述",
  submitFieldDescDesc: "这是什么、跑在什么硬件上。",
  submitFieldType: "来源类型",
  submitFieldTypeDesc: "GitHub / 视频 / 文章 / 社交媒体。",
  submitFieldShelf: "分类",
  submitFieldShelfDesc: "智能家居、机器人、可穿戴、开发板实战、传感器、显示与墨水屏。",
  submitStandards: "收录标准",
  submitStd1: "必须有公开来源链接。没有链接，不收录。",
  submitStd2: "我们引用并转述公开来源，不为未经核实的数据背书。",
  submitStd3: "听说类、无链接的项目，先不上，等确认。",
  submitStd4: "聚焦硬件：必须跑在真实物理设备上。",
  submitFormSoon: "投稿表单即将上线",
  submitFormSoonDesc: "表单正在接入中。你可以先把链接发到下面的联系邮箱。",
  submitEmailFallback: "着急投稿？直接发邮件到",
  submitEmailFallbackSuffix: "，附上项目链接+一句话介绍。",
  advertiseTitle: "向硬件玩家推广",
  advertiseSub: "你的产品，直接触达真正会拿起电烙铁的人。明码标价，无暗拍、无套路。",
  tierFeed: "信息流原生广告位",
  tierFeedDesc: "融入案例信息流，标注「赞助」。每个访客都会看到。",
  tierBanner: "分类页横幅",
  tierBannerDesc: "出现在买家本来就在逛的分类页顶部。",
  tierNewsletter: "Newsletter 赞助位",
  tierNewsletterDesc: "新案例邮件中的一个专属推荐位。",
  perWeek: " / 周",
  perIssue: " / 期",
  negotiable: "价格可议 — 来聊聊。",
  advertiseContact: "联系我们",
  advertiseContactDesc: "告诉我们你要推广什么、想出现在哪里。2 个工作日内回复。",
  formName: "姓名",
  formEmail: "邮箱",
  formMessage: "想推广什么？",
  formSend: "发送咨询",
  formThanks: "谢谢！你的邮件客户端应该已经打开，咨询内容已填好，直接发送即可。",
  formOpenEmail: "或直接发邮件：",
  stripeNote: "Stripe 自助购买第二期上线。",
  langSwitch: "EN",
  skipToContent: "跳到正文",
  submitProjectName: "项目名",
  submitSourceUrl: "来源链接",
  submitOneLiner: "一句话介绍",
  submitSourceType: "来源类型",
  submitShelf: "硬件分类",
  submitContactEmail: "联系邮箱（选填）",
  submitSubmit: "提交投稿",
  submitSending: "提交中…",
  submitSuccessTitle: "收到啦！🎉",
  submitSuccessBody:
    "编辑会按 Receipts 原则审核每条投稿：必须有公开来源链接。审核通过后，我们会做成双语案例，随下次部署上线——一般 1–3 天。",
  submitFail: "提交失败，请重试。",
  errRequired: "请填写所有必填项。",
  errBadUrl: "请输入合法的 http(s) 链接。",
  errTooLong: "一句话介绍不能超过 200 字。",
  errBadType: "来源类型不合法。",
  errBadShelf: "硬件分类不合法。",
  errBadEmail: "请输入合法的邮箱地址。",
  errServer: "服务器开小差了，请稍后再试。",
};

export const SHELF_FAQ: Record<Shelf, { q: LocalText; a: LocalText }[]> = {
  "smart-home": [
    {
      q: { en: "Can Muse control my smart home devices?", zh: "Muse 能控制我家的智能家居设备吗？" },
      a: {
        en: "Yes — via the Home Assistant add-on and community integrations, Muse can read sensors and trigger automations through Home Assistant. Check the builds below for working setups.",
        zh: "可以 —— 通过 Home Assistant 插件和社区集成，Muse 可以读取传感器并触发自动化。下面的案例里有能跑通的方案。",
      },
    },
    {
      q: { en: "Do I need a Home Assistant server?", zh: "需要一台 Home Assistant 服务器吗？" },
      a: {
        en: "For the full integration, yes — Home Assistant runs on a Raspberry Pi or any always-on machine, and the Muse gadget talks to it over your local network.",
        zh: "完整集成需要 —— Home Assistant 跑在树莓派或任何常开主机上，Muse 硬件通过局域网和它通信。",
      },
    },
    {
      q: { en: "Does it work with Xiaomi / Mijia devices?", zh: "支持米家设备吗？" },
      a: {
        en: "Indirectly: if your Mijia devices are bridged into Home Assistant, Muse can control them the same way. Native Mijia support is a community wishlist item.",
        zh: "间接支持：如果米家设备已经接入 Home Assistant，Muse 就能同样控制。原生米家支持还在社区愿望单上。",
      },
    },
    {
      q: { en: "Is my voice data sent to the cloud?", zh: "语音数据会上传云端吗？" },
      a: {
        en: "Muse gadgets stream audio to Meta's servers for understanding, like other voice assistants. Self-hosted STT alternatives exist — see the ha-muse-stt build.",
        zh: "和其他语音助手一样，Muse 硬件会把音频传到 Meta 服务器做理解。也有自部署的 STT 替代方案 —— 看 ha-muse-stt 案例。",
      },
    },
  ],
  robots: [
    {
      q: { en: "What is StackChan?", zh: "StackChan 是什么？" },
      a: {
        en: "StackChan (スタックチャン) is an open-source desktop robot kit for M5Stack cores — a cute face on a screen, servos for the head, and a big Japanese maker community. Several builds pair it with Muse.",
        zh: "StackChan（スタックチャン）是 M5Stack 的开源桌面机器人套件 —— 屏幕上的可爱表情、头部舵机，背后是一个庞大的日本创客社区。好几个案例把它和 Muse 接在了一起。",
      },
    },
    {
      q: { en: "How hard is it to build a Muse robot?", zh: "做一个 Muse 机器人有多难？" },
      a: {
        en: "A basic StackChan + Muse setup is a weekend project if you can flash firmware. Custom servo choreography and offline fallbacks push it to a 3–4 star build.",
        zh: "刷过固件的话，基础版 StackChan + Muse 一个周末就能跑起来。自定义舵机动作和离线兜底会让难度到 3–4 星。",
      },
    },
    {
      q: { en: "Can the robot speak my language?", zh: "机器人能说中文/粤语吗？" },
      a: {
        en: "Muse's voice output follows the language you speak to it. Community demos include Cantonese via cloned voices — see the StackChan Cantonese demo build.",
        zh: "Muse 会跟着你说的语言回复。社区里有用克隆声音讲粤语的演示 —— 看 StackChan 粤语演示案例。",
      },
    },
  ],
  wearable: [
    {
      q: { en: "What counts as a Muse wearable?", zh: "什么样的算 Muse 可穿戴？" },
      a: {
        en: "Anything you wear or carry: e-ink companions that stick to your phone, DIY charms, smartwatch-style ESP32 builds. If Muse runs on it and it moves with you, it belongs here.",
        zh: "戴在身上或随身带的都算：贴在手机背面的墨水屏伴侣、DIY 挂件、手表形态的 ESP32。只要跑着 Muse、跟着你走，就属于这里。",
      },
    },
    {
      q: { en: "How is battery life on these tiny devices?", zh: "这些小设备的续航怎么样？" },
      a: {
        en: "E-ink builds sip power and can last days; always-listening voice builds need daily charging. Check each build's BOM notes for real-world numbers.",
        zh: "墨水屏方案非常省电，能撑好几天；常开听音的语音方案基本一天一充。每个案例的 BOM 备注里有实测数据。",
      },
    },
    {
      q: { en: "DIY Muse charm vs the official one?", zh: "DIY 的 Muse 挂件和官方版有什么区别？" },
      a: {
        en: "The official Muse charm ships with polished industrial design; DIY builds trade polish for hackability — custom faces, buttons and sensors. Same Muse brain either way.",
        zh: "官方挂件工业设计更精致；DIY 版牺牲精致度换来可玩性 —— 自定义表情、按键和传感器。跑的都是同一个 Muse 大脑。",
      },
    },
  ],
  "dev-boards": [
    {
      q: { en: "Which ESP32 board should I start with?", zh: "新手该选哪块 ESP32 开发板？" },
      a: {
        en: "ESP32-S3 boards are the sweet spot: enough PSRAM for voice, wide community support. The official gadget SDK targets S3 first; C6/C3 builds exist but need more tinkering.",
        zh: "ESP32-S3 是甜点区：PSRAM 够跑语音，社区支持最广。官方 gadget SDK 优先支持 S3；C6/C3 也有案例，但要多折腾。",
      },
    },
    {
      q: { en: "How do I flash Muse firmware onto ESP32?", zh: "怎么把 Muse 固件烧进 ESP32？" },
      a: {
        en: "Most builds use the web flasher from the gadget SDK repo or esptool.py. You'll need a Muse developer token for pairing — the SDK README walks through it.",
        zh: "多数案例用 gadget SDK 仓库的网页烧录器或 esptool.py。配对需要 Muse 开发者 token，SDK 的 README 里有步骤。",
      },
    },
    {
      q: { en: "M5Stack vs Waveshare for Muse?", zh: "M5Stack 和 Waveshare 选哪个？" },
      a: {
        en: "M5Stack has the bigger ecosystem (StackChan, CoreS3, StickS3) and more community ports. Waveshare's AMOLED touch boards are cheaper and great displays. Both appear in builds below.",
        zh: "M5Stack 生态更大（StackChan、CoreS3、StickS3），社区移植最多。Waveshare 的 AMOLED 触屏板更便宜、屏幕素质好。下面的案例里两者都有。",
      },
    },
    {
      q: { en: "Can I run Muse on a Raspberry Pi?", zh: "树莓派能跑 Muse 吗？" },
      a: {
        en: "Yes — Meta ships a Linux SDK, and the community runs full Muse gadgets on Raspberry Pi 5, often as Home Assistant companions.",
        zh: "可以 —— Meta 官方有 Linux SDK，社区在树莓派 5 上跑完整 Muse，常和 Home Assistant 搭配。",
      },
    },
  ],
  sensors: [
    {
      q: { en: "What sensors work with Muse gadgets?", zh: "Muse 硬件能接哪些传感器？" },
      a: {
        en: "Anything the ESP32 can read — temperature/humidity (BME280), motion, light, air quality. The gadget SDK exposes sensor data so Muse can answer questions about it.",
        zh: "ESP32 能读的都行 —— 温湿度（BME280）、人体感应、光照、空气质量。gadget SDK 把传感器数据开放给 Muse，它就能回答相关问题。",
      },
    },
    {
      q: { en: "Can Muse alert me when a sensor triggers?", zh: "传感器触发时 Muse 能提醒我吗？" },
      a: {
        en: "Yes — builds like the Waveshare SDK demo use proactive push: the device speaks up when something happens instead of waiting for a question.",
        zh: "可以 —— 像 Waveshare SDK 演示那样用主动推送：有情况设备会主动开口，而不是等你问。",
      },
    },
    {
      q: { en: "Do I need to write firmware for sensors?", zh: "接传感器要自己写固件吗？" },
      a: {
        en: "For common I2C sensors, usually just config, not code — the SDK examples cover BME280-class devices. Exotic sensors need a small driver.",
        zh: "常见 I2C 传感器一般只需改配置不用写代码，SDK 示例覆盖了 BME280 这类。冷门传感器要写个小驱动。",
      },
    },
  ],
  displays: [
    {
      q: { en: "Why e-ink for a Muse companion?", zh: "为什么 Muse 伴侣都用墨水屏？" },
      a: {
        en: "E-ink is readable in sunlight, sips battery, and looks like paper on your desk. Perfect for an always-on Muse status display or morning briefing device.",
        zh: "墨水屏阳光下可读、极其省电、放在桌上像纸一样。做常开的 Muse 状态屏或晨间简报机再合适不过。",
      },
    },
    {
      q: { en: "Can Muse show images on the display?", zh: "Muse 能在屏幕上显示图片吗？" },
      a: {
        en: "Gadgets can render UI cards — text, simple graphics and expressions. Full image rendering depends on the board; AMOLED builds do animation, e-ink builds do static cards.",
        zh: "Gadget 可以渲染 UI 卡片 —— 文字、简单图形和表情。完整图片渲染看板子：AMOLED 版能做动画，墨水屏版做静态卡片。",
      },
    },
    {
      q: { en: "Which e-ink board works with Muse?", zh: "哪块墨水屏开发板能跑 Muse？" },
      a: {
        en: "Community favorites: Xteink X4 Pro (the Muse Pocket build), LilyGo T5 series, and Seeed's reTerminal E1002 color e-ink from the official examples.",
        zh: "社区热门：Xteink X4 Pro（Muse Pocket 案例）、LilyGo T5 系列，以及官方示例里的 Seeed reTerminal E1002 彩色墨水屏。",
      },
    },
    {
      q: { en: "E-ink refresh is slow — is it usable?", zh: "墨水屏刷新慢，真的能用吗？" },
      a: {
        en: "For glanceable info — weather, calendar, Muse status — yes. It's not for video or fast animation; that's what the AMOLED builds are for.",
        zh: "看天气、日历、Muse 状态这类扫一眼的信息，完全够用。它不适合视频和快动画 —— 那是 AMOLED 案例的地盘。",
      },
    },
  ],
};

export function t(lang: Lang, key: string): string {
  const d = lang === "zh" ? zh : en;
  return d[key] ?? en[key] ?? key;
}

export function shelfName(shelf: Shelf, lang: Lang): string {
  const names: Record<Shelf, { en: string; zh: string }> = {
    "smart-home": { en: "Smart Home", zh: "智能家居" },
    robots: { en: "Robots", zh: "机器人" },
    wearable: { en: "Wearables", zh: "可穿戴" },
    "dev-boards": { en: "Dev Boards in Action", zh: "开发板实战" },
    sensors: { en: "Sensors", zh: "传感器" },
    displays: { en: "Displays & E-Ink", zh: "显示与墨水屏" },
  };
  return names[shelf][lang];
}

export function typeName(type: SourceType, lang: Lang): string {
  const names: Record<SourceType, { en: string; zh: string }> = {
    github: { en: "GitHub", zh: "GitHub 开源" },
    video: { en: "Video", zh: "视频" },
    article: { en: "Article", zh: "文章" },
    social: { en: "Social", zh: "社交媒体" },
  };
  return names[type][lang];
}
