const LOAD_POSTS = '/posts/LOAD'
const ADD_POST = '/posts/ADD'
const UPDATE_POST = '/posts/UPDATE'
const DELETE_POST = '/posts/DELETE'
const LOAD_ONE = '/posts/SINGLE'
const ADD_USER_POSTS = '/posts/USER'
const ADD_NEW_POSTS = '/posts/NEW'

const initialState = { normPosts: {}, feed: [], users: {}, fetched: false, lastFetch: null }

const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
})

const loadOnePost = (post) => ({
    type: LOAD_ONE,
    post
})

const addPost = (post) => ({
    type: ADD_POST,
    post
})

const deletePost = (id) => ({
    type: DELETE_POST,
    id
})

const editPost = (post) => ({
    type: UPDATE_POST,
    post
})

const addUserPosts = (posts) => ({
    type: ADD_USER_POSTS,
    posts
})

const loadNewPosts = (posts) => ({
    type: ADD_NEW_POSTS,
    posts
})

export const getSinglePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadOnePost(data.post))
    } else {
        return new Error('Post not found')
    }
}

export const updatePostById = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(editPost(data.post))
    } else {
        const error = await response.json()
        return error
    }
}

export const getUserPosts = (username) => async (dispatch) => {
    const response = await fetch(`/api/posts/${username}/quacks`)
    if (response.ok) {
        const data = await response.json()
        dispatch(addUserPosts(data.posts))
    } else {
        const error = await response.json()
        return error
    }
}

export const deletePostById = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deletePost(id))
    } else {
        throw ('You are not authorized to delete this')
    }
}

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/home')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadPosts(data.posts))
    } else {
        const errors = await response.json()
        return errors
    }
}

export const getNewPosts = (payload) => async (dispatch) => {
    const response = await fetch('/api/posts/home/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(loadNewPosts(data.posts))
    } else {
        const errors = await response.json()
        return errors
    }
}



export const createNewPost = (payload) => async (dispatch) => {
    const response = await fetch('/api/posts/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addPost(data.post))
    } else {
        const errors = await response.json()

        return errors
    }
}

export default function reducer(state = initialState, action) {
    let newState
    // const currTime = new Date()
    // const currTimeUTC = new Date(Date.UTC(currTime)).toUTCString()
    // console.log(currTimeUTC, "CURR TIME IN REDUCER")

    switch (action.type) {

        case ADD_NEW_POSTS:
            newState = JSON.parse(JSON.stringify(state))
            newState.feed = [...action.posts, ...newState.feed]
            action.posts.forEach(post => {
                newState.normPosts[post.id] = post
            })

            newState.latestPost = newState.feed[0].id
            newState.oldestPost = newState.feed[newState.feed.length - 1].id
            return newState

        case ADD_USER_POSTS:
            newState = { ...state }
            if (!newState.users[action.posts[0].user.username]) {
                newState.users[action.posts[0].user.username] = action.posts[0].user
            }

            action.posts.forEach(post => {
                newState.normPosts[post.id] = post
                if (post.inReplyTo && !newState.normPosts[post.inReplyTo]) {
                    newState.normPosts[post.inReplyTo] = post.parent
                }
            })

            return newState

        case LOAD_ONE:
            newState = { ...state }

            // add new post to state
            newState.normPosts[action.post.id] = action.post

            // if the author of the post is not in state, add them
            if (!newState.users[action.post.user.username]) {
                newState.users[action.post.user.username] = action.post.user
            }

            // if the parent user is not in state, add them
            if (action.post.parent && !newState.users[action.post.parent.user.username]) {
                newState.users[action.post.parent.user.username] = action.post.parent.user
            }

            // if the post has a parent and the parent isn't in state, put it in state
            if (action.post.parent && !newState.normPosts[action.post.inReplyTo]) {
                newState.normPosts[action.post.inReplyTo] = action.post.parent
            }

            // put all replies into state only if they aren't already in state (aka they have a replies property)
            action.post.replies.forEach(reply => {
                if (newState.normPosts[reply.id]?.replies) return
                newState.normPosts[reply.id] = reply
                if (!newState.users[reply.user.username]) {
                    newState.users[reply.user.username] = reply.user
                }
            })

            return newState


        case LOAD_POSTS:
            newState = { ...state }

            // normalize all posts in state along with their
            // respective users for faster loading of user profile later
            action.posts.forEach(post => {
                if (!newState.users[post.user.username]) {
                    newState.users[post.user.username] = post.user
                }
                newState.normPosts[post.id] = post
            })

            // copy all posts into the feed
            newState.feed = [...action.posts]
            newState.fetched = true

            newState.latestPost = newState.feed[0].id
            newState.oldestPost = newState.feed[newState.feed.length - 1].id

            return newState

        case ADD_POST:
            newState = { ...state }

            // add post to state
            newState.normPosts[action.post.id] = action.post

            // if it's a reply, adjust the parents numReplies and replies accordingly
            if (action.post.inReplyTo) {
                const i = action.post.inReplyTo
                if (!newState.normPosts[i].replies) {
                    newState.normPosts[i].replies = [action.post]
                    newState.normPosts[i].numReplies++
                } else {
                    newState.normPosts[action.post.inReplyTo].numReplies++
                    newState.normPosts[action.post.inReplyTo].replies = [action.post, ...newState.normPosts[action.post.inReplyTo].replies]
                }
            } else {
                // if it's not a reply, just prepend it to the feed array
                newState.feed = [action.post, ...newState.feed]
            }

            return newState

        case UPDATE_POST:
            newState = JSON.parse(JSON.stringify(state))
            if (action.post.inReplyTo) {
                const j = action.post.inReplyTo
                newState.normPosts[action.post.id] = action.post
                if (newState.normPosts[j].replies) {
                    newState.normPosts[j].replies = newState.normPosts[j].replies.map(post => action.post.id === post.id ? action.post : post)
                }
            } else {
                newState.feed = newState.feed.map(el => action.post.id === el.id ? action.post : el)
                newState.normPosts[action.post.id] = action.post
            }
            return newState

        case DELETE_POST:
            newState = { ...state }

            if (newState.normPosts[action.id].inReplyTo) {
                const i = newState.normPosts[action.id].inReplyTo
                newState.normPosts[i].numReplies--
                newState.normPosts[i].replies = newState.normPosts[i].replies.filter(el => el.id !== action.id)
            } else {
                newState.feed = newState.feed.filter(el => el.id !== action.id)
            }
            delete newState.normPosts[action.id]
            return newState

        default:
            return state
    }
}
