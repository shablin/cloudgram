import { bold, italic, link, join, lines, code } from "../../cloudgram/format.js"
import { debug } from "../../utils.js"

export default async function start(ctx) {
    const message = lines(
        bold("👋 Welcome!"),
        "",
        join(
            "It's a simple bot built on", link("Cloudgram", "https://github.com/shablin/cloudgram"),
        ),
        "",
        join(
            bold("Cloudgram"), "is a lightweight JavaScript starter template",
            "for building Telegram bots on",
            link("Telegram Serverless", "https://core.telegram.org/bots/serverless"),
        ),
        "",
        join(
            bold("Quick Start"),
        ),
        "",
        "1. Open", code("tgcloud/lib/bot/commands/start.js"), "to edit this message",
        "2. You can add new commands in tgcloud/lib/bot/routes.js",
        "",
        italic("Use /help to see available commands")
    )

    debug(JSON.stringify(message))

    await ctx.replyHTML(message)
}