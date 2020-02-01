export default async function(req, res) {
	try {
		const path = `${process.env.LYNX_API_PLUGIN}/api/modals/single.post.js`
		const { default: api } = await import(path)
		const { modal } = await api({ name: req.body.name })
		return res.json(modal)
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
