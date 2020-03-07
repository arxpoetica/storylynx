export function if_user_redirect(page, session) {
	if (session.user) { return this.redirect(302, '/') }
}

export function if_no_user_redirect(page, session) {
	if (!session.user) { return this.redirect(302, '/') }
}
