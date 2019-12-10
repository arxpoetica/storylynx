import { POST } from '../../utils/loaders.js'
export async function preloader({ query }) {
	if (typeof query.page === 'undefined') {
		return this.redirect(302, 'archive?page=1')
	}
	const { pageSize, items, itemsCount, content_types, subjects } = await POST('/api/assets/page.json', query)
	return { pageSize, items, itemsCount, content_types, subjects }
}
