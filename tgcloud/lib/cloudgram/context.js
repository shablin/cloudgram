import { api } from 'sdk';
import { render } from './format.js'

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
		const { text, parse_mode } = render(node)
		return this.reply(text, { parse_mode, ...extra })
	}
}
