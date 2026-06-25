export type User = {
    handle: string
    name: string
    email: string
    password: string
    description: string
    image: string
    links: string
}

export type RegisterForm = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    password_confirmation: string
}


// agregando type para login
export type LoginForm = Pick<User, 'email'> & {
    password: string
}  

export type ProfileForm = Pick<User, 'handle' | 'description'>


export type UserHandle = Pick<User, 'description' | 'handle' | 'image', 'links', | 'name'>




// type para links

export type socialNetwork ={
        id: number,
        name: string,
        url: string,
        enabled: boolean
}

export type DevTreeLink = Pick<socialNetwork,'name'| 'url'| 'enabled'>