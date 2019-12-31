import { cmsQuery } from '../../utils/loaders.js'

export async function page(req, res) {

	try {

		let { page, page_size, tags } = req.body
		page = parseInt(page || 1)
		page_size = parseInt(page_size || 12) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		let where
		if (tags && tags.length) {
			where = '{ AND: [{ status: PUBLISHED }, '
			where += tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(', ')
			where += '] }'
		} else {
			where = '{ status: PUBLISHED }'
		}

		const { articles, articlesConnection } = await cmsQuery(`{
			articles(
				first: ${page_size},
				skip: ${(page - 1) * page_size},
				where: ${where},
				orderBy: publishedDatetime_DESC
			) {
				id
				publishedDatetime
				headline
				subheadline
				slug
				assets { id url summary handle mimeType fileName }
				tags { tag }
			}

			articlesConnection(where: ${where}) { aggregate { count } }
		}`)

		return res.json({
			page_size,
			items: articles,
			items_count: articlesConnection.aggregate.count,
		})

	} catch (error) {
		console.log(error)
		return res.json({ error: 1, message: error.message })
	}

}
