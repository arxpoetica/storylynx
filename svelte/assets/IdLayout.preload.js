import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	const asset_group = await POST('/api/assets/single.post', { id: params.id })
	return { asset_group }
}
