<script lang="ts">
	import '../style/reset.css';
	import '../style/font.css';
	import '../style/theme.css';
	import '../style/app.css';
	import Task from '../components/Task.svelte';

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
		if (i === 0) return;

		const new_index = i - 1;
		const old_item = tasks[i];
		tasks[i] = tasks[new_index];
		tasks[new_index] = old_item;
	};

	const move_task_down = (i: number) => {
		if (i === tasks.length - 1) return;

		const new_index = i + 1;
		const old_item = tasks[i];
		tasks[i] = tasks[new_index];
		tasks[new_index] = old_item;
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
					<Task
						on_task_up={() => move_task_up(i)}
						on_task_down={() => move_task_down(i)}
						on_task_delete={() => remove_task(i)}
					>
						{#snippet index()}
							Úkol číslo <span class="highlight">{i + 1}</span>:
						{/snippet}

						{#snippet task_text()}
							{task}
						{/snippet}
					</Task>
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
