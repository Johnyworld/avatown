<script lang='ts'>
	import userStore from '~/store/userStore';
	import { navigate } from 'svelte-routing'

	const handleLogout = () => {
		localStorage.removeItem('userInfo')
		userStore.logout()
		navigate('/')
	}

</script>

<main>
	<h1>Account</h1>
	<button on:click={handleLogout}>Logout</button>
</main>