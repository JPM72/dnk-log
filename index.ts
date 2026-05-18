import chalk from 'chalk'

const pad = (n: number, l = 2) => n.toString().padStart(l, '0')
const stamp = () =>
{
	const d = new Date()
	return `${[
		pad(d.getHours()),
		pad(d.getMinutes()),
		pad(d.getSeconds()),
	].join(':')}.${pad(d.getMilliseconds(), 4)}`
}

const consoleLog = console.log

const loggers = {
	critical: (...args) => consoleLog(chalk.red.bold.inverse.underline(...args)),
	error: (...args) => consoleLog(chalk.redBright.bold(...args)),
	warn: (...args) => consoleLog(chalk.yellowBright(...args)),
	info: (...args) => consoleLog(chalk.whiteBright.bold(...args)),
	start: (...args) => consoleLog(chalk.whiteBright.bold.inverse(...args)),
	success: (...args) => consoleLog(chalk.greenBright.bold(...args)),
}

function print(...data)
{
	for (const datum of data)
	{
		if (typeof datum === 'string')
		{
			consoleLog(datum)
			continue
		}
		consoleLog(
			'%s',
			JSON.stringify(datum, null, '    ').replaceAll(/(\n\s+)(\")([^\"]+)(\")/g, '$1$3')
		)
	}
}

export const makeLog = (key, timestamp = true) =>
{
	let prefix = `[${key}]`
	const funcs = {
		...loggers,
		print
	}

	for (const [k, fn] of Object.entries(funcs))
	{
		funcs[k] = (...args) =>
		{
			let p = prefix
			if (timestamp) p = `[${stamp()}]${p}`
			fn(p, ...args)
		}
	}
	return funcs
}

export const log = {
	...loggers,
	print,
	test()
	{
		for (const [key, fn] of Object.entries(this))
		{
			if (key === 'test')
			{
				continue
			} else if (key === 'print')
			{
				fn({
					this: `is an example of the "${key}" logger`
				})
			} else
			{
				fn(`This is an example of the "${key}" logger`)
			}
		}
	},
}
export default log
