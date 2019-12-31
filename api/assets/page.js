import { cmsQuery } from '../../utils/loaders.js'

export async function page(req, res) {

	try {

		let { page, page_size, tags, type, decade, subject, search_term } = req.body
		page = parseInt(page || 1)
		page_size = parseInt(page_size || 12) // just hard coding for now
		tags = typeof tags === 'string' ? [tags] : tags

		let where = '{ AND: ['
		where += '{ status: PUBLISHED }'
		if (tags && tags.length) {
			where += tags.map(tag => `{ tags_some: { tag: "${tag}" } }`).join(' ')
		}
		if (type) {
			where += ` { contentType: ${type} }`
		}
		if (decade) {
			where += ` { year_gte: ${parseInt(decade)} }`
			where += ` { year_lt: ${parseInt(decade) + 10} }`
		}
		if (subject) {
			where += ` { subject: ${subject} }`
		}
		if (search_term) {
			where += [
				'{ OR: [',
				`{ title_contains: "${search_term}" }`,
				`{ content_contains: "${search_term}" }`,
				']}',
			].join(' ')
		}
		where += '] }'

		const {
			resources,
			resourcesConnection,
			content_types,
			subjects,
		} = await cmsQuery(`{
			resources(
				first: ${page_size},
				skip: ${(page - 1) * page_size},
				where: ${where},
				orderBy: publishedDatetime_DESC
			) {
				id
				publishedDatetime
				title
				slug
				assets {
					cover { url summary handle mimeType fileName }
					id url summary handle mimeType fileName
				}
				assetLinks {
					summary
					link
					cover { url handle }
				}
				contentType
				year
				subject
			}

			resourcesConnection(where: ${where}) { aggregate { count } }
			content_types: __type(name: "ContentTypes") { enumValues { name } }
			subjects: __type(name: "Subjects") { enumValues { name } }
		}`)

		return res.json({
			page_size,
			items: resources,
			items_count: resourcesConnection.aggregate.count,
			content_types: content_types.enumValues.map(val => val.name),
			subjects: subjects.enumValues.map(val => val.name),
		})

	} catch (error) {
		console.log(error)
		return res.json({ error: 1, message: error.message })
	}

}
