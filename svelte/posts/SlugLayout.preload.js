import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	return await POST('/api/public/posts/single.post', params)
}
