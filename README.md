<p align="center">
  <img src="assets/logo.PNG" alt="Cloudgram Logo" width="256">
  <br>
  <br>
  <b>A lightweight JavaScript starter template</b>
  <br>
  <b>for building Telegram bots on Telegram Serverless</b>
  <br>
  <br>
  <i>Sounds interesting? Check more about <a href="https://core.telegram.org/bots/serverless">Telegram Serverless</a></i>
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/release/shablin/cloudgram?style=for-the-badge&color=blue" alt="Release">
  <img src="https://img.shields.io/github/license/shablin/cloudgram?style=for-the-badge" alt="License">
</p>
<p align="center">
	<b><a href="./README.md">🇺🇸 English</a></b> | <a href="./README.ru.md">🇷🇺 Русский</a>
</p>


This template aims to provide a comfortable experience when
creating Telegram bots on the Telegram Serverless platform.
The project is inspired by well-known existing libraries for
bot development and claims to be a lightweight and
convenient tool. Cloudgram gives you a small routing layer on
top of the platform: commands, a context object, and a place
for your handlers — without hiding the SDK


## Use this template
1. Click **Use this template** in the header, or clone this
   repository:
```bash
git clone https://github.com/shablin/cloudgram.git your-bot
```

2. Install dependencies. This also installs the tgcloud CLI
   locally:
```bash
npm install
```

### Link your bot
Get the CLI access token from BotFather: BotFather → your
bot → Serverless → CLI Access → Access token It looks like
`app<id>:<secret>` and not the same as your bot's API token

Then run:
```bash
npx tgcloud login
```

Paste the token when prompt appears. It's stored in
`.tgcloud/` and never printed again
