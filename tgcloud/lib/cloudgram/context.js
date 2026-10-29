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
