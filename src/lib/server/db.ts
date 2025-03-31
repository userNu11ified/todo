import { get, type Writable } from 'svelte/store';

export type Database = Writable<string[]>;

export const db_create_task = (database: Database, task: string) => {
	database.update((v) => {
		v.push(task);
		return v;
	});
};

export const db_move_task_up = (database: Database, i: number) => {
	if (i === 0) return;

	const new_index = i - 1;
	database.update((v) => {
		const old_item = v[i];
		v[i] = v[new_index];
		v[new_index] = old_item;

		return v;
	});
};

export const db_move_task_down = (database: Database, i: number) => {
	if (i === get(database).length - 1) return;

	database.update((v) => {
		const new_index = i + 1;
		const old_item = v[i];
		v[i] = v[new_index];
		v[new_index] = old_item;

		return v;
	});
};

export const db_delete_task = (database: Database, i: number) => {
	if (i < 0 || i >= get(database).length) return;

	database.update((v) => {
		v.splice(i, 1);
		return v;
	});
};
