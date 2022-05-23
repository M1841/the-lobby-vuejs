app.component("sign-in-modal", {
    props: {
        theme: {
            type: Object,
            required: true
        }
    },
    template:
    /* html */
    `
        <div class="modal fade" id="signInModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="container-fluid rounded p-3 w-100" :class="'bg-' + theme.c1">
                        <h3 class="px-2 mb-3" :class="'text-' + theme.c2" unselectable="on" onselectstart="return false;" onmousedown="return false;" style="cursor: default;">Sign In</h3>
                        <form @submit.prevent="signIn" class="px-2">
                            <div class="form-floating mb-1">
                                <input required type="text" name="username" id="username" v-model="username" class="form-control border-0 rounded-0 rounded-top me-2" :class="'text-' + theme.c2" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                                <label for="username" :class="'text-' + theme.c2">Username</label>
                            </div>
                            <div class="form-floating mb-2 d-flex">
                                <input required :type="[showPassword ? 'text' : 'password']" name="password" id="password" class="form-control border-0 rounded-0 rounded-bottom me-0 pe-5" :class="'text-' + theme.c2" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                                <label for="password" :class="'text-' + theme.c2">Password</label>
                                <button @click="toggleShowPassword" type="button" class="border-0 rounded-0 rounded-bottom pe-4" :class="'text-' + theme.c2" style="margin-left: -40px" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                                    <i class="bi" :class="'bi-eye' + [showPassword ? '' : '-slash']"></i>
                                </button>
                            </div>
                            <div class="text-secondary w-100 fst-italic" style="font-size: 0.9rem" unselectable="on" onselectstart="return false;" onmousedown="return false;" style="cursor: default;">There are no real accounts. You can type whatever you want!</div>
                            <button type="submit" class="border-0 form-control py-3 mt-2 mb-0 text-success" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                                <i class="bi bi-check2-square"></i>
                                Sign In
                            </button>
                            <button id="closeSignInModal" type="button" class="d-none" data-bs-dismiss="modal"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            showPassword: false
        }
    },
    methods: {
        toggleShowPassword() {
            this.showPassword = !this.showPassword
        },
        signIn() {
            if(this.username === '' || this.password === '') {
                return
            }
            console.log(this.username)
            this.$emit('sign-in', this.username)
            document.getElementById('closeSignInModal').click()
        }
    }
})