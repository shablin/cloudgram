import { br, b } from '../../cloudgram/format.js'

export default async function help(ctx) {
    const message = [
        "So, there're available commands:",
        br(2),
        b("Basic 🥱"), br(),
        "/start — show start message", br(),
        "/help — show this message (with commands)", br(2),
        b("Features Demo 👀"), br(),
        "/keyboards — a short demo of keyboards"
    ]

    await ctx.replyHTML(message)
}