import { getToken } from '../../../utils/auth-utils.js'
import { handleError } from '../../../utils/loaders.js'

export default async function(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		let { sort = 'DESC' } = req.body

		const path = `${process.env.LYNX_API_PLUGIN}/api/admin/accounts/page.post.js`
		const { default: api } = await import(path)
		const { items, itemsCount } = await api({ sort })

		res.json({ items, itemsCount })

	} catch (error) {
		return handleError(error, res)
	}

}
