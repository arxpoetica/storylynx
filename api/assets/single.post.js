export default async function(req, res) {
	try {
		const path = `${process.env.LYNX_API_PLUGIN}/api/assets/single.post.js`
		const { default: api } = await import(path)
		const { resource } = await api({ slug: req.body.slug })
		return res.json(resource)
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
