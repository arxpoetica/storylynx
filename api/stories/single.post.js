export default async function(req, res) {
	try {
		const path = `${process.env.LYNX_API_PLUGIN}/api/stories/single.post.js`
		const { default: api } = await import(path)
		return res.json(await api(req.body))
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
