import { db_create_task, db_delete_task, db_move_task_down, db_move_task_up } from '$lib/server/db';
import { DATABASE } from '../hooks.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { tasks: DATABASE };
};

const CREATE_SUCCESS = 'Přidání úkolu proběhlo úspěšně!';
const CREATE_FAILURE = 'Přidání úkolu selhalo!';

const MOVE_SUCCESS = 'Posunutí úkolu proběhlo úspešně!';
const MOVE_FAILURE = 'Posunutí úkolu selhalo!';

const DELETE_SUCCESS = 'Vymazání úkolu proběhlo úspešně!';
const DELETE_FAILURE = 'Vymazání úkolu selhalo!';

export const actions: Actions = {
	create: async ({ request }) => {
		const form_data = await request.formData();
		let task = form_data.get('task');

		if (task === null || task === '') return { success: false, message: CREATE_FAILURE };

		db_create_task(DATABASE, `${task}`);
		return { success: true, message: CREATE_SUCCESS };
	},

	move_task_up: async ({ url }) => {
		const task_index = url.searchParams.get('index');
		if (task_index === null) return { success: false, message: MOVE_FAILURE };

		const task_index_number = +task_index;
		if (Number.isNaN(task_index_number)) return { success: false, message: MOVE_FAILURE };

		db_move_task_up(DATABASE, task_index_number);
		return { success: true, message: MOVE_SUCCESS };
	},

	move_task_down: async ({ url }) => {
		const task_index = url.searchParams.get('index');
		if (task_index === null) return { success: false, message: MOVE_FAILURE };

		const task_index_number = +task_index;
		if (Number.isNaN(task_index_number)) return { success: false, message: MOVE_FAILURE };

		db_move_task_down(DATABASE, task_index_number);
		return { success: true, message: MOVE_SUCCESS };
	},

	delete_task: async ({ url }) => {
		const task_index = url.searchParams.get('index');
		if (task_index === null) return { success: false, message: DELETE_FAILURE };

		const task_index_number = +task_index;
		if (Number.isNaN(task_index_number)) return { success: false, message: DELETE_FAILURE };

		db_delete_task(DATABASE, task_index_number);
		return { success: true, message: DELETE_SUCCESS };
	}
};
