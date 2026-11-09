import { api, BotApiError } from "sdk"

export async function sendStarsInvoice(chatId, {
    title,
    photoUrl,
    description,
    payload,
    stars,
    photoWidth,
    photoHeight,
}) {
    if (!Number.isInteger(stars) || stars <= 0) {
        throw new TypeError("stars must be a positive integer")
    }

    return api.sendInvoice({
        chat_id: chatId,
        title,
        description,
        payload,
        currency: 'XTR',
        prices: [{ label: title, amount: stars }],
        ...(photoUrl ? {
        photo_url: photoUrl,
        ...(photoWidth ? { photo_width: photoWidth } : {}),
        ...(photoHeight ? { photo_height: photoHeight } : {}),
        } : {}),
  })
}