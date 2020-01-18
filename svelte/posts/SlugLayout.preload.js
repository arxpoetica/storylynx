import { POST } from '../../utils/loaders.js'
export async function preloader({ params }) {
	const post = await POST('/api/posts/single.json', { slug: params.slug })
	return { post }
}
