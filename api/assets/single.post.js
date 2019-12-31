import { get_api } from '../../utils/loaders.js'

export default async function(req, res) {
	try {
		const api = await get_api('assets/single.post.js')
		const { resource } = await api({ slug: req.body.slug })
		return res.json(resource)
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
