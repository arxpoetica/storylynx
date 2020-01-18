import { get_api } from '../../utils/loaders.js'

export default async function(req, res) {
	try {
		let { page, page_size, tags } = req.body
		page = parseInt(page || 1)
		page_size = parseInt(page_size || 12) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		const api = await get_api('posts/page.post.js')
		const { items, items_count } = await api({ page, page_size, tags })
		return res.json({ page_size, items, items_count })
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}

}
