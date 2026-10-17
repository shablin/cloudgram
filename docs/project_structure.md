# Project Structure

```
tgcloud/
├── handlers/
│   ├── message.js
│   └── callback_query.js
├── lib/
│   ├── cloudgram/
│   │   ├── bot.js
│   │   ├── router.js
│   │   ├── context.js
│   │   ├── middleware.js
│   │   └── filters.js
│   └── bot/
│       ├── routes/
│       │   └── commands.js
│       └── controllers/
│           ├── start.js
│           └── help.js
└── schema.js
```

This structure is provisional and must comply with the platform's actual deployment 
conventions

## `handlers/`
Contains platform entry points

Responsibilities:
- Receive supported event types
- Pass incoming event data to Cloudgram
- Keep platform-specific integration
out of application handlers

Platform handlers must remain thin

## `lib/cloudgram/`
Contains reusable framework internals. Responsibilities are divided by module:
- `bot.js`: bot (application) instance and public entry point
- `router.js`: route registration and matching
- `context.js`: event context and common bot operations
- `middleware.js`: middleware execution
- `filters.js`: reusable event predicates 

These responsibilities may be reorganized as the implementation evolves, but public 
behavior must remain documented

## `lib/bot/`
Contains application-specific code

Responsibilities:

- Declare application routes
- Implement command and event handlers
- Organize business logic and application-specific services
- Integrate with persistent storage when required
- Framework internals must not import application-specific modules
- Application modules may depend on the framework's public API
