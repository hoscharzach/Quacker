
const LOAD_POSTS = '/posts/LOAD'
const ADD_POST = '/posts/ADD'
const UPDATE_POST = '/posts/UPDATE'
const DELETE_POST = '/posts/DELETE'
const LOAD_ONE = '/posts/SINGLE'

const initialState = { normPosts: {} }

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
        return data
    } else {
        throw response
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

            // add all replies and the replies' replies to state
            recursiveIterator(action.posts, newState)
            return newState

        case ADD_POST:

            // deep copy old state
            newState = JSON.parse(JSON.stringify(state))

            // add post to state
            newState.normPosts[action.post.id] = action.post

            // increment parent's replies counter and add the post to parent's replies array
            if (action.post.inReplyTo) {
                newState.normPosts[action.post.inReplyTo].numReplies++
                newState.normPosts[action.post.inReplyTo].replies = [action.post, ...newState.normPosts[action.post.inReplyTo].replies]
            }

            return newState

        case UPDATE_POST:
            newState = JSON.parse(JSON.stringify(state))
            newState.normPosts[action.post.id] = action.post
            return newState

        case DELETE_POST:
            newState = JSON.parse(JSON.stringify(state))
            delete newState.normPosts[action.id]
            return newState

        default:
            return state
    }
}
