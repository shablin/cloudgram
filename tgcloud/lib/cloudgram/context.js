import { api } from 'sdk';


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
}
