<script lang="ts">
	import '../style/reset.css';
	import '../style/font.css';
	import '../style/theme.css';
	import '../style/app.css';

	let tasks: string[] = $state([]);
	let filtered_tasks: string[] = $derived(
		tasks.filter((task) => task.toLocaleLowerCase().includes(parsed_query))
	);

	let task: string = $state('');

	let query: string = $state('');
	let parsed_query: string = $derived(query.trim().toLocaleLowerCase());

	const add_task = () => {
		tasks.push(task);
		task = '';
	};

	const move_task_up = (i: number) => {
		const new_index = i - 1;
		const task_moved = tasks.splice(i, 1)[0];
		tasks.splice(new_index, 0, task_moved);
	};

	const move_task_down = (i: number) => {
		const new_index = i + 1;
		const task_moved = tasks.splice(i, 1)[0];
		tasks.splice(new_index, 0, task_moved);
	};

	const remove_task = (i: number) => {
		tasks.splice(i, 1);
	};

	const reset_search = () => {
		query = '';
	};
</script>

<div class="app-mount">
	<h1>Seznam úkolů</h1>
	<div class="layout">
		<div class="left">
			<section>
				<h2>Přidat úkol</h2>

				<label for="task">Úkol</label>
				<input type="text" id="task" bind:value={task} /> <br />

				<button class="add-task" onclick={add_task}>Přidat úkol</button>
			</section>

			<br />

			<section>
				<h2>Vyhledat úkol</h2>
				<label for="query">Najít text</label>
				<input type="text" id="query" bind:value={query} /> <br />

				<button class="reset" onclick={reset_search}>Zrušit vyhledávání</button>
			</section>
		</div>
		<div class="right">
			<h2>Seznam úkolů</h2>
			<div class="task-list">
				{#each filtered_tasks as task, i}
					<div class="task">
						<div class="task-info">
							<div class="index">Úkol číslo {i + 1}:</div>
							<div class="task-text">{task}</div>
						</div>
						<div class="actions">
							<button onclick={() => move_task_up(i)}>Nahoru</button>
							<button onclick={() => move_task_down(i)}>Dolů</button>
							<button onclick={() => remove_task(i)}>Vymazat</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.app-mount {
		display: flex;
		flex-direction: column;

		position: absolute;
		left: 0;
		top: 0;

		width: 100dvw;
		height: 100dvh;

		padding: 16px;

		background-color: var(--bg-dark);
	}
</style>
