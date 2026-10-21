import { api } from 'sdk';


export class Context {
	constructor(message, command = null) {
		this.message = message;
		this.command = command;
		this.api = api;
	}
	
	get chat() { return this.message.chat; }
	get from() { return this.message.from; }
	get text() { return this.message.text; }
	
	async reply(text, extra = {}) {
		return api.sendMessage({
			chat_id: this.message.chat_id,
			text,
			...extra,
		});
	}
}
