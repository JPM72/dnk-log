# log

A tiny TypeScript logger built on [chalk](https://github.com/chalk/chalk). Coloured log levels, optional timestamps, scoped prefixes. Single file, no config.

## Install

```sh
npm install github:JPM72/dnk-log
```

## Usage

```ts
import log, { makeLog } from 'log'

log.info('starting up')
log.success('done')
log.error('something broke')

// Scoped logger — prefixes every call with [key] and a timestamp
const auth = makeLog('auth')
auth.warn('token expiring soon')
// [14:02:11.0473][auth] token expiring soon

// Disable timestamp
const quiet = makeLog('auth', false)
quiet.info('hello')
// [auth] hello

// Pretty-print objects (JSON keys come out unquoted for readability)
log.print({ user: 'johan', roles: ['admin'] })
```

## Levels

| Method     | Style                                       |
| ---------- | ------------------------------------------- |
| `critical` | red, bold, inverse, underlined              |
| `error`    | bright red, bold                            |
| `warn`     | bright yellow                               |
| `info`     | bright white, bold                          |
| `start`    | bright white, bold, inverse                 |
| `success`  | bright green, bold                          |
| `print`    | strings passthrough; objects as pretty JSON |

## Demo

```ts
import log from 'log'
log.test()
```

Runs every logger with example output.

## API

### `log`
Default export. Exposes every level directly, plus `print` and `test`.

### `makeLog(key: string, timestamp = true)`
Returns the same logger surface as `log` (minus `test`), with every call prefixed by `[key]` and optionally `[HH:MM:SS.mmmm]`.
