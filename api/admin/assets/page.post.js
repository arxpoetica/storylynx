// DEPRECATED ??? -- FIGURE OUT WHAT TO DO WITH THIS

import { getToken } from '../../../utils/auth-utils.js'
import { handleError } from '../../../utils/loaders.js'

export default async function(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		let {
			page = 1,
			page_size = 10,
			tags = [],
			// FIXME: will this ever be passed from a query? We need to do the same on ALL passed admin POST pages.
			status = ['PUBLISHED', 'DRAFT'],
			column = 'published',
			sort = 'DESC',
		} = req.body

		page = parseInt(page)
		page_size = parseInt(page_size)
		tags = typeof tags === 'string' ? [tags] : tags

		const path = `${process.env.LYNX_API_PLUGIN}/api/admin/assets/page.post.js`
		const { default: api } = await import(path)
		const { items, items_count, drafts_count, published_count, archived_count }
			= await api({ page, page_size, tags, status, column, sort })

		res.json({
			page_size,
			items,
			items_count,
			drafts_count,
			published_count,
			archived_count,
		})

	} catch (error) {
		return handleError(error, res)
	}

}
