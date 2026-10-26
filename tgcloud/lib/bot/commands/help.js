export default async function help(ctx) {
    ctx.reply([
        "*BASICS*",
        "/start — start the bot",
        "/help — show available commands"
    ].join("\n"), { parse_mode: "Markdown" })
}