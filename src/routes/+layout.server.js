/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	return {
		user: locals.user || undefined
	}
}
