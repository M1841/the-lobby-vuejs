if(localStorage.c1 == undefined || localStorage.c2 == undefined) {
    localStorage.c1 = 'light'
    localStorage.c2 = 'dark'
} 


if(localStorage.isUser == undefined || localStorage.isUser == false) {
    localStorage.isUser = false
    aux = {
        id: null,
        name: ''
    }
    localStorage.user = JSON.stringify(aux)
}

if(localStorage.areNewPosts == undefined || localStorage.areNewPosts == false) {
    localStorage.areNewPosts = false
    localStorage.newPosts = ''
}

postCount = 2


const app = Vue.createApp({
    data() {
        return {
            user: JSON.parse(localStorage.user),
            theme: {
                c1: localStorage.c1,
                c2: localStorage.c2
            },
            page: 'main',
            posts: [
                    0,
                {
                    id: 1,
                    user: 'admin',
                    title: 'Test 1',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget massa semper, sagittis erat porta, fringilla nulla. Vivamus at tellus lorem. Quisque molestie diam libero, ac tempus lorem sollicitudin a. In non leo eu nunc efficitur accumsan nec sit amet eros. Mauris a felis nec libero rhoncus volutpat non ut nulla. Phasellus condimentum elementum lacus vel aliquam. Sed dictum massa mauris. Sed fringilla lorem ultrices, elementum quam vel, fringilla dui. Donec scelerisque auctor sapien in faucibus. Pellentesque hendrerit ipsum purus, eget posuere nisi tincidunt nec. Mauris porta posuere egestas.',
                    time: '06:54 PM - 09/05/2022',
                    likes: 1,
                    comments: 0,
                    edited: false
                },
                {
                    id: 2,
                    user: 'M1841',
                    title: 'Test 2',
                    content: 'Maecenas vel tempus dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam faucibus vulputate odio. Aliquam imperdiet tellus a placerat placerat. Praesent sit amet ipsum et ante vehicula efficitur. In luctus orci ut laoreet commodo. Suspendisse a purus mollis arcu congue mollis vitae quis lectus. Morbi non dui ac dolor dictum sagittis. Sed egestas leo sed urna blandit, et hendrerit dui ullamcorper. Donec tincidunt nec augue at vestibulum. Sed aliquet mi quis magna congue, a commodo velit pharetra. Nulla at justo sit amet metus consequat condimentum. Morbi purus magna, tempor eget egestas at, faucibus sed nisl. Phasellus ac auctor magna.',
                    time: '03:24 AM - 09/05/2022',
                    likes: 0,
                    comments: 2,
                    edited: true
                }
            ],
            likes: [
                {
                    user: 'M1841',
                    post: 1
                }
            ],
            commentLikes: [
                {
                    user: 'M1841',
                    comment: 1
                }
            ],
            comments: [
                0,
                {
                    id: 1,
                    post: 2,
                    user: 'admin',
                    time: '03:25 AM - 09/05/2022',
                    content: 'You up?',
                    likes: 1,
                    edited: true
                },
                {
                    id: 2,
                    post: 2,
                    user: 'M1841',
                    time: '06:56 PM - 09/05/2022',
                    content: 'Yeah haha',
                    likes: 0,
                    edited: false
                }
            ],
            commentCount: 2
        }
    },
    methods: {
        switchTheme(currentTheme) {
            if(currentTheme == 'dark') {
                localStorage.c1 = this.theme.c1 = 'light'
                localStorage.c2 = this.theme.c2 = 'dark'
            }
            else {
                if(currentTheme == 'light') {
                    localStorage.c1 = this.theme.c1 = 'dark'
                    localStorage.c2 = this.theme.c2 = 'secondary'
                }
            }
        },
        signOut() {
            aux = {
                id: null,
                name: ''
            }
            this.user = aux
            localStorage.user = JSON.stringify(aux)
            localStorage.isUser = false

        },
        signIn(username) {
            aux = {
                id: 0,
                name: username
            }
            this.user = aux
            localStorage.user = JSON.stringify(aux)
            localStorage.isUser = true
        },
        likePost(selectedPost) {
            aux = {
                user: this.user.name,
                post: selectedPost
            }
            if(this.likes.find(l => (l.user == aux.user && l.post == aux.post)) != undefined) {
                this.likes.splice(this.likes.lastIndexOf(this.likes.find(l => (l.user == aux.user && l.post == aux.post))), 1)
                this.posts[aux.post].likes --
            }
            else {
                this.likes.push(aux)
                this.posts[aux.post].likes ++
            }
        },
        likeComment(selectedComment) {
            aux = {
                user: this.user.name,
                comment: selectedComment
            }
            if(this.commentLikes.find(l => (l.user == aux.user && l.comment == aux.comment)) != undefined) {
                this.commentLikes.splice(this.commentLikes.lastIndexOf(this.commentLikes.find(l => (l.user == aux.user && l.comment == aux.comment))), 1)
                this.comments[aux.comment].likes --
            }
            else {
                this.commentLikes.push(aux)
                this.comments[aux.comment].likes ++
            }
        },
        addPost(newPost) {
            newPost.id = ++ postCount
            this.posts.push(newPost)
        },
        incrementCommentCount() {
            this.commentCount ++
        }
    }
})