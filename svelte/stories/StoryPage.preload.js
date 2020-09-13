import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	return await POST('/api/public/stories/single.post', {
		story_slug: params.story,
		sequence_slug: params.sequence,
	})
}
