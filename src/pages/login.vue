<script setup>
import { loginStore } from '@/stores/login';
import { ref } from 'vue';


const store = loginStore()
const data = ref({
    email: '',
    password: '',
})

const login = async () => {
    const formData = new FormData()
    formData.append('email', data.value.email)
    formData.append('password', data.value.password)
    await store.login(formData)
}

</script>

<template>
    <!-- {{ data.email }} -->
    <div class="max-w-sm rounded-lg bg-white shadow-2xl mx-auto mt-5 p-5 space-y-3">
        <div class="text-center font-medium text-2xl font-mono">
            Welcome Back
        </div>
        <form @submit.prevent="login">
            <div class="space-y-3">
                <input type="text" class="w-full h-10 rounded-lg border" placeholder="Masukan Email Anda"
                    v-model="data.email">
                <input type="password" class="w-full h-10 rounded-lg border" placeholder="Masukan Password Anda"
                    v-model="data.password">
            </div>
            <button class="p-2 rounded-lg bg-green-500">Log in</button>
        </form>
    </div>
</template>