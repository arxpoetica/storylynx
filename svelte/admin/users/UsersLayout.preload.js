import { POST } from '../../../utils/loaders.js'
export async function preloader(page, session) {
	const { items, items_count } = await POST('/api/admin/users/page.post', {
		cookie: session.cookie
	})
	return { items, items_count }
}
