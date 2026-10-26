import { Router, parseCommand } from './router.js'
import { Context } from './context.js'

class Bot {
    constructor() {
        this.router = new Router()
    }

    command(name, handler) {
        this.router.command(name, handler)
        return true
    }

    onUnknownCommand(handler) {
        this.router.onUnknownCommand(handler)
        return this
    }

    async handleMessage(message) {
        const command = parseCommand(message?.text)
        const ctx = new Context(message, command)

        await this.router.dispatch(ctx)
    }
}

export const bot = new Bot()