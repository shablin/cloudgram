import { b } from '../../cloudgram/format.js'
import { inlineKeyboard, cb } from '../../cloudgram/keyboard.js'
//import { sendStarsInvoice } from '../../cloudgram/payments/stars.js'

export default async function payments(ctx) {
    const message = [
        "In this demo of Telegram Payments API, you can support this project.",
        "Select the", b("quantity"), "of Telegram Stars using buttons below:"
    ]

    const keyboard = inlineKeyboard([
        [cb("5 ⭐", "payments_5stars", "default"), cb("10 ⭐", "payments_10stars", "default")],
        [cb("25 ⭐", "payments_25stars", "default"), cb("50 ⭐", "payments_50stars", "default")],
    ])

    await ctx.replyHTML(message, { reply_markup: keyboard })
}