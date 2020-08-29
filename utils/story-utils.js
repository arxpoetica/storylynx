import { hyphenate } from './basic-utils.js'

export const url_hash = clip => clip.slug ? `nav-${hyphenate(clip.slug.toLowerCase())}` : `nav-${clip.id}`
