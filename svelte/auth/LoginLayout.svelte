<div class="layout-main">
	<h1>Login</h1>
	<form on:submit={submit}>
		{#if message}
			<!-- FIXME: turn this into a component -->
			<div class="error">{message}</div>
		{/if}
		<div class="border">
			<label>Username
				<!-- autofocus="autofocus" -->
				<input bind:value={username} type="text" name="username" required="required">
			</label>
			<label>Password
				<input bind:value={password} type="password" name="password" required="required">
			</label>
		</div>
		<button type="submit" class="button">Log In</button>
	</form>
</div>

<script>
	import { POST } from '../../utils/loaders.js'

	let message
	let username = ''
	let password = ''

	export async function submit(event) {
		event.preventDefault()
		const formData = { username, password }
		const user = await POST('/api/auth/login.post', formData)
		if (user.message) {
			message = user.message
		} else {
			// FIXME: let's get rid of reload if possible
			window.location = '/admin'
		}
	}
</script>

<style type="text/scss">
	form {
		max-width: 400rem;
		margin: 0 auto;
	}
	.error {
		margin: 0 0 10rem;
		padding: 10rem;
		background-color: white;
		border: 1rem solid red;
		color: red;
		font-weight: bold;
	}
	.border {
		margin: 0 0 12rem;
		padding: 12rem;
		border: 1rem solid #ddd;
		border-radius: 2rem;
		:last-child {
			input[type="password"] {
				margin-bottom: 0;
			}
		}
	}
	input[type="text"],
	input[type="password"] {
		padding: 0 12rem;
		height: 50rem;
		font: inherit;
	}
	.button {
		width: 100%;
		height: 50rem;
		border: 1rem solid #ddd;
	}
</style>
