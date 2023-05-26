
<template>
	<div>
		<div class="pt-5 space-y-6">
			<h2 class="dark:text-white px-2">{{ data.username }}</h2>
			<AssetsFormInput label="Username" placeholder="username" v-model="data.username"></AssetsFormInput>
			<h2 class="dark:text-white px-2">{{ data.password }}</h2>
			<AssetsFormInput type="password" label="password" v-model="data.password" placeholder="*******"></AssetsFormInput>
			<div>
				<button class="dark:text-white" @click = "handleLogin">Login</button>
			</div>
		</div>
	</div>
</template>
<script  setup>
	const data = reactive({
    username: '',
		password:'',
		loading:false
})
async function handleLogin() {
    const { login } = useAuth()

    data.loading = true
    try {
        await login({
            username: data.username,
            password: data.password
        })
				 
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }

}




</script>
