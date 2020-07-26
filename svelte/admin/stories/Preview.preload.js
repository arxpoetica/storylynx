import { POST } from '../../../utils/loaders.js'

export async function preloader({ params }, session) {
	return await POST('/api/admin/stories/sequence-preview.post', {
		cookie: session.cookie,
		title: params.story,
		slug: params.sequence,
		clip_id: params.clip,
	})
}
