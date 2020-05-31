import { POST } from '../../utils/loaders.js'
export async function preloader({ query }) {
	if (typeof query.page === 'undefined') {
		return this.redirect(302, 'posts?page=1')
	}

	return await POST('/api/public/posts/page.post', {
		page: parseInt(query.page || 1),
		page_size: parseInt(query.page_size || 12), // just hard coding for now
		tags: typeof query.tags === 'string' ? [query.tags] : query.tags,
	})
}
