app.component('post-modal', {
    props: {
        user: {
            type: Object,
            required: false
        },
        theme: {
            type: Object,
            required: true
        },
        x: {
            type: Number,
            required: true
        }
    },
    template:
    /* html */
    `
        <div class="modal fade" id="postModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="container-fluid rounded p-3 w-100" :class="'bg-' + theme.c1">
                        <h3 class="px-2" :class="'text-' + theme.c2">
                            <i class="bi bi-plus-lg"></i>
                            Add a post
                        </h3>
                        <form @submit.prevent="submitPost" class="px-2">
                            <!-- Post Title -->
                            <div class="form-floating mb-1 pt-2">
                                <input type="text" required name="title" id="title" v-model="title" class="form-control border-0 rounded-0 rounded-top me-0" :class="'text-' + theme.c2" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                                <label for="title" class="pt-4" :class="'text-' + theme.c2">Post title</label>
                            </div>

                            <!-- Post Content -->
                            <div class="form-floating mb-2">
                                <textarea required name="postContent" id="postContent" v-model="postContent" class="form-control border-0 rounded-0 rounded-bottom me-0" :class="'text-' + theme.c2" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]" style="min-height: 150px"></textarea>
                                <label for="postContent" class="pt-3" :class="'text-' + theme.c2">Post content</label>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="border-0 form-control py-3 mt-2 mb-0 text-success" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                                <i class="bi bi-check2-square"></i>
                                Save
                            </button>
                            <button id="closePostModal" type="button" class="d-none" data-bs-dismiss="modal"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        submitPost() {
            if(this.title === '' || this.postContent === '') {
                return
            }
            const d = new Date();
            hour = (d.getHours() > 12 ? '0' + (d.getHours() - 12) : d.getHours())
            suffix = (d.getHours > 12 ? ' AM' : ' PM')
            date = (d.getDate >= 10 ? d.toLocaleDateString() : '0' + d.toLocaleDateString())
            aux =  hour + ':' + d.getMinutes() + suffix + ' - ' + date;
            const post = {
                id: 0,
                user: this.user.name,
                title: this.title,
                content: this.postContent,
                time: aux,
                likes: 0,
                comments: 0,
                edited: false
            }
            this.$emit('post-submitted', post)
            this.title = ''
            document.getElementById('title').value = ''
            this.postContent = ''
            document.getElementById('postContent').value = ''
            document.getElementById('closePostModal').click()
        }
    }
})