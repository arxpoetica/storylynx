import { Storage } from '@google-cloud/storage'

// GOOGLE_APPLICATION_CREDENTIALS
// COMPANION_GOOGLE_BUCKET

const storage = new Storage()

export const get_signed_upload_url = async(filename) => {

	const options = {
		version: 'v4',
		action: 'write',
		expires: Date.now() + 30 * 60 * 1000, // 30 minutes
		contentType: 'application/octet-stream',
	}

	const [url] = await storage
		.bucket(process.env.LYNX_STORAGE_BUCKET)
		.file(filename)
		.getSignedUrl(options)

}
