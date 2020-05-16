import { POST } from '../../utils/loaders.js'
export async function preloader(page) {
	const { query, path } = page
	const no_page = typeof query.page === 'undefined'
	if (no_page) {
		let url = `${path}?page=${no_page ? 1 : query.page}`
		return this.redirect(302, url)
	}

	const {
		page_size,
		items,
		items_count,
		content_types,
		decades,
		subjects,
	} = await POST('/api/assets/page.post', query)

	return {
		page_size,
		items,
		items_count,
		content_types,
		decades,
		subjects,
	}
}
