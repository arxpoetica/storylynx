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
		'/api/admin/assets/page.post',
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
			// { type: 'title', col: 'headline', title: 'Headline', sort: true },
			// { type: 'assets', col: 'assets', title: 'Cover' },
			// { type: 'array', col: 'tags', title: 'Tags', mapper: 'tag' },
			// { type: 'datetime', col: 'published', title: 'Date', sort: true },
			{ type: 'asset', col: 'assets', title: 'Assets' },
			{ type: 'url', col: 'title', title: 'Title', sort: true },
			{ type: 'function', col: item => item.assets ? item.assets.length : 0, title: 'Asset Count' },
			{ type: 'array', col: 'tags', title: 'Tags', mapper: 'tag' },
			{ type: 'datetime', col: 'published', title: 'Date', sort: true },
		],
	}
}

