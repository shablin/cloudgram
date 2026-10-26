export default async function start(ctx) {
    await ctx.reply([
        "👋 *Welcome!*",
        "It's a simple bot built on [Cloudgram](https://github.com/shablin/cloudgram)",
        "",
        "*Cloudgram* is a lightweight JavaScript starter template",
        "for building Telegram bots on [Telegram Serverless](https://core.telegram.org/bots/serverless)",
        "developed by @mesmerizor",
        "",
        "*Quick Start*",
        "",
        "1. Open `tgcloud/lib/bot/commands/start.js` to edit this message",
        "2. You can add new commands in `tgcloud/lib/bot/routes.js`",
        "",
        '_Use /help to see available commands_',
    ].join('\n'), { parse_mode: "Markdown" })
}