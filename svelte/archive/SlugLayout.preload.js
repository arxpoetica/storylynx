import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	const asset = await POST('/api/assets/single.json', { slug: params.slug })
	return { asset }
}
