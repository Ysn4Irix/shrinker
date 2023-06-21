import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST = ({ locals }) => {
	locals.pb.authStore.clear()
	locals.user = null
	throw redirect(303, '/auth/login')
}
