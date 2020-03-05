import { getToken } from '../../../utils/auth-utils.js'
import { handleError } from '../../utils/loaders.js'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { id } = req.body

		const path = `${process.env.LYNX_API_PLUGIN}/api/admin/posts/single.post.js`
		const { default: api } = await import(path)
		const { post, post_tags } = await api({ id })

		return res.json({ post, post_tags })
	} catch (error) {
		return handleError(error, res)
	}

}
