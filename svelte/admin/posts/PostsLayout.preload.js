import { POST } from '../../../utils/loaders.js'

export async function preloader(page, session) {
	const { query, path } = page
	const no_page = typeof query.page === 'undefined'
	if (no_page || !query.column || !query.sort) {
		let url = `${path}?page=${no_page ? 1 : query.page}`
		url += `&column=${query.column ? query.column : 'published'}`
		url += `&sort=${query.sort ? query.sort : 'desc'}`
		return this.redirect(302, url)
	}

	query.page = query.page || 1
	const {
		page_size,
		items,
		items_count,
		drafts_count,
		published_count,
		archived_count,
	} = await POST(
		'/api/admin/posts/page.post',
		Object.assign({ cookie: session.cookie }, query),
	)
	return {
		items,
		items_count,
		page_size,
		drafts_count,
		published_count,
		archived_count,
		cols: [
			{ type: 'title', col: 'headline', title: 'Headline', sort: true },
			{ type: 'assets', col: 'assets', title: 'Cover' },
			{ type: 'array', col: 'tags', title: 'Tags', mapper: 'name' },
			{ type: 'datetime', col: 'published', title: 'Date', sort: true },
		],
	}
}
