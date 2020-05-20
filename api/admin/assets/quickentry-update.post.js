import { getToken } from '../../../utils/auth-utils.js'
import { handleError } from '../../../utils/loaders.js'

export default async function(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const path = `${process.env.LYNX_API_PLUGIN}/api/admin/assets/quickentry-update.post.js`
		const { default: api } = await import(path)
		res.json(await api(req.body))

	} catch (error) {
		return handleError(error, res)
	}

}
