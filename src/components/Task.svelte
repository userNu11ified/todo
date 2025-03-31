<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		index,
		task_text,
		actions
	}: {
		index: Snippet;
		task_text: Snippet;
		actions: Snippet;
	} = $props();
</script>

<div class="task">
	<div class="task-info">
		<div class="index">{@render index()}</div>
		<div class="task-text">{@render task_text()}</div>
	</div>
	<form class="actions" method="POST">
		{@render actions()}
	</form>
</div>
