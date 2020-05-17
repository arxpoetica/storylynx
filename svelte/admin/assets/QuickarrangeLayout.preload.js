import { POST } from '../../../utils/loaders.js'

export async function preloader(page, session) {
	const { items } = await POST(
		'/api/admin/assets/page-quickarrange.post',
		Object.assign({ cookie: session.cookie }),
	)
	return { items }
}
