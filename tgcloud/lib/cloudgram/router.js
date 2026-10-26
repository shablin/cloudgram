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

    onUnknownCommand(handler) {
        if (typeof handler !== 'function') {
            throw new TypeError("bot.onUnknownCommand: handler must be a function")
        }

        this.unknownHandler = handler
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