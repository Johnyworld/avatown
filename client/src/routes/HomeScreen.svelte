<script lang="ts">
	import { onMount } from 'svelte';

	let input: HTMLInputElement | null = null
	let value = ''
	let messages: string[] = []

	const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		if (input) input.value = ''
	}

	onMount(() => {
		
	})

</script>

<main>
	<h1>Home</h1>
	<form on:submit={handleSubmit}>
		<input required bind:value={value} bind:this={input} />
		<button>SEND</button>
		<ul>
			{#each messages as message}
				<li>{message}</li>
			{/each}
		</ul>
	</form>
</main>
