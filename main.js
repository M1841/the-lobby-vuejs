if(localStorage.c1 == undefined || localStorage.c2 == undefined) {
    localStorage.c1 = 'light'
    localStorage.c2 = 'dark'
} 


if(localStorage.id == undefined || localStorage.name == undefined) {
    localStorage.id = null
    localStorage.name = ''
}

const app = Vue.createApp({
    data() {
        return {
            user: {
                id: localStorage.id,
                name: localStorage.name
            },
            theme: {
                c1: localStorage.c1,
                c2: localStorage.c2
            },
            page: 'main'
        }
    },
    methods: {
        switchTheme(current) {
            if(current == 'dark') {
                localStorage.c1 = this.theme.c1 = 'light'
                localStorage.c2 = this.theme.c2 = 'dark'
            }
            else {
                if(current == 'light') {
                    localStorage.c1 = this.theme.c1 = 'dark'
                    localStorage.c2 = this.theme.c2 = 'secondary'
                }
            }
        },
        signOut() {
            this.user = {
                id: 'null',
                name: ''
            }
            localStorage.id = null
            localStorage.name = ''

        },
        signIn() {
            aux = {
                id: 0,
                name: 'admin'
            }
            this.user = aux
            localStorage.id = aux.id
            localStorage.name = aux.name
        }
    }
})