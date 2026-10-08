# Design tokens — 对标 shipwithmuse.live（2026-10-08 实地扒取）

> 来源：https://shipwithmuse.live/ 首页 HTML + /assets/styles-*.css 的 :root / .dark 变量。
> 只借鉴设计语言，不抄内容、不抄 logo 图形。

## 主题：浅色（默认）

| token | 值 |
|---|---|
| --background | #fcfcfc |
| --foreground | #111112 |
| --card | #ffffff |
| --muted | #f3f4f5 |
| --muted-foreground | #6b6d71 |
| --border | #e6e6e7 |
| --primary | #0064d4（链接、按钮、hover） |
| --radius | 14px（卡片 rounded-[14px]，胶囊 rounded-full） |
| --sponsor-bg | #fbbf2414（琥珀 tint） |
| --sponsor-foreground | #a15c07 |
| 硬件 accent（本站自有） | #ea580c（№ 编号、硬件标签、特殊点缀） |

字体：Figtree Variable（Google Fonts，sans）；数字/№ 用 ui-monospace。
标题 tracking 紧（-0.02em），正文 15px / leading 1.45。

## 卡片结构（首页信息流）

1. 作者行：40px 圆形头像（作者首字母，accent 底）+ 右下角小圆徽（来源类型 icon）
   → 作者名 15px medium + @handle/来源域名 12px muted → 右侧外链箭头 icon（跳原文）
2. 一句话摘要：15px，foreground/90，leading 1.45
3. 配图：rounded-xl + border，16/10
4. Meta 行：№ mono 小徽 + 分类 chip + 难度星级 + 硬件标签
5. 标题：15px semibold，可点击（整卡 stretched-link 手感，hover 时标题变 primary 色）

## 信息流

- 响应式 grid：1 列（手机）/ 2 列（sm）/ 3 列（xl），gap-5
- 顶部 sticky 筛选条：pill 按钮（分类快速筛选，可选做）
- 每 8 张卡一张 Sponsored 原生卡（琥珀 tint 底，标注 Sponsored）
- 卡片 hover：shadow-md + border 加深（--dur-fast .25s）

## 导航/页脚

- Header：h-14，sticky，max-w-[1680px]；logo = 圆角方形（primary 底 + 波形 svg）+ wordmark（`muse` 前缀 foreground、`hardware` primary 色、`…` muted）
- Nav：Builds / Categories / Submit / Advertise，14px，muted → hover foreground
- Footer：浅色，多列链接 + 订阅框 + 版权行

## 详情页

- № mono + 来源徽 + 标题（大，tracking 紧）+ 作者/日期 meta
- 大配图（rounded-2xl border）
- 硬件区：BOM 表格（浅色条纹）、难度星级、购买链接按钮（primary）
- 原文引用块：左侧 primary 边框的 blockquote
- 相关推荐：同款小卡片 grid
