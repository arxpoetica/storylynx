import { get_api } from '../../utils/loaders.js'

export default async function(req, res) {
	try {
		const api = await get_api('posts/single.post.js')
		const { post } = await api({ slug: req.body.slug })
		return res.json(post)
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
