app.component('post-list', {
    props: {
        user: {
            type: Object,
            required: false
        },
        theme: {
            type: Object,
            required: true
        },
        posts: {
            type: Array,
            required: true
        },
        comments: {
            type: Array,
            required: true
        },
        likes: {
            type: Array,
            required: true
        },
        clikes: {
            type: Array,
            required: true
        },
    },
    template:
    /* html */
    `   <div v-for="(post, id) in posts.slice().reverse()">
            <div v-if="post != 0" :key="id" class="container-fluid rounded px-3 py-3 w-100 mb-3" :class="'bg-' + theme.c1">

                <!-- Post Header -->
                <div class="px-2">
                    <small class="text-muted fs-7 d-flex" unselectable="on" onselectstart="return false;" onmousedown="return false;" style="cursor: default;">
                        <button @click="pageProfile" type="button" class="m-0 me-1 p-0 border-0 d-flex text-secondary" style="background: none">{{ post.user }}</button>
                        <span class="text-secondary">
                            - {{ post.time }}
                            <em v-if="post.edited">- edited</em>
                        </span>
                    </small>
                    <h3 :class="'text-' + theme.c2" style="cursor: default;">
                        {{ post.title }}
                    </h3>
                </div>
                <hr class="m-2" :class="'text-' + theme.c2">

                <!-- Post Content -->
                <div class="px-2" :class="'text-' + theme.c2" style="cursor: default; white-space: pre-wrap;">
                    {{ post.content }}
                </div>
                <hr class="m-2" :class="'text-' + theme.c2">

                <!-- Post Operations -->
                <div class="px-2 d-flex" unselectable="on" onselectstart="return false;" onmousedown="return false;" style="cursor: default;">
                    <button data-bs-toggle="modal" data-bs-target="#signInModal" type="button" class="d-none" id="openSignInModal"></button>

                    <button @click="likePost(post.id)" type="button" class="m-0 me-1 p-0 border-0 d-flex" :class="'text-' + [likes.find(l => (l.user == user.name && l.post == post.id)) != undefined ? 'danger' : theme.c2] " style="background: none">
                        <i class="bi me-1" :class="[likes.find(l => (l.user == user.name && l.post == post.id)) != undefined ? 'bi-heart-fill' : 'bi-heart' ]"></i>
                        <span class="text-secondary">
                            {{ post.likes }}
                        </span>
                    </button>

                    <div class="vr mx-3" :class="'text-' + theme.c2"></div>
                    
                    <button data-bs-toggle="collapse" :href="'#comments-' + post.id" type="button" class="m-0 me-1 p-0 border-0 d-flex" :class="'text-' + theme.c2" style="background: none">
                        <i class="bi bi-chat me-1"></i>
                        <span class="text-secondary">
                            {{ post.comments }}
                        </span>
                    </button>

                    <div v-if="post.user == user.name" class="vr mx-3" :class="'text-' + theme.c2"></div>
                    <button @click="editPost" v-if="post.user == user.name" type="button" class="m-0 me-1 p-0 border-0 d-flex" :class="'text-' + theme.c2" style="background: none">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </div>
                <!-- Post Comments -->
                <comments-list :post="post.id" :theme="theme" :user="user" :comments="comments" :clikes="clikes" @like-comment="likeComment"></comments-list>
            </div>
        </div>
    `,
    methods: {
        likePost(selectedPost) {
            if(this.user.name == '' && this.user.id == null) {
                document.getElementById('openSignInModal').click()
                return
            }
            this.$emit('like-post', selectedPost)
        },
        likeComment(selectedComment) {
            if(this.user.name == '' && this.user.id == null) {
                document.getElementById('openSignInModal').click()
                return
            }
            this.$emit('like-comment', selectedComment)
        }
    },
    data() {
        return {
            likes: this.likes
        }
    }
})