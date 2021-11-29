<script lang='ts'>

	import { socket } from '..'
	import { navigate } from 'svelte-routing'
	import userStore from '~/store/userStore';

	export let id: string;

	let input: HTMLInputElement | null = null
	let value = '';
	let messages: {user: string, message: string}[] = [];


	const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		if (value) {
			socket.emit('message_send', { room: id, message: value }, ({ ok, message }: any) => {
				if (ok) {
					messages = [...messages, { user: 'You', message: value }]
					if (input) input.value = '';
				} else {
					alert(message);
					navigate('/')
				}
			})
		}
	}

	const handleLeaveRoom = () => {
		socket.emit('room_leave', { user: $userStore.userInfo?.username, room: id }, ({ ok, message }: any) => {
			if (ok) {
				navigate('/')
			} else {
				alert(message)
				navigate('/')
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
	<h1>Room: {id}</h1>
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