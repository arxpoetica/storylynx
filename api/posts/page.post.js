export default async function(req, res) {
	try {
		let { page, page_size, tags } = req.body
		page = parseInt(page || 1)
		page_size = parseInt(page_size || 12) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		const path = `${process.env.LYNX_API_PLUGIN}/api/posts/page.post.js`
		const { default: api } = await import(path)
		const { items, items_count } = await api({ page, page_size, tags })

		return res.json({ page_size, items, items_count })
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}

}
