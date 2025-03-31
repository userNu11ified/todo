import { DATABASE } from '../hooks.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { tasks: DATABASE };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const form_data = await request.formData();
		let task = form_data.get('task');

		if (task === null || task === '') return { success: false, message: 'Přidání úkolu selhalo!' };

		DATABASE.push(`${task}`);
		return { success: true, message: 'Přidání úkolu proběhlo úspešně!' };
	}
};
