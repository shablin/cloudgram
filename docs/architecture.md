# Cloudgram Design

> [!NOTE]
> **Version:** 0.1.0
> **Status:** Draft

# 1. Purpose
Cloudgram is a lightweight, modular JavaScript framework for building Telegram bots 
on [Telegram Serverless](https://core.telegram.org/bots/serverless). It provides 
reusable routing, event context, middleware and filters.

# 2. Architectural Principles
## 2.1. Modular design
Every module has a clearly defined responsibility

## 2.2. Separation of concerns
Framework machanisms, application logic, and platform integration must remain 
separate.

## 2.3. Explicit control flow
Route matching, filter evaluation, middleware execution must follow documented 
rules.

## 2.4. Reusable components
Framework modules must not depend on application-specific commands or bussines 
rules.

## 2.5. Minimal abstractions
Functions are the default mechanism for handlers, filters, and middleware. Classes 
are introduced only when they provide a clear benefit.

## 2.6. Platform compatibility
All modules must comply with Telegram Serverless runtime, module-resolution, SDK, 
and deployment constraints.

## 2.7. Progressive complexity
Simple bots must remain simple. Advanced capabilities must be optional.

# 3. Architectural Style
Cloudgram combines selected principles from:
- **MVC.** Separation of route 
definitions and application handlers
- **Modular monolith.** Modules are organized 
independently, and deployed as one application
- **Middleware.** Reusable sequential 
processing stages
- **Ports and Adapters.** Separation between platform integration 
and framework behavior

> [!IMPORTANT]
> Patterns above are architectural influences,
> not strict implementations

# 4. Project Structure
_Will be added soon..._

# 5. Application instance
The initial public API uses a shared application instance named `bot`. Bot 
(application) modules register routes and middleware against this instance. This 
design minimizes setup and provides a simple developer experience. The framework 
must define deterministic initialization behavior and prevent accidental duplicate 
route registration. The singletone represents application (bot) configuration and 
routing state, not durable user on conversation state.

Internally, the framework may retain the ability to create independent application 
(bot) instances if needed for testing or future extensions. Such support is not 
part of the initial public API.

# 6. Handler Model
Application (bot) handlers are ordinary JavaScript functions. A handler recieves 
the framework context and performs application-specific behavior. Classes are 
permitted inside application code but are not required by the framework. The 
framework must not require developers to create controller classes for individual 
commands.

# 7. Main Components
## 7.1. Application (bot)
Coordinates:
- application/bot configuration
- registered routers
- and event processing

## 7.2. Router
- Register handlers
- Matches incoming events
- Evaluates route conditions
- Determines how unmatched events are handled

## 7.3. Context
Represents the current event and exposes common operations to handlers and 
middleware

## 7.4. Middleware
Implements reusable processing stages and follows documented execution and 
error-propagation rules

## 7.5. Filters
Determine whether an event satisfies a route's matching conditions. Filters remain 
distinct from middleware

## 8. Event Processing Model

The intended flow is:

1. Telegram Serverless invokes a platform handler
2. The handler passes the event to the framework
3. The framework constructs the event context
4. The configured processing pipeline runs
5. The router identifies matching routes
6. Filters determine whether a handler may run
7. The selected handler processes the event
8. Results or errors propagate according to documented rules

The exact ordering and termination semantics must be specified in dedicated routing 
and middleware documents

# 9. Runtime and State
Cloudgram distinguishes between execution-local state and persistent state. 
In-memory data structures may store route registrations and configuration during 
initialization. User sessions and conversation progress must use supported 
persistent storage if they need to survive separate invocations. The framework must 
not assume that an application instance remains alive between events

> [!WARNING]
> Architectural proposals are not considered implemented until verified 
> against the target runtime
