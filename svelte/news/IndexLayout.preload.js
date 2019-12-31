import { POST } from '../../utils/loaders.js'
export async function preloader({ query }) {
	if (typeof query.page === 'undefined') {
		return this.redirect(302, 'news?page=1')
	}
	const { page_size, items, items_count } = await POST('/api/articles/page.json', query)
	return { page_size, items, items_count }
}
