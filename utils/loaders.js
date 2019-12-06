import fetch from 'cross-fetch'

export const handleError = (error, res) => {
	console.log(require('ansi-colors').red('Error:'), error.message)
	if (error.message === 'Unauthorized') {
		return res.status(401).json({ error: 1, message: 'Unauthorized' })
	}
	return res.status(401).json({ error: 1, message: error.message })
}

export const cmsQuery = async function(query) {
	try {
		const res = await fetch(process.env.LYNX_GRAPHCMS_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + process.env.LYNX_GRAPHCMS_TOKEN,
			},
			body: JSON.stringify({ query }),
		})
		const json = await res.json()
		if (json.errors) { throw Error(json.errors.map(err => `  ${err.message}`).join('\n')) }
		return json.data
	} catch (error) {
		console.log(require('ansi-colors').red('cmsQuery Errors:\n'), error.message)
		return { error: 1, message: error.message }
	}
}

export const cmsMutate = async function(query, variables) {
	try {
		const res = await fetch(process.env.LYNX_GRAPHCMS_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + process.env.LYNX_GRAPHCMS_MUTATE_TOKEN,
			},
			body: JSON.stringify({ query, variables }),
		})
		const json = await res.json()
		if (json.errors) { throw Error(json.errors.map(err => `  ${err.message}`).join('\n')) }
		return json.data
	} catch (error) {
		console.log(require('ansi-colors').red('cmsMutate Errors:\n'), error.message)
		return { error: 1, message: error.message }
	}
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
