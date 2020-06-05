import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	return await POST('/api/public/stories/single.post', {
		title: params.story,
		slug: params.sequence,
	})
}
