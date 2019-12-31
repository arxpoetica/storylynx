import { get_api } from '../../utils/loaders.js'

export default async function(req, res) {
	try {
		const api = await get_api('articles/single.post.js')
		const { article } = await api({ slug: req.body.slug })
		return res.json(article)
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
