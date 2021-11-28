<script lang='ts'>
import { socket } from "..";


	export let id: string;

	let input: HTMLInputElement | null = null
	let value = '';
	let messages: {user: string, message: string}[] = [];

	const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		socket.emit('message_send', { room: 'X87aO', user: 'Hello', message: value }, () => {

		})
	}
	socket.on('message_resend', ({ room, user, message }) => {
		console.log('===== RoomScreen', room, user, message);
		messages = [...messages, { user, message }]
	})

</script>

<div>
	<h1>Room</h1>
	<p>회의 ID: <b>{id}</b></p>
	<form on:submit={handleSubmit}>
		<p>메시지 입력</p>
		<input required bind:value={value} bind:this={input} />
		<button>보내기</button>
	</form>
	<ul>
		{#each messages as message}
			<li>{message.user}: {message.message}</li>
		{:else}
			<li>Empty.</li>
		{/each}
	</ul>
</div>