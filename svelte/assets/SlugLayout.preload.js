import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	const asset_group = await POST('/api/assets/single.post', { slug: params.slug })
	return { asset_group }
}
