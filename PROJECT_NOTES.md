# Muse Hardware Library — 项目备忘

## 域名决策（2026-10-08，域名研究 agent 结论）
- 首选：**musemade.io**，备选：musebuilds.io（可一起拿下防抢注）
- 7 个候选上一轮经注册局 RDAP 验证可注册；本次复核 whois/RDAP 被代理阻断——**下单前务必在注册商处再复核一次**
- 热度依据：绝对热度最高 "muse gadget(s)"（Meta 官方品牌词）；上升最快 "muse esp32" 及 ESP32 how-to 长尾（SERP 空白）
- 商标提醒：含 "Muse" 的域名有商标考量（Muse 商标归 Meta，shipwithmuse.live 有先例），上线前建议做一次风险评估

## 上线策略
- 先用 `*.vercel.app` 免费域名上线（明早 8 点前）
- 代码里 canonical / OG / sitemap 用环境变量 `NEXT_PUBLIC_SITE_URL` 控制，默认 vercel.app URL；绑定 musemade.io 后切变量即可，无需改代码

## ⛔ 唯一上线阻塞：GitHub 空仓库（需 jayden 亲手建）
- 原因：GitHub App 集成无建仓权限（API 返回 403），Vercel 部署又必须从 Git 仓库拉代码
- jayden 只需做一步（30 秒）：打开 github.com/new，Owner 选 Jayden72Huang，Repository name 填 `muse-hardware-lib`，Public，**不要勾选** README/gitignore/license，直接 Create
- 建完在 chat 里说一声，代码已本地 commit 好，推送+Vercel 部署 3 分钟内搞定

## 待 jayden 拍板（上线不阻塞，但要他知晓）
1. Tally 投稿表单链接（需他的 Tally 账号创建）
2. Newsletter 最终方案：默认 Resend（API key 现成），备选 Substack
3. 广告刊例价：$99/周（信息流原生）、$149/周（分类页横幅）、$299/期（Newsletter 赞助），可议
4. /advertise 联系邮箱
5. 域名 musemade.io 下单 + 商标风险评估
