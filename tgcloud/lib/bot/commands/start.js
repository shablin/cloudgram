//import { bold, italic, link, join, lines, code } from "../../cloudgram/format.js"
import { i, h, b, br, c, a } from "../../cloudgram/format.js"
import { debug } from "../../utils.js"

export default async function start(ctx) {
    const message = [
        h("👋 Welcome!"),
        "It's a simple bot built on",
        a({ href: "https://github.com/shablin/cloudgram" }, "Cloudgram"),
        br(2),
        b("Cloudgram"), "is a lightweight JavaScript starter template",
        "developed by @mesmerizor for building Telegram bots on",
        a({ href: "https://core.telegram.org/bots/serverless" }, "Telegram Serverless"),
        br(3),
        h("Quick Start"),
        "1. Open", c("tgcloud/lib/bot/commands/start.js"), "to edit this message",
        br(),
        "2. You can register new commands in", c("tgcloud/lib/bot/routes.js"),
        br(2),
        i("Use /help to see available commands")
    ]

    debug(JSON.stringify(message))

    await ctx.replyHTML(message)
}