import fetch from 'cross-fetch'

// HONESTLY, THIS WHOLE CACHING THING MAY BE ENTIRELY UNNECESSARY...???
const api_cache = {}
export const get_api = async(path) => {
	const import_path = `${process.env.LYNX_API_PLUGIN}/api/${path}`
	if (api_cache[import_path]) {
		return api_cache[import_path]
	} else {
		try {
			const api = (await import(import_path)).default
			if (api) {
				api_cache[import_path] = api
				return api_cache[import_path]
			} else {
				throw new Error('API not loading for unknown reason')
			}
		} catch (error) {
			console.log(error)
		}
	}
}

export const handleError = (error, res) => {
	console.log(require('ansi-colors').red('Error:'), error.message)
	if (error.message === 'Unauthorized') {
		return res.status(401).json({ error: 1, message: 'Unauthorized' })
	}
	return res.status(401).json({ error: 1, message: error.message })
}

export const GET = async function(url) {
	try {
		const res = await fetch(process.env.LYNX_HOST + url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'same-origin',
		})
		return await res.json()
	} catch (error) {
		console.error(error)
		return undefined
	}
}

export const POST = async function(url, body) {
	try {
		body = body || {}
		const res = await fetch(process.env.LYNX_HOST + url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'same-origin',
			body: JSON.stringify(body),
		})
		return await res.json()
	} catch (error) {
		console.error(error)
		return undefined
	}
}
