app.component('comments-list', {
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
        },
        comments: {
            type: Array,
            required: false
        },
        clikes: {
            type: Array,
            required: true
        },
    },
    template:
    /* html */
    `
        <div class="collapse" :id="'comments-' + post">
            <hr class="m-2" :class="'text-' + theme.c2">
            <div class="px-2" :class="'text-' + theme.c2">
                <h5 class="ps-1">
                    Comments:
                </h5>
                <button data-bs-toggle="modal" data-bs-target="#commentModal" type="button" class="d-none" id="openCommentModal"></button>
                <button @click="addComment" class="border-0 form-control py-3 mt-2" :class="'text-' + theme.c2" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                    <i class="bi bi-plus-lg"></i>
                    Add a comment
                </button>
                <div v-for="comment in comments.filter(underPost)" class="rounded p-3 w-100 mt-3 d-flex" :style="'background-color:' + [ theme.c1 == 'dark' ? '#151515' : '#E9E9E9' ]">
                    <div class="d-block" style="width: 90%">

                        <!-- Comment Header -->
                        <div class="px-2">
                            <small class="text-secondary fs-7" unselectable="on" onselectstart="return false;" onmousedown="return false;" style="cursor: default;">
                                {{ comment.user }}
                                -
                                {{ comment.time }}
                                <em v-if="comment.edited"> - edited</em>
                            </small>
                        </div>
                        <hr class="m-2" :class="'text-' + theme.c2">

                        <!-- Comment Content -->
                        <div class="px-2" style="white-space: pre-wrap;">{{ comment.content }}</div>

                    </div>

                    <!-- Comment Operations -->
                    <div class="m-auto ps-3 d-flex" unselectable="on" onselectstart="return false;" onmousedown="return false;" style="cursor: default;">

                        <button @click="likeComment(comment.id)" type="button" class="m-0 me-1 p-0 border-0 d-flex" :class="'text-' + [clikes.find(l => (l.user == user.name && l.comment == comment.id)) != undefined ? 'danger' : theme.c2]" style="background: none">
                            <i class="bi me-1" :class="[clikes.find(l => (l.user == user.name && l.comment == comment.id)) != undefined ? 'bi-heart-fill' : 'bi-heart' ]"></i>
                            <span class="text-secondary">
                                {{ comment.likes }}
                            </span>
                        </button>
                        <button @click="editComment" v-if="comment.user == user.name" type="button" class="m-0 ms-2 p-0 border-0 d-flex" :class="'text-' + theme.c2" style="background: none">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        underPost(selectedComment) {
            return selectedComment.post == this.post
        },
        likeComment(selectedComment) {
            this.$emit('like-comment', selectedComment)
        },
        addComment() {
            if(this.user.name == '' && this.user.id == null) {
                document.getElementById('openSignInModal').click()
                return
            }
            document.getElementById('openCommentModal').click()
        }
    }
})