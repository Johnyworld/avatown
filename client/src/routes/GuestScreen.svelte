<script lang="ts">
	import { onMount } from 'svelte';
	import { socket } from '..';
	import { Link, navigate } from 'svelte-routing';

	let input: HTMLInputElement | null = null
	let name = ''
	let room = ''
	let isOpenRoomForm = false;

	const handleJoinRoom = () => {
		const submitName = name.trim();
		if (!submitName) {
			alert('이름을 입력해요');
			return;
		}
		socket.emit('room_join', { room, user: submitName }, ({ ok, data, message }: any) => {
			if (ok) {
				navigate('/w/' + data)
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

<main class='guest-screen'>
	<h1>Guest</h1>
	<Link to='/login'>
		<button>로그인</button>
	</Link>
	<button on:click={handleOpenRoomForm}>참가</button>
	<!-- <div use:portal={'modals'}>{value}</div> -->
	{#if isOpenRoomForm}
		<form on:submit={handleSubmit}>
			<p>이름</p>
			<input required bind:value={name} bind:this={input} />
			<p>방 코드 입력</p>
			<div>
				<input required bind:value={room} bind:this={input} />
				<button on:click={handleJoinRoom}>입장</button>
			</div>
		</form>
	{/if}
</main>
