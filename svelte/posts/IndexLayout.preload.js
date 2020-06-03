import { POST } from '../../utils/loaders.js'
export async function preloader({ query }) {

	const batch_size = 12 // hard coding and passing along

	const batch = await POST('/api/public/posts/batch.post', {
		batch: 1,
		batch_size,
		tags: typeof query.tags === 'string' ? [query.tags] : query.tags,
	})

	return Object.assign({ batch_size }, batch)

}
