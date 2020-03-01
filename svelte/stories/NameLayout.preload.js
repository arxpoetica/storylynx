import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	const story = await POST('/api/stories/single.post', { name: params.name })
	const navigation = await POST('/api/stories/navigation.post', { name: params.name })
	return { story, navigation }
}
