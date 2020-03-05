import { getToken } from '../../../utils/auth-utils.js'
import { handleError } from '../../utils/loaders.js'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		let { page, page_size, tags } = req.body
		page = parseInt(page || 1)
		page_size = parseInt(page_size || 20) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		const path = `${process.env.LYNX_API_PLUGIN}/api/admin/media/page.post.js`
		const { default: api } = await import(path)
		const { items, items_count } = await api({ page, page_size, tags })

		res.json({ page_size, items, items_count })

	} catch (error) {
		return handleError(error, res)
	}

}
