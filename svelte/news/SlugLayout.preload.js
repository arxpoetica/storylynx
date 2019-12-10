import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	const article = await POST('/api/articles/single.json', { slug: params.slug })
	return { article }
}
