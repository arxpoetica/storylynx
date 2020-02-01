import fetch from 'cross-fetch'

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
