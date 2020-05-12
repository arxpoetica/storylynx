import { POST } from '../../../utils/loaders.js'

export async function preloader(page, session) {
	const { id } = page.params
	const { post, tags }
		= await POST('/api/admin/posts/single.post', { cookie: session.cookie, id })
	return { post, tags }
}
