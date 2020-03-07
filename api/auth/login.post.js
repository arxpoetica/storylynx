import bcrypt from 'bcryptjs'
import { handleError } from '../../utils/loaders.js'
import { setToken } from '../../utils/auth-utils.js'
import { src } from '../../utils/basic-utils.js'

export default async function(req, res) {

	try {

		const { username, password } = req.body

		// NOTE: only a basic checks here...
		// normally protect against injection attacks, etc...
		// TODO: check that username is a correctly formatted email?????????
		if (typeof username !== 'string' || username.length < 3) {
			throw Error('Username must be at least 3 characters.')
		} else if (typeof password !== 'string' || password.length < 20) {
			throw Error('Password must be at least 20 characters.')
		}

		const path = `${process.env.LYNX_API_PLUGIN}/api/auth/login.post.js`
		const { default: api } = await import(path)
		const { answer } = await api({ username })

		// further checks, including password...
		if (answer.error) {
			throw Error('Something went wrong. Please contact the code test taker 😆.')
		} else if (!answer.account) {
			return res.json({ username: false })
		}
		const { account } = answer
		// FIXME: (un)salt this
		const match = await bcrypt.compare(password, account.hash)
		if (!match) {
			throw Error('Incorrect password.')
		}

		const payload = {
			username: account.username,
			role: account.role,
			firstName: account.firstName,
			lastName: account.lastName,
			avatar: src(account.avatar, { crop: true }),
		}
		setToken(payload, res)
		return res.json(payload)

	} catch (error) {
		return handleError(error, res)
	}

}
