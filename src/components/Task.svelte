<script lang="ts">
	let {
		i,
		task,
		on_task_up,
		on_task_down,
		on_task_delete
	}: {
		i: number;
		task: string;
		on_task_up: () => void;
		on_task_down: () => void;
		on_task_delete: () => void;
	} = $props();
</script>

<div class="task">
	<div class="task-info">
		<div class="index">Úkol číslo {i + 1}:</div>
		<div class="task-text">{task}</div>
	</div>
	<div class="actions">
		<button onclick={on_task_up}>Nahoru</button>
		<button onclick={on_task_down}>Dolů</button>
		<button onclick={on_task_delete}>Vymazat</button>
	</div>
</div>
