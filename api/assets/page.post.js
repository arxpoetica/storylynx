import { get_api } from '../../utils/loaders.js'

export default async function(req, res) {

	try {
		let { page, page_size, tags, type, decade, subject, search_term } = req.body
		page = parseInt(page || 1)
		page_size = parseInt(page_size || 12) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		const api = await get_api('assets/page.post.js')
		const { items, items_count, content_types, subjects }
			= await api({ page, page_size, tags, type, decade, subject, search_term })
		return res.json({ page_size, items, items_count, content_types, subjects })
	} catch (error) {
		console.log(error)
		return res.json({ error: 1, message: error.message })
	}

}
