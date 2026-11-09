import { bot } from "../cloudgram/bot.js"
import { cb, inlineKeyboard } from "../cloudgram/keyboard.js"
import { sendStarsInvoice } from '../cloudgram/payments/stars.js'

import start from "./commands/start.js"
import help from "./commands/help.js"
import keyboards from "./commands/keyboards.js"
import payments from "./commands/payment.js"

// Commands

bot.command('start', start)
bot.command('help', help)
bot.command('keyboards', keyboards)
bot.command('payment', payments)

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

bot.callback('payments_5stars', async (ctx) => {
    await ctx.answer()
    await ctx.delete()
    
    await sendStarsInvoice(
        ctx.chat.id, {
            title: 'Support Cloudgram',
            description: "If you want to support this project, you can give me the stars",
            stars: 5,
            payload: 'test-order-1',
            photoUrl: "https://img.magnific.com/premium-vector/hand-heart-emoji-icon_363897-5334.jpg"
        }
    )
})

bot.callback('payments_10stars', async (ctx) => {
    await ctx.answer()
    await ctx.delete()
    
    await sendStarsInvoice(
        ctx.chat.id, {
            title: 'Support Cloudgram',
            description: "If you want to support this project, you can give me the stars",
            stars: 10,
            payload: 'test-order-1',
            photoUrl: "https://img.magnific.com/premium-vector/hand-heart-emoji-icon_363897-5334.jpg"
        }
    )
})

bot.callback('payments_25stars', async (ctx) => {
    await ctx.answer()
    await ctx.delete()

    await sendStarsInvoice(
        ctx.chat.id, {
            title: 'Support Cloudgram',
            description: "If you want to support this project, you can give me the stars",
            stars: 25,
            payload: 'test-order-1',
            photoUrl: "https://img.magnific.com/premium-vector/hand-heart-emoji-icon_363897-5334.jpg"
        }
    )
})

bot.callback('payments_50stars', async (ctx) => {
    await ctx.answer()
    await ctx.delete()

    await sendStarsInvoice(
        ctx.chat.id, {
            title: 'Support Cloudgram',
            description: "If you want to support this project, you can give me the stars",
            stars: 50,
            payload: 'test-order-1',
            photoUrl: "https://img.magnific.com/premium-vector/hand-heart-emoji-icon_363897-5334.jpg"
        }
    )
})

bot.onUnknownCallback(async (ctx) => {
    await ctx.answer('unk callback')
})