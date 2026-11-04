import { i, h, b, br, c, a, sp, s, u } from "../../cloudgram/format.js"
import { inlineKeyboard, cb, url, sw, swCur } from "../../cloudgram/keyboard.js";

export default async function keyboards(ctx) {
    const message = [
        "Here is a short demonstration of how I can make different buttons:"
    ]

    const keyboard = inlineKeyboard([
        [
            cb("Left", "kb_left_cb", "danger"),
            cb("Right", "kb_right_cb", "success")
        ],
        [url("Link", "https://github.com/shablin/cloudgram", "primary")],
        [sw("Share", "I love Cloudgram ♥"), swCur("Reply in this chat")],
    ])

    // const keyboard = markupKeyboard([
    //     ['Button 1', 'Button 2'],
    //     ['Button 3']
    // ], { input_field_placeholder: 'Name?' })

    await ctx.replyHTML(
        message, {
            reply_markup: keyboard,
    })
}