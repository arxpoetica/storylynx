import { POST } from '../../utils/loaders.js'
export async function preloader({ query }) {
	if (typeof query.page === 'undefined') {
		return this.redirect(302, 'news?page=1')
	}
	const { pageSize, items, itemsCount } = await POST('/api/articles/page.json', query)
	return { pageSize, items, itemsCount }
}
