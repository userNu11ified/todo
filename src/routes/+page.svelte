<script lang="ts">
	import '../style/reset.css';
	import '../style/font.css';
	import '../style/theme.css';
	import '../style/app.css';
	import Task from '../components/Task.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	let query: string = $state('');
	let parsed_query: string = $derived(query.trim().toLocaleLowerCase());

	let tasks: string[] = $state(data.tasks);
	let filtered_tasks: string[] = $derived(
		tasks.filter((task) => task.toLocaleLowerCase().includes(parsed_query))
	);

	const reset_search = () => {
		query = '';
	};
</script>

<div class="app-mount">
	<h1>Seznam úkolů</h1>
	<div class="layout">
		<div class="left">
			{#if form?.message}
				<div class="form-message" class:success={form.success} class:error={!form.success}>
					{form.message}
				</div>
			{/if}

			<form action="?/create" method="POST">
				<h2>Přidat úkol</h2>

				<label for="task">Úkol</label>
				<input type="text" name="task" id="task" /> <br />

				<button class="add-task">Přidat úkol</button>
			</form>

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
					<Task>
						{#snippet index()}
							Úkol číslo <span class="highlight">{i + 1}</span>:
						{/snippet}

						{#snippet task_text()}
							{task}
						{/snippet}

						{#snippet actions()}
							<button formaction={`/?/move_task_up&index=${i}`}>Nahoru</button>
							<button formaction={`/?/move_task_down&index=${i}`}>Dolů</button>
							<button formaction={`/?/delete_task&index=${i}`}>Vymazat</button>
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
