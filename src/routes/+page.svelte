<script lang="ts">
	import '../style/reset.css';
	import '../style/font.css';
	import '../style/theme.css';
	import '../style/app.css';
</script>

<div class="app-mount">
	<h1>What a page!</h1>
	<p>A very cool page indeed.</p>
	<p>There will be stuff here eventually, but for now, have this cat! 🐈</p>
	<p>Page generated on: <span>{new Date().toLocaleString()}</span></p>
</div>

<style>
	.app-mount {
		position: absolute;
		left: 0;
		top: 0;

		width: 100dvw;
		height: 100dvh;

		padding: 16px;

		background-color: var(--bg-dark);
	}

	span {
		color: var(--text-light);
	}
</style>
