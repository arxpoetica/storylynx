import { cmsQuery } from '../../utils/loaders.js'

export async function single(req, res) {
	try {
		const { article } = await cmsQuery(`{
			article(where: { slug: "${req.body.slug}" }) {
				slug
				headline
				subheadline
				byline
				publishedDatetime
				detail { html }
				assets { id url summary handle fileName width height }
				tags { tag }
				linkBack
			}
		}`)
		return res.json(article)
	} catch (error) {
		// console.log(error)
		return res.json({ error: 1, message: error.message })
	}
}
