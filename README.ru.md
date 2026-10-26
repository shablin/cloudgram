<p align="center">
  <img src="assets/logo.PNG" alt="Cloudgram Logo" width="256">
  <br>
  <br>
  <b>Легковесный JavaScript-шаблон</b>
  <br>
  <b>для разработки ботов на платформе Telegram Serverless</b>
  <br>
  <br>
  <i>Заинтересованы? Узнайте подробнее о <a href="https://core.telegram.org/bots/serverless">Telegram Serverless</a></i>
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/release/shablin/cloudgram?style=for-the-badge&color=blue" alt="Release">
  <img src="https://img.shields.io/github/license/shablin/cloudgram?style=for-the-badge" alt="License">
</p>
<br>
<p align="center">
	<a href="./README.md">🇺🇸 English</a> | <b><a href="./README.ru.md">🇷🇺 Русский</a></b>
</p>

Этот шаблон стремится предоставить комфортный опыт при
создании Telegram-ботов на платформе Telegram Serverless.
Проект вдохновлён известными существующими библиотеками для
разработки ботов и претендует стать лёгким и удобным
инструментом

## Как использовать этот шаблон

1. Щёлкните по кнопке **Use this template** справа от
   названия репозитория, или клонируйте его:
```bash
git clone https://github.com/shablin/cloudgram.git your-bot
```

2. Установите зависимости:
```bash
npm install
```

### Авторизация/подключение бота
Получение доступа для CLI возможно с помощью специального
токена от BotFather: BotFather → your bot → Serverless → CLI
Access → Access token Токен выглядит таким образом:
`app<id>:<secret>`, — и это не основной API токен вашего
бота

Далее запустите:
```bash
npx tgcloud login
```

Вставьте токен, когда это потребуется. Он хранится в
`.tgcloud/` и никогда не будет показан снова
