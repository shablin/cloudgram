import { bot } from "../cloudgram/bot.js"

import start from "./commands/start.js"
import help from "./commands/help.js"
import keyboards from "./commands/keyboards.js"

bot.command('start', start)
bot.command('help', help)
bot.command('keyboards', keyboards)

bot.onUnknownCommand(async (ctx) => {
    await ctx.reply('🤷‍♂️ Unknown command. Try /help to see available commands')
})