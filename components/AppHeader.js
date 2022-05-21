app.component('app-header', {
    props: {
        user: {
            type: Object,
            required: false
        },
        theme: {
            type: Object,
            required: true
        }
    },
    template:
    /* html */
    `   <header class="sticky-sm-top pb-1" style="background-color: #151515;">
            <div class="container-fluid rounded py-2 w-100 mb-3" :class="'bg-' + theme.c1" >
                <nav class="navbar justify-content-evenly justify-content-md-between px-2" :class="'navbar-' + theme.c1">

                    <!-- Title -->
                    <button @click="pageMain" type="button" class="navbar-brand m-0 btn border-0 rounded-0 rounded-end d-flex" :class="'text-' + theme.c2" style="background: none">
                        The Lobby
                    </button>

                    <!-- Search Bar -->
                    <form method="GET" class="d-flex w-50">
                        <input type="text" name="search" class="form-control border-0 pe-4" :class="'text-' + theme.c2" required :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                        <button @click="search" class="border-0 rounded-0 rounded-end btn" :class="'text-' + theme.c2" style="margin: -36px">
                            <i class="bi bi-search"></i>
                        </button>
                    </form>

                    <!-- User Menu -->
                    <div class="d-flex">
                        <button @click="pageSignIn" v-if="user.id == 'null'" class="navbar-item my-auto border-0" :class="'text-' + theme.c2" style="background: none" unselectable="on" onselectstart="return false;" onmousedown="return false;">
                            Sign In
                        </button>

                        <div v-else class="dropdown d-flex">
                            <button data-bs-toggle="dropdown" class="btn navbar-item my-auto border-0 dropdown-toggle" :class="'text-' + theme.c2" style="background: none" unselectable="on" onselectstart="return false;" onmousedown="return false;">
                                {{ user.name }}
                            </button>
                            <ul class="dropdown-menu" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                                <li>
                                    <button @click="pageProfile" class="navbar-item my-auto border-0 ms-3" :class="'text-' + theme.c2" style="background: none" unselectable="on" onselectstart="return false;" onmousedown="return false;">
                                        <i class="bi bi-card-list me-1"></i>
                                        My profile
                                    </button>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <button @click="pageAddPost" class="navbar-item my-auto border-0 ms-3" :class="'text-' + theme.c2" style="background: none" unselectable="on" onselectstart="return false;" onmousedown="return false;">
                                        <i class="bi bi-plus-lg me-1"></i>
                                        Add a post
                                    </button>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <button @click="pageSettings" class="navbar-item my-auto border-0 ms-3" :class="'text-' + theme.c2" style="background: none" unselectable="on" onselectstart="return false;" onmousedown="return false;">
                                        <i class="bi bi-gear me-1"></i>
                                        Settings
                                    </button>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <button @click="signOut" class="navbar-item my-auto border-0 ms-3 pb-1" :class="'text-' + theme.c2" style="background: none" unselectable="on" onselectstart="return false;" onmousedown="return false;">
                                        <i class="bi bi-door-open me-1"></i>
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                        
                        <!-- Theme Switch -->
                        <button @click="switchTheme(theme.c1)" class="btn navbar-item my-auto border-0 fs-3 p-0 ms-4" :class="'text-' + theme.c2" style="background: none" unselectable="on" onselectstart="return false;" onmousedown="return false;">
                            <i class="bi" :class="'bi-' + [ theme.c1 == 'dark' ? 'sun' : 'moon' ]"></i>
                        </button>

                    </div>
                </nav>
            </div>
        </header>
    `,
    methods: {
        switchTheme(current) {
            this.$emit('switch-theme', current)
        },
        signOut() {
            this.$emit('sign-out')
        },
        pageSignIn() {
            this.$emit('sign-in')
        }
    }
})