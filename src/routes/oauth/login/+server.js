import { dev } from '$app/environment'
import { error, redirect } from '@sveltejs/kit'
import { serializeNonPOJOs } from '$lib/utils'
import { nanoid } from 'nanoid'

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals, url, cookies }) => {
	const provider = JSON.parse(cookies.get('provider') || 'null')
	if (!provider) throw error(400, 'Missing provider')

	const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')

	if (!code || !state) {
		throw error(400, 'Missing code or state')
	}

	if (state !== provider.state) {
		throw error(400, 'Invalid state')
	}

	try {
		const redirectUrl = `${url.origin}/oauth/login`

		await locals.pb
			.collection('users')
			.authWithOAuth2Code(provider.name, code, provider.codeVerifier, redirectUrl, {})
			.then(async (response) => {
				/* console.log('🚀 ~ file: +server.js:29 ~ .then ~ response:', response) */
				const { meta } = response
				let username = (
					(meta.name.includes(' ') ? meta.name.split(' ').join('') : meta.name).toLowerCase() +
					nanoid(5)
				).toString()

				/* console.log('🚀 ~ file: +server.js:39 ~ .then ~ username:', username) */

				const updatedData = {
					username: provider.name === 'github' ? meta.username : username,
					name: meta.name,
					avatarUrl: meta.avatarUrl
				}

				const recordsPOJO = serializeNonPOJOs(response.record)
				locals.pb.collection('users').update(recordsPOJO.id, updatedData)
			})
	} catch (err) {
		console.log('🚀 ~ file: +server.js:28 ~ GET ~ err:', err)
		throw error(500, 'Something went wrong while logging in')
	}

	// clear the cookie after use
	cookies.delete('provider', {
		path: '/',
		secure: !dev,
		sameSite: 'lax'
	})

	// redirect back home
	throw redirect(302, '/')
}
