import { getToken } from '../../../utils/auth-utils.js'
import { handleError } from '../../../utils/loaders.js'

export default async function(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { assets = [] } = req.body

		const path = `${process.env.LYNX_API_PLUGIN}/api/admin/media/attach.post.js`
		const { default: api } = await import(path)
		const { items, items_count } = await api({ assets })

		res.json({ items, items_count })

	} catch (error) {
		return handleError(error, res)
	}

}
