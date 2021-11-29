
<script lang='ts'>
	import userStore from "~/store/userStore";
	import { navigate } from 'svelte-routing'


	let input: HTMLInputElement | null = null
	let value = ''
	const handleSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		if (input) {
			userStore.login(input.value)
			localStorage.setItem('userInfo', JSON.stringify({ name: input.value }))
			navigate('/')

		} else {
			alert('입력을 해')
		}
	}

</script>

<main class='login-screen'>
	<h1>Login</h1>
	<form on:submit={handleSubmit}>
		<p>이름 입력</p>
		<input required bind:value={value} bind:this={input} />
		<button>로그인</button>
	</form>
</main>