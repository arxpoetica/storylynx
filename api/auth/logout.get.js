import { handleError } from '../../utils/loaders.js'

export default async function(req, res) {
	try {
		res.clearCookie('lynx')
		return res.json({ loggedOut: true })
	} catch (error) {
		return handleError(error, res)
	}
}
