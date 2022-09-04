
const LOAD_POSTS = '/posts/LOAD'
const ADD_POST = '/posts/ADD'
const UPDATE_POST = '/posts/UPDATE'
const DELETE_POST = '/posts/DELETE'
const LOAD_ONE = '/posts/SINGLE'

const initialState = { normPosts: {}, allPosts: [] }

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
    console.log(response, "RESPONSE IN THUNK")

    if (response.ok) {
        const data = await response.json()
        console.log(data, "DATA INSIDE THUNK")
        dispatch(loadOnePost(data.post))
    } else {
        return response.status
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
        throw response
    }
}

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_ONE:
            newState = JSON.parse(JSON.stringify(state))
            console.log(action, "ACTION INSIDE REDUCER")
            newState.normPosts[action.post.id] = action.post
            newState.allPosts = [...newState.allPosts, action.post]
            return newState

        case LOAD_POSTS:
            newState = { ...state }
            newState.allPosts = [...action.posts]

            action.posts.forEach(el => {
                newState.normPosts[el.id] = el
            })
            return newState

        case ADD_POST:
            newState = { ...state }
            newState.normPosts[action.post.id] = action.post
            newState.allPosts = [action.post, ...newState.allPosts]
            return newState

        case UPDATE_POST:
            newState = { ...state }
            newState.normPosts[action.post] = action.post
            newState.allPosts = newState.allPosts.map(el => el.id === action.post.id ? action.post : el)
            return newState

        case DELETE_POST:
            newState = { ...state }
            delete newState.normPosts[action.id]
            newState.allPosts = newState.allPosts.filter(el => {
                return el.id !== action.id
            })
            return newState

        default:
            return state
    }
}
