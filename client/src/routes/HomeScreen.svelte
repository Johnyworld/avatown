<script lang="ts">
	import { onMount } from 'svelte';
	import { socket } from '..';
	import { Link, navigate } from 'svelte-routing';
	import userStore from '~/store/userStore';

	let room = ''
	let isOpenRoomForm = false;

	const handleCreateRoom = () => {
		socket.emit('room_create', { user: $userStore.userInfo?.name }, (payload: string) => {
			navigate('/w/' + payload)
		})
	}

	const handleOpenRoomForm = () => {
		isOpenRoomForm = true;
	}

	const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		socket.emit('room_join', { room, user: $userStore.userInfo?.name }, ({ ok, data, message }: any) => {
			if (ok) {
				navigate('/w/' + data)
			} else {
				alert(message);
			}
		});
	}

	onMount(() => {
	})

</script>

<main class='home-screen'>
	<h1>Home</h1>
	<nav>
		<Link to='/account'>계정</Link>
		<Link to='/settings'>설정</Link>
	</nav>
	<button on:click={handleCreateRoom}>방생성</button>
	<button on:click={handleOpenRoomForm}>참가</button>
	<Link to='/avatar'><button>아바타</button></Link>
	<!-- <div use:portal={'modals'}>{value}</div> -->
	{#if isOpenRoomForm}
		<form on:submit={handleSubmit}>
			<p>이름</p>
			<p>{$userStore.userInfo?.name}</p>
			<p>방 코드 입력</p>
			<div>
				<input required bind:value={room} />
				<button>입장</button>
			</div>
		</form>
	{/if}
</main>
