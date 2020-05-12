import { POST } from '../../../utils/loaders.js'
export async function preloader(page, session) {
	const { items, items_count } = await POST('/api/admin/users/page.post', {
		cookie: session.cookie,
	})
	return {
		items,
		items_count,
		cols: [
			// { type: 'asset', col: 'avatar', title: 'Avatar' }, // FIXME: use?
			// { type: 'url', col: 'username', title: 'Username', url: '/admin/users/' },
			{ type: 'title', col: 'username', title: 'Username' }, // FIXME: replace with above
			{ type: 'text', col: 'role', title: 'Role' },
			{ type: 'text', col: 'first', title: 'First' },
			{ type: 'text', col: 'last', title: 'Last' },
		],
	}
}
