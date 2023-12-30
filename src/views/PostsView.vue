<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { Post } from '@/common/types'

const posts = ref<Array<Post>>([])

onBeforeMount(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(data => data.json())
    posts.value = res
})

function removePost(postId: number) {
    const postIndex = posts.value.findIndex(post => post.id === postId)
    posts.value.splice(postIndex, 1)
}
</script>

<template>
    <div class="posts">
        <nav>
            <RouterLink to="/">Главная</RouterLink> /
            <RouterLink to="/posts">Список постов</RouterLink>
        </nav>
        <h1>Посты</h1>
        <ul class="posts__list">
            <li
                class="posts__item"
                v-for="post in posts"
                :key="post.id"
                @contextmenu.prevent="removePost(post.id)"
            >
                <RouterLink
                    :to="{ name: 'post-item', params: { id: post.id } }"
                    class="posts__link"
                >
                    {{ post.title }}
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.posts {
    width: 100%;

    &__list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    &__link {
        font-size: 24px;
        display: flex;
        height: 100%;
        padding: 20px;
        border: 1px solid #000;
        border-radius: 10px;
        cursor: pointer;
        text-decoration: none;

        &:hover {
            background: #f1f1f1;
        }
    }
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.router-link-active {
    text-decoration: none;
}

nav {
    font-size: 25px;
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 20px;
}
</style>
