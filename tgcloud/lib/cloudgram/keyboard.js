export const cb    = (text, data, style)   => ({ text, callback_data: data, style: style });
export const url   = (text, href, style)   => ({ text, url: href, style: style  });
export const web   = (text, href, style)   => ({ text, web_app: { url: href }, style: style });
export const sw    = (text, query)  => ({ text, switch_inline_query: query });
export const swCur = (text)         => ({ text, switch_inline_query_current_chat: '' });
export const login = (text, href)   => ({ text, login_url: { url: href } });

export function inlineKeyboard(rows) {
    return { inline_keyboard: rows.map(normalizeRow) };
}

export function markupKeyboard(rows, opts = {}) {
    return { keyboard: rows.map(normalizeRow), ...opts };
}

export function remove() {
    return { remove_keyboard: true };
}

export function forceMarkupKeyboard(opts = {}) {
    return { force_reply: true, ...opts };
}

function normalizeRow(row) {
    return row.map(normalizeButton);
}

function normalizeButton(b) {
    return typeof b === 'string' ? { text: b } : b;
}