export default async function(req, res) {
	try {
		const path = `${process.env.LYNX_API_PLUGIN}/api/stories/single.post.js`
		const { default: api } = await import(path)
		const { story } = await api({ title: req.body.title })
		return res.json(story)
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
