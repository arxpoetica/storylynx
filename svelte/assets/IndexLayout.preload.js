import { POST } from '../../utils/loaders.js'
export async function preloader({ query }) {

	const batch_size = 12 // hard coding and passing along

	const batch = await POST('/api/public/assets/batch.post', {
		batch: 1,
		batch_size,
		tags: typeof query.tags === 'string' ? [query.tags] : query.tags,
		type: query.type,
		decade: query.decade,
		subject: query.subject,
		search_term: query.search_term,
	})

	// TODO: one of those things that could be a `GET`
	const meta = await POST('/api/public/assets/meta.post')

	return Object.assign({ batch_size }, batch, meta)

}
