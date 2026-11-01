import { api } from 'sdk';
import { render } from './format.js'
import { debug } from '../utils.js';

export class Context {
	constructor(message, command = "no!") {
		this.message = message;
		this.command = command;
		this.api = api;
	}
	
	get chat() { return this.message.chat; }
	get from() { return this.message.from; }
	get text() { return this.message.text; }
	
	async reply(text, extra = {}) {
		await api.sendMessage({
			chat_id: this.message.chat.id,
			text: text,
			...extra,
		});
	}
	
	async replyHTML(node, extra = {}) {
		debug(JSON.stringify(node))
		const message  = render(node)
		
		return await this.reply(
			message,
			{ parse_mode: "HTML", ...extra }
		)
	}
}

export class CallbackContext {
	constructor(callback) {
		this.callback = callback
		this.api = api
	}

	get id()		{ return this.callback.id }
	get data()		{ return this.callback.data ?? '' }
	get from()		{ return this.callback.from }
	get message()	{ return this.callback.message }
	get chat()		{ return this.callback.message?.chat }

	async reply(text, extra = {}) {
		await api.sendMessage({
			chat_id: this.message.chat.id,
			text: text,
			...extra,
		});
	}

	async replyHTML(node, extra = {}) {
		debug(JSON.stringify(node))
		const message  = render(node)
		
		return await this.reply(
			message,
			{ parse_mode: "HTML", ...extra }
		)
	}

	async answer(textOrOpts, extra = {}) {
		const opts = typeof textOrOpts === 'object' && textOrOpts !== null
			? textOrOpts
			: extra
		const text = typeof textOrOpts === 'string' ? textOrOpts : undefined

		return this.api.answerCallbackQuery({
			callback_query_id: this.callback.id,
			...(text !== undefined ? { text } : {}),
			...opts
		})
	}

	async edit(text, extra = {}) {
		return this.api.editMessageText({
			chat_id: this.chat.id,
			message_id: this.message.message_id,
			text,
			...extra
		})
	}

	async editInlineKeyboard(keyboard) {
		const reply_markup = keyboard ?? { inline_keyboard: [] }
		return this.api.editMessageReplyMarkup({
			chat_id: this.chat.id,
			message_id: this.message.message_id,
			reply_markup
		})
	}

	async delete() {
		return this.api.deleteMessage({
			chat_id: this.chat.id,
			message_id: this.message.message_id
		})
	}
}