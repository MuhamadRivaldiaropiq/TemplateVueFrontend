<script setup>
import { projectStore } from "@/stores/Project";
import { loginStore } from "@/stores/login";
import { onMounted, ref } from "vue";

const store = projectStore()
const storeLogin = loginStore()
const project = ref([])

onMounted(async () => {
    await store.getProject()
    project.value = store.project
})

const logout = async () => {
    await storeLogin.logout()
}
</script>

<template>
    {{ project }}
    <button class="p-2 bg-green-500 rounded-lg" @click="logout">Logout</button> <!-- <h1 class="text-3xl font-bold underline">
        Hello world!
    </h1> -->
</template>