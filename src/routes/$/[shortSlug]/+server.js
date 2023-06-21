import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals, params }) => {
	let link
	try {
		link = await locals.pb.collection('links').getFirstListItem(`shortSlug="${params.shortSlug}"`)

		if (link) {
			if (parseInt(link.expiration) > Date.now()) {
				await locals.pb.collection('links').update(link.id, {
					views: link.views + 1
				})
			}
		}
	} catch (err) {
		console.log('🚀 ~ file: +server.js:14 ~ GET ~ err:', err)
	}

	if (link) {
		if (link.expiration !== 'Infinity' && parseInt(link.expiration) < Date.now()) {
			throw redirect(303, '/expired')
		}
		throw redirect(303, link?.url)
	} else throw redirect(303, '/expired')
}
