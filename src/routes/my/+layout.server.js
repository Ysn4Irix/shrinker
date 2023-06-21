import { redirect } from '@sveltejs/kit'
import { serializeNonPOJOs } from '$lib/utils'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/auth/login')
	} else {
		return {
			isOAuth: serializeNonPOJOs(
				await locals.pb.collection('users').listExternalAuths(locals.user?.id)
			)
		}
	}
}
