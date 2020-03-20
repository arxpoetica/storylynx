import { getToken } from '../../../utils/auth-utils.js'
import { handleError } from '../../../utils/loaders.js'

export default async function(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { id } = req.body

		const path = `${process.env.LYNX_API_PLUGIN}/api/admin/assets/single.post.js`
		const { default: api } = await import(path)
		const { asset, tags } = await api({ id })

		return res.json({ asset, tags })
	} catch (error) {
		return handleError(error, res)
	}

}