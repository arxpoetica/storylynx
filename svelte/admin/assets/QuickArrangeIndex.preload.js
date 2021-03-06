import { POST } from '../../../utils/loaders.js'

export async function preloader(page, session) {
	return await POST(
		'/api/admin/assets/quickarrange-page.post',
		Object.assign({ cookie: session.cookie }),
	)
}
