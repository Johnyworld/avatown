<script lang='ts'>
	import { onMount } from "svelte";
	import { socket } from "..";

	let isLoaded: boolean = false;
	let list: string[] = [];

	onMount(() => {
		socket.emit('room_get_list', (payload: any) => {
			isLoaded = true;
			list = payload.rooms || [];
		});
	});
</script>


<main class='room-screen'>
	<h1>Rooms</h1>
	{#if !isLoaded}
		<div />
	{:else if list.length === 0}
		<p>No Rooms.</p>
	{:else}
		<ul>
			{#each list as item}
				<li>{item}</li>
			{/each}
		</ul>
	{/if}
</main>