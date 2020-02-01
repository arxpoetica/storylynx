import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	const modal = await POST('/api/modals/single.post', { name: params.name })
	return { modal }
}
