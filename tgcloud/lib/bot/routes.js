import { bot } from "../cloudgram/bot.js"

import start from "./commands/start.js"
import help from "./commands/help.js"
import keyboards from "./commands/keyboards.js"
import { cb, inlineKeyboard } from "../cloudgram/keyboard.js"

// Commands

bot.command('start', start)
bot.command('help', help)
bot.command('keyboards', keyboards)

bot.onUnknownCommand(async (ctx) => {
    await ctx.reply('🤷‍♂️ Unknown command. Try /help to see available commands')
})

// Callbacks

bot.callback('kb_left_cb', async (ctx) => {
    await ctx.answer()
    await ctx.reply("RED!")
})

bot.callback('kb_right_cb', async (ctx) => {
    const kb = inlineKeyboard([
        [
            cb("Yes", "kb_right_yes"),
            cb("Hell no!", "kb_right_no")
        ]
    ])

    await ctx.answer("You choose Right 🟢")
    
    await ctx.edit("Are you sure?")
    await ctx.editInlineKeyboard(kb)
})

bot.callback('kb_right_yes', async (ctx) => {
    await ctx.answer()
    await ctx.delete()
    await ctx.reply("Thank you!")
})

bot.callback('kb_right_no', async (ctx) => {
    await ctx.answer()
    await ctx.delete()
    await ctx.reply("Okay. Bye.")
})

bot.onUnknownCallback(async (ctx) => {
    await ctx.answer('unk callback')
})