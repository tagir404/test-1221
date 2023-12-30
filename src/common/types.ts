interface Post {
    title: string
    body: string
    id: number
    userId: number
}

interface User {
    name: string
    email: string
    phone: string
    website: string
}

export type { Post, User }
