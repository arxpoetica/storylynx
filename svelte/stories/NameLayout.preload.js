import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	const story = await POST('/api/stories/single.post', { name: params.name })
	return { story }
}
