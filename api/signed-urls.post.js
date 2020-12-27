// see: https://community.transloadit.com/t/uppy-aws-s3-pre-signed-url-nodejs-complete-example-including-metadata-and-tags/15137

import { getToken } from '../utils/auth-utils.js'
import { handleError } from '../utils/loaders.js'
import { Storage } from '@google-cloud/storage'
const storage = new Storage()

export default async(req, res) => {

	try {

		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { files } = req.body
		const files_response = []

		for (const { name, type } of files) {
			console.log(`name: ${name}`)
			const [url] = await storage
				.bucket(process.env.LYNX_STORAGE_BUCKET)
				.file(name)
				.getSignedUrl({
					version: 'v4',
					action: 'write',
					expires: Date.now() + 30 * 60 * 1000, // 30 minutes
					contentType: type,
				})
			files_response.push({ name, url })
		}

		return res.json(files_response)

	} catch (error) {
		return handleError(error, res)
	}

}

