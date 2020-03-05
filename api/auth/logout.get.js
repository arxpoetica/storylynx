import { handleError } from '../../utils/loaders.js'

export async function get(req, res) {
	try {
		res.clearCookie('lynx')
		return res.json({ loggedOut: true })
	} catch (error) {
		return handleError(error, res)
	}
}
