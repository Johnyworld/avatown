<script lang='ts'>
	import { onMount } from "svelte";
	import { socket } from "..";

	let list: string[] = [];

	onMount(() => {
		socket.emit('room_get_list', (payload: any) => {
			list = payload.rooms;
		});
	});

</script>

<h1>Rooms</h1>
<ul>
	{#each list as item}
		<li>{item}</li>
	{/each}
</ul>
