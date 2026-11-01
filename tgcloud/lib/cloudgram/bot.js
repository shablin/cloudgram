import { Router, parseCommand } from './router.js'
import { CallbackContext, Context } from './context.js'

class Bot {
    constructor() {
        this.router = new Router()
    }

    command(name, handler) {
        this.router.command(name, handler)
        return true
    }

    callback(data, handler) {
        this.router.callback(data, handler)
        return this
    }

    onUnknownCallback(handler) {
        this.router.onUnknownCallback(handler)
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

    async handleCallbackQuery(callbackQuery) {
        const ctx = new CallbackContext(callbackQuery)
        await this.router.dispatchCallback(ctx)
    }
}

export const bot = new Bot()