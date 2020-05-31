import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	return await POST('/api/public/assets/single.post', params)
}
