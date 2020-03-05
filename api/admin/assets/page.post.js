import { getToken } from '../../../utils/auth-utils.js'
import { handleError } from '../../utils/loaders.js'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		let {
			page = 1,
			pageSize = 10,
			tags = [],
			// FIXME: will this ever be passed from a query? We need to do the same on ALL passed admin POST pages.
			status = ['PUBLISHED', 'DRAFT'],
			column = 'publishedDatetime',
			sort = 'DESC',
		} = req.body

		page = parseInt(page)
		pageSize = parseInt(pageSize)
		tags = typeof tags === 'string' ? [tags] : tags

		const path = `${process.env.LYNX_API_PLUGIN}/api/admin/assets/page.post.js`
		const { default: api } = await import(path)
		const { items, itemsCount, draftsCount, publishedCount, archivedCount }
			= await api({ page, pageSize, tags, status, column, sort })

		res.json({
			pageSize,
			items,
			itemsCount,
			draftsCount,
			publishedCount,
			archivedCount,
		})

	} catch (error) {
		return handleError(error, res)
	}

}
