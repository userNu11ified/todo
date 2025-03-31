import type { Database } from '$lib/server/db';
import { writable } from 'svelte/store';

import fs from 'node:fs/promises';

const load_database = async () => {
	try {
		await fs.access('./data.json');
	} catch {
		return [];
	}

	return JSON.parse(await fs.readFile('./data.json', 'utf-8')) as string[];
};

export const DATABASE: Database = writable(await load_database());

DATABASE.subscribe(async (v) => {
	const json_string = JSON.stringify(v);

	await fs.writeFile('./data.json', json_string);
});
