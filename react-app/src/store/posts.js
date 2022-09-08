
const LOAD_POSTS = '/posts/LOAD'
const ADD_POST = '/posts/ADD'
const UPDATE_POST = '/posts/UPDATE'
const DELETE_POST = '/posts/DELETE'
const LOAD_ONE = '/posts/SINGLE'

const initialState = { normPosts: {}, feed: [] }

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

export const getSinglePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadOnePost(data.post))
        return data.post
    } else {
        throw response
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

export const deletePostById = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deletePost(id))
    } else {
        throw response
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

const recursiveIterator = (arr, newState) => {
    arr.forEach(el => {
        newState.normPosts[el.id] = el
        if (el.replies.length > 0) {
            recursiveIterator(el.replies, newState)
        }
    })
}

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_ONE:
            newState = JSON.parse(JSON.stringify(state))

            newState.normPosts[action.post.id] = action.post
            recursiveIterator(action.post.replies, newState)

            return newState


        case LOAD_POSTS:
            newState = { ...state }

            // take all of the posts returned and put them into the feed
            newState.feed = action.posts

            // add all replies and the replies' replies to state
            recursiveIterator(action.posts, newState)
            return newState

        case ADD_POST:

            // deep copy old state (might not need this but doing it just in case)
            newState = JSON.parse(JSON.stringify(state))

            // add post to state
            newState.normPosts[action.post.id] = action.post

            // if it's a reply, adjust the parents numReplies and replies accordingly
            if (action.post.inReplyTo) {
                newState.normPosts[action.post.inReplyTo].numReplies++
                newState.normPosts[action.post.inReplyTo].replies = [action.post, ...newState.normPosts[action.post.inReplyTo].replies]
            } else {
                newState.feed = [action.post, ...newState.feed]
            }

            return newState

        case UPDATE_POST:
            newState = JSON.parse(JSON.stringify(state))
            newState.normPosts[action.post.id] = action.post
            newState.feed = newState.feed.map(el => action.post.id === el.id ? action.post : el)
            return newState

        case DELETE_POST:
            newState = JSON.parse(JSON.stringify(state))

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
