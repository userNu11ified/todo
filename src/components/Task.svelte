<script lang="ts">
	import type { Snippet } from "svelte";

    let { 
        index,
        task_name,
        actions
    }: {
        index: Snippet;
        task_name: Snippet;
        actions: Snippet;
     } = $props();
</script>

<div class="task">
    <div class="task-info">
        <div class="index">{@render index()}</div>
        <div class="task-text">{@render task_name()}</div>
    </div>
    <form class="actions" method="POST">
        {@render actions()}
    </form>
</div>