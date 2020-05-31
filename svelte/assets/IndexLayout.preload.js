import { POST } from '../../utils/loaders.js'
export async function preloader(page) {
	const { query, path } = page
	const no_page = typeof query.page === 'undefined'
	if (no_page) {
		let url = `${path}?page=${no_page ? 1 : query.page}`
		return this.redirect(302, url)
	}

	return await POST('/api/public/assets/page.post', {
		page: parseInt(query.page || 1),
		page_size: parseInt(query.page_size || 12), // just hard coding for now
		tags: typeof query.tags === 'string' ? [query.tags] : query.tags,
		type: query.type,
		decade: query.decade,
		subject: query.subject,
		search_term: query.search_term,
	})

}
