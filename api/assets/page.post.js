export default async function(req, res) {

	try {
		let { page, page_size, tags, type, decade, subject, search_term } = req.body
		page = parseInt(page || 1)
		page_size = parseInt(page_size || 12) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		const path = `${process.env.LYNX_API_PLUGIN}/api/assets/page.post.js`
		const { default: api } = await import(path)
		const { items, items_count, content_types, subjects }
			= await api({ page, page_size, tags, type, decade, subject, search_term })

		return res.json({ page_size, items, items_count, content_types, subjects })
	} catch (error) {
		console.log(error)
		return res.json({ error: 1, message: error.message })
	}

}
