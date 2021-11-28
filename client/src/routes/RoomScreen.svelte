<script lang='ts'>
	import roomStore from "~/store/roomStore";

	import { socket } from "..";

	// export let id: string;

	let input: HTMLInputElement | null = null
	let value = '';
	let messages: {user: string, message: string}[] = [];


	const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		socket.emit('message_send', { room: 'X87aO', user: 'Hello', message: value })
		messages = [...messages, { user: 'You', message: input?.value || '' }]
		if (input) input.value = '';
	}

	const handleLeaveRoom = () => {
		socket.emit('room_leave', { user: 'Hello', room: $roomStore.code }, ({ ok }: any) => {
			if (ok) {
				roomStore.resetCode();
			} else {
				alert('실패함')
			}
		})
	}

	socket.on('message_send', ({ user, message }) => {
		messages = [...messages, { user, message }]
	})

	socket.on('room_leave', ({ user }) => {
		messages = [...messages, { user, message: `${user}님 나감.` }]
	})

</script>

<div>
	<h1>Room: {$roomStore.code}</h1>
	<!-- <p>회의 ID: <b>{id}</b></p> -->

	<form on:submit={handleSubmit}>
		<p>메시지 입력</p>
		<input required bind:value={value} bind:this={input} />
		<button>보내기</button>
	</form>

	<button on:click={handleLeaveRoom}>나가기</button>

	<ul>
		{#each messages as message}
			<li>{message.user}: {message.message}</li>
		{:else}
			<li>Empty.</li>
		{/each}
	</ul>
</div>