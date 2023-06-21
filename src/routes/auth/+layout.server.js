import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/')
	}
	return {
		providers: await locals.pb.collection('users').listAuthMethods()
	}
}
