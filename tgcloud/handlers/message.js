// handlers/message.js — runs on each `message` update. The file name is the
// Telegram update type; the platform calls the default export with the matching
// payload (here, a Message). The full update is available as `ctx.update`.

import { bot } from "../lib/cloudgram/bot.js"
import { debug } from "../lib/utils.js"
import "../lib/bot/routes.js"


export default async function (message, ctx) {
  debug(
    `NEW MESSAGE`,
    `cid: ${message.chat.id}`,
    `message: ${message.text}`
  )
  
  await bot.handleMessage(message)
}
