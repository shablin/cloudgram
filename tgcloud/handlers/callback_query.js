import { bot } from "../lib/cloudgram/bot.js";
import '../lib/bot/routes.js'

export default async function (callbackQuery, ctx) {
    await bot.handleCallbackQuery(callbackQuery)
}