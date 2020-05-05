import { POST } from '../../../utils/loaders.js'

export async function preloader({ query }, session) {
	const no_page = typeof query.page === 'undefined'
	if (no_page || !query.column || !query.sort) {
		let url = `/admin/posts?page=${no_page ? 1 : query.page}`
		url += `&column=${query.column ? query.column : 'published'}`
		url += `&sort=${query.sort ? query.sort : 'desc'}`
		return this.redirect(302, url)
	}
	query.page = query.page || 1
	const { page_size, items, items_count, drafts_count, published_count, archived_count } = await POST(
		'/api/admin/posts/page.post',
		Object.assign({ cookie: session.cookie }, query),
	)
	return { page_size, items, items_count, drafts_count, published_count, archived_count }
}
