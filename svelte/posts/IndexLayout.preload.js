import { POST } from '../../utils/loaders.js'
export async function preloader({ query }) {
	if (typeof query.page === 'undefined') {
		return this.redirect(302, 'posts?page=1')
	}
	const { page_size, items, items_count } = await POST('/api/posts/page.post', query)
	return { page_size, items, items_count }
}
