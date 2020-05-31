import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	const story = await POST('/api/public/stories/single.post', { title: params.story })
	return { story }
}
