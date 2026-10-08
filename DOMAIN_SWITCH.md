# 绑定 musemade.io 时的切换清单（一页纸）

当前上线用 `*.vercel.app` 免费域名。所有 canonical / OG / sitemap / JSON-LD 都走
`NEXT_PUBLIC_SITE_URL`（见 `src/content/config.ts`），切换正式域名只需下面 3 步，
**不用改代码**。

## 1. 环境变量（Vercel 项目设置）
在 Vercel → Project → Settings → Environment Variables 设置：
`NEXT_PUBLIC_SITE_URL=https://musemade.io`，然后 Redeploy（Production）。

## 2. Vercel 绑定域名
Vercel → Project → Settings → Domains → Add `musemade.io`（+ `www.musemade.io` 可选），
按提示在域名注册商处加 DNS 记录（A / CNAME 由 Vercel 给出，不要套用旧 IP）。

## 3. 搜索与 AI 引用
- Google Search Console：添加新域名资源，提交 `https://musemade.io/sitemap.xml`
- 更新 `public/llms.txt` 里的绝对链接前缀（当前写的是 vercel.app 域名）
- 旧 vercel.app 域名建议保留做 301 跳转到新域名（Vercel Domains 里配置 Redirect），
  避免已收录 URL 变成死链

## 商标提醒
含 "Muse" 的域名有商标考量（Muse 商标归 Meta，shipwithmuse.live 有先例）。
建议绑定前做一次风险评估；whois/RDAP 下单前在注册商处复核一次。
