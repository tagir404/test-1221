<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { User, Post } from '@/common/types'

const props = defineProps<{
    id: string
}>()

const userInfo = ref<User | null>(null)
const post = ref<Post | null>(null)

onBeforeMount(async () => {
    const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${props.id}`).then(
        data => data.json()
    )
    post.value = resPost
    const resUser = await fetch(
        `https://jsonplaceholder.typicode.com/users/${post.value?.userId}`
    ).then(data => data.json())
    userInfo.value = resUser
})
</script>

<template>
    <div>
        <nav>
            <RouterLink to="/">Главная</RouterLink> /
            <RouterLink to="/posts">Список постов</RouterLink> /
            <RouterLink :to="`/posts/${props.id}`">Пост № {{ props.id }}</RouterLink>
        </nav>

        <div class="details">
            <template v-if="post">
                <h1>{{ post.title }}</h1>
                <p>{{ post.body }}</p>
            </template>

            <div v-if="userInfo">
                <h3>Об авторе</h3>
                <p>Имя: {{ userInfo.name }}</p>
                <p>
                    Email: <a :href="`mailto:${userInfo.email}`">{{ userInfo.email }}</a>
                </p>
                <p>
                    Телефон:
                    <a :href="`tel:+${userInfo.phone.replace(/\D+/g, '')}`">{{ userInfo.phone }}</a>
                </p>
                <p>
                    Website:
                    <a
                        :href="`https://${userInfo.website}`"
                        target="_blank"
                        >{{ userInfo.website }}</a
                    >
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
nav {
    font-size: 25px;
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 20px;
}

.router-link-active {
    text-decoration: none;
}

.details {
    font-size: 20px;
}
</style>
