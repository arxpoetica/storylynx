import { POST } from '../../../utils/loaders.js'

export async function preloader(page, session) {
	return await POST('/api/admin/stories/landing.post', { cookie: session.cookie })
}
