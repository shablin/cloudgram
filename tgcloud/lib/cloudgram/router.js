import { debug } from "../utils.js";

const COMMAND_RE = /^\/([A-Za-z0-9_]+)(?:@[A-Za-z0-9_]+)?(?:\s+([\s\S]*))?$/;

export function parseCommand(text) {
    if (typeof text !== 'string') return null;

    const match = COMMAND_RE.exec(text.trim());
    if (!match) return null;

    const name = match[1].toLowerCase();
    const raw = (match[2] ?? '').trim();
    const args = raw.length > 0 ? raw.split(/\s+/) : [];

    return { name, args, raw };
}

export class Router {
    constructor() {
        this.commands = new Map();
        this.callbacks = new Map()

        this.unknownCallbackHandler = null
        this.unknownHandler = null;
    }

    command(name, handler) {
        if (typeof name !== 'string') {
            throw new TypeError('bot.command: name must be a string')
        }

        const normalized = name.replace(/^\//, '').toLowerCase();
        
        if (normalized.length == 0) {
            throw new TypeError("bot.command: name must not be empty")
        }

        if (!/^[a-z0-9_]+$/.test(normalized)) {
            throw new TypeError(`bot.command: invalid command name ${name}`)
        }

        if (typeof handler !== 'function') {
            throw new TypeError("bot.command: command handler must be a function")
        }

        if (this.commands.has(normalized)) {
            throw new Error(`bot.command: command ${normalized} is already registered`)
        }

        this.commands.set(normalized, handler)
    }

    callback(data, handler) {
        if (typeof data !== 'string') {
            throw new TypeError('bot.callback: data must be a string')
        }

        if (typeof handler !== 'function') {
            throw new TypeError(`bot.callback: handler for ${data} callback must be a function`)
        }

        if (this.callbacks.has(data)) {
            throw new Error(`bot.callback: callback ${data} is already registered`)
        }

        this.callbacks.set(data, handler)
    }

    onUnknownCallback(handler) {
        if (typeof handler !== 'function') {
            throw new TypeError('bot.onUnknownCallback: handler must be a function')
        }

        this.unknownCallbackHandler = handler
    }

    onUnknownCommand(handler) {
        if (typeof handler !== 'function') {
            throw new TypeError("bot.onUnknownCommand: handler must be a function")
        }

        this.unknownHandler = handler
    }

    async dispatchCallback(ctx) {
        debug("reg cbs", [...this.callbacks.keys()])
        debug("unk fallback", typeof this.unknownCallbackHandler)
        debug("inc callback ctx", JSON.stringify(ctx))

        const handler = this.callbacks.get(ctx.data)

        if (handler) {
            await handler(ctx)
            return true
        }

        if (this.unknownCallbackHandler) {
            await this.unknownCallbackHandler(ctx)
            return true
        }

        return false
    }

    async dispatch(ctx) {
        const { command } = ctx
        
        if (!command) return false
        const handler = this.commands.get(command.name)

        if (handler) {
            await handler(ctx)
            return true
        }

        if (this.unknownHandler) {
            await this.unknownHandler(ctx)
            return true
        }

        return false
    }
}