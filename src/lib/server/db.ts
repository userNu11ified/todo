export type Database = string[];

export const db_create_task = (database: Database, task: string) => {
	database.push(task);
};

export const db_move_task_up = (database: Database, i: number) => {
	if (i === 0) return;

	const new_index = i - 1;
	const old_item = database[i];
	database[i] = database[new_index];
	database[new_index] = old_item;
};

export const db_move_task_down = (database: Database, i: number) => {
	if (i === database.length - 1) return;

	const new_index = i + 1;
	const old_item = database[i];
	database[i] = database[new_index];
	database[new_index] = old_item;
};

export const db_delete_task = (database: Database, i: number) => {
	if (i < 0 || i >= database.length) return;

	database.splice(i, 1);
};
