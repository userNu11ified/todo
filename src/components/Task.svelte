<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		index,
		task_text,
		on_task_up,
		on_task_down,
		on_task_delete
	}: {
		index: Snippet;
		task_text: Snippet;
		on_task_up: () => void;
		on_task_down: () => void;
		on_task_delete: () => void;
	} = $props();
</script>

<div class="task">
	<div class="task-info">
		<div class="index">{@render index()}</div>
		<div class="task-text">{@render task_text()}</div>
	</div>
	<div class="actions">
		<button onclick={on_task_up}>Nahoru</button>
		<button onclick={on_task_down}>Dolů</button>
		<button onclick={on_task_delete}>Vymazat</button>
	</div>
</div>
