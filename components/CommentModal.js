app.component('comment-modal', {
    props: {
        user: {
            type: Object,
            required: false
        },
        theme: {
            type: Object,
            required: true
        },
        post: {
            type: Number,
            required: true
        }
    },
    template:
    /* html */
    `
        <div class="modal fade" :id="'commentModal-' + post" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="container-fluid rounded p-3 w-100" :class="'bg-' + theme.c1">
                        <h3 class="px-2 pb-3" :class="'text-' + theme.c2">
                            <i class="bi bi-plus-lg"></i>
                            Add a comment
                        </h3>
                        <form @submit.prevent="submitComment" class="px-2">
                            <!-- Comment Content -->
                            <div class="form-floating mb-2">
                                <textarea required name="commentContent" id="commentContent" v-model="commentContent" class="form-control border-0 me-0" :class="'text-' + theme.c2" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]" style="min-height: 150px"></textarea>
                                <label for="commentContent" class="pt-3" :class="'text-' + theme.c2">Comment content</label>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="border-0 form-control py-3 mt-2 mb-0 text-success" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                                <i class="bi bi-check2-square"></i>
                                Save
                            </button>
                            <button :id="'closeCommentModal-' + post" type="button" class="d-none" data-bs-dismiss="modal"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            commentContent: ''
        }
    },
    methods: {
        submitComment() {
            if(this.commentContent === '') {
                return
            }
            const d = new Date();
            hour = (d.getHours() > 12 ? '0' + (d.getHours() - 12) : d.getHours())
            suffix = (d.getHours > 12 ? ' AM' : ' PM')
            date = (d.getDate >= 10 ? d.toLocaleDateString() : '0' + d.toLocaleDateString())
            aux =  hour + ':' + d.getMinutes() + suffix + ' - ' + date;
            const comment = {
                id: 0,
                post: this.post,
                user: this.user.name,
                content: this.commentContent.trim(),
                time: aux,
                likes: 0,
                edited: false
            }
            this.$emit('comment-submitted', comment)
            this.commentContent = ''
            document.getElementById('commentContent').value = ''
            document.getElementById('closeCommentModal-' + this.post).click()
        }
    }
})