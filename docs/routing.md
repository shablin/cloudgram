# Routing

# 1. Purpose
The routing system maps incoming Telegram events to application handlers. It 
provides a declarative API for registering commands and other event handlers while 
keeping route definitions separate from handler implementations

# 2. Design Principles
- Route registration must be explicit and readable
- Route definitions must remain separate from bussines logic
- Handlers are ordinary asynchronus JavaScript functions
- Route matching must be deterministic
- Unsupported or unmatched events must not cause accidental handler execution
- Routing must support extension to additional Telegram update types

# 3. Route Registration
The application (bot) registers commands by associating a command name with a handler:

```js
bot.command('start', start)
bot.command('help', help)
```

A route declaration registers a handler. It does not execute the handler 
immediately. The handler is invoked only when an incoming event matches the route 
and satisfies its condition

# 4. Handler Contract
A handler is an ordinary JavaScript function that recieves a Cloudgram context:

```js
export default async function start(ctx) {
	await ctx.reply('Welcome! I am a bot')
}
```

As you can see, handlers may perform async operations. The routing system is 
responsible for invoking handler with the correct context

# 5. Route Organization
Application routes should be defined separately from handler implementations:

```
tgcloud/lib/bot/
├── routes/
│   └── commands.js
└── controllers/
    ├── start.js
    └── help.js
```

So, route declarations:

```js
import { bot } from '../../cloudgram/bot.js'
import start from '../controllers/start.js'
import help from '../controllers/help.js'

bot.command('start', start)
bot.command('help', help)
```

This separation allows developers to change route organization without embedding 
routing logic inside individual handlers

# 6. Command Matching

A command route matches a Telegram message that contains the registered command. 
The implementation must define:

- How the command name is extracted
- Whether the leading slash is required
- How command arguments are handled
- How bot mentions, such as `/start@botname`, are handled
- Whether command matching is case-sensitive
- How malformed commands are treated

These details must follow Telegram's message and command conventions rather than 
undocumented assumptions

# 7. Matching and Dispatch

When an event is received:

1. The router identifies candidate routes for the event type
2. The router evaluates the applicable matching conditions
3. The router invokes the selected handler

The initial implementation should use deterministic matching and avoid executing 
multiple command handlers accidentally. The exact behavior when multiple routes 
match must be documented before implementation

# 8. Unmatched Events

If no route matches an event, the router must not invoke an unrelated handler. The 
initial design should support a predictable unmatched-event outcome. Whether this 
outcome is represented by a return value, a not-found hook, or another mechanism 
remains to be decided. Unknown commands must not be treated as ordinary application 
commands unless an explicit fallback policy is configured

# 9. Registration Rules
Route registration occurs during application initialization. The implementation 
must define behavior for:

- Registering the same command more than once
- Registering a handler without a valid command name
- Registering a non-function handler
- Registering routes after event processing has begun

The preferred behavior is explicit and predictable rather than silent failure

# 10. Future Extensions
The routing API may later support:

- Routers grouped by feature or domain
- Callback query handlers
- Text and other message filters
- Middleware attached to individual routers or routes
- Fallback handlers
- Reusable filter composition

These features are not required for the initial command router
