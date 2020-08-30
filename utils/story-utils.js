import { hyphenate } from './basic-utils.js'

export const url_hash = ({ id, slug }) => slug ? `nav-${hyphenate(slug.toLowerCase())}` : `nav-${id}`
