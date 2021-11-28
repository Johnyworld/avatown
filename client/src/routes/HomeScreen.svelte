<script lang="ts">
	import { onMount } from 'svelte';
	import { socket } from '..';
  import { navigate } from 'svelte-routing'

	let input: HTMLInputElement | null = null
	let value = ''
	let messages: string[] = []
	let isOpenRoomForm = false;

	const handleCreateRoom = () => {
		socket.emit('room_create', { payload: value }, (payload: any) => {
			console.log('Joined to ', payload.roomName);
			navigate(`/room/${payload.roomName}`);
		})
	}

	const handleOpenRoomForm = () => {
		isOpenRoomForm = true;
	}

	const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		if (input) input.value = ''
	}

	onMount(() => {
	})

</script>

<main>
	<h1>Home</h1>
	<button on:click={handleCreateRoom}>방 만들기</button>
	<button on:click={handleOpenRoomForm}>참가</button>
	<!-- <div use:portal={'modals'}>{value}</div> -->
	{#if isOpenRoomForm}
		<form on:submit={handleSubmit}>
			<p>방 코드 입력</p>
			<input required bind:value={value} bind:this={input} />
			<button>입장</button>
			<ul>
				{#each messages as message}
					<li>{message}</li>
				{/each}
			</ul>
		</form>
	{/if}
</main>
