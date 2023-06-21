import { redirect } from '@sveltejs/kit'
import { dev } from '$app/environment'

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals, url, cookies }) => {
	// redirect if no provider is provided
	const queryProvider = url.searchParams.get('provider')
	if (!queryProvider) throw redirect(303, '/')

	const providers = await locals.pb.collection('users').listAuthMethods()
	const provider = await providers.authProviders.find((provider) => provider.name === queryProvider)

	// redirect if provider is not found
	if (!provider) throw redirect(303, '/')

	const authUrl = provider.authUrl + `${url.origin}/oauth/login`

	// creating the oauth cookie
	cookies.set(
		'provider',
		JSON.stringify({
			state: provider.state,
			name: provider.name,
			codeVerifier: provider.codeVerifier,
			codeChallenge: provider.codeChallenge,
			codeChallengeMethod: provider.codeChallengeMethod
		}),
		{
			path: '/',
			secure: !dev,
			sameSite: 'lax'
		}
	)

	// redirect to the provider's auth url
	return new Response(null, {
		status: 302,
		headers: {
			location: authUrl
		}
	})
}
