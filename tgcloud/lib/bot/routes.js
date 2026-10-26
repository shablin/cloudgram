import { bot } from "../cloudgram/bot.js"

import start from "./commands/start.js"
import help from "./commands/help.js"

bot.command('start', start)
bot.command('help', help)

bot.onUnknownCommand(async (ctx) => {
    await ctx.reply('🤷‍♂️ Unknown command. Try /help to see available commands')
})