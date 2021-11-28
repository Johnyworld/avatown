<script lang="ts">
	import { onMount } from 'svelte';
	import { socket } from '..';
	import roomStore from '~/store/roomStore';

	let input: HTMLInputElement | null = null
	let value = ''
	let isOpenRoomForm = false;

	const handleCreateRoom = () => {
		socket.emit('room_create', { payload: value }, (payload: string) => {
			roomStore.updateCode(payload);
		})
	}

	const handleJoinRoom = () => {
		socket.emit('room_join', value, ({ ok, data, message }: any) => {
			if (ok) {
				roomStore.updateCode(data);
			} else {
				alert(message);
			}
		});
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

<main class='home-screen'>
	<h1>Home</h1>
	<button on:click={handleCreateRoom}>방 만들기</button>
	<button on:click={handleOpenRoomForm}>참가</button>
	<!-- <div use:portal={'modals'}>{value}</div> -->
	{#if isOpenRoomForm}
		<form on:submit={handleSubmit}>
			<p>방 코드 입력</p>
			<input required bind:value={value} bind:this={input} />
			<button on:click={handleJoinRoom}>입장</button>
		</form>
	{/if}
</main>
