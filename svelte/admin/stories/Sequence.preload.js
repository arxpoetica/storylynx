import { POST } from '../../../utils/loaders.js'

export async function preloader(page, session) {
	return await POST('/api/admin/stories/sequence-single.post', {
		cookie: session.cookie,
		id: page.params.seq_id,
	})
}
