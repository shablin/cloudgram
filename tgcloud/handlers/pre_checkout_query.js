import { api } from "sdk"

export default async function (query) {
    const ok = true // test

    if (!ok) {
        return api.answerPreCheckoutQuery({
            pre_checkout_query_id: query.id,
            ok: false,
            error_message: "All goods sold out. Try again later..."
        })
    }

    return api.answerPreCheckoutQuery({
        pre_checkout_query_id: query.id,
        ok: true
    })
}