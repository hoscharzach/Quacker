
const LOAD_POSTS = '/posts/LOAD'
const ADD_POST = '/posts/ADD'
const UPDATE_POST = '/posts/UPDATE'
const DELETE_POST = '/posts/DELETE'

const initialState = { normPosts: {}, allPosts: [] }

const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
})

const addPost = (post) => ({
    type: ADD_POST,
    post
})

const deletePost = (id) => ({
    type: DELETE_POST,
    id
})

export const deletePostById = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deletePost(id))
    } else {
        return response
    }
}

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/home')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadPosts(data.posts))
    } else {
        return response
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
    }
}

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
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
