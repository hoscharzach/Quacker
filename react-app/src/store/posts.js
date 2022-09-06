
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
    console.log(response, "RESPONSE IN THUNK")

    if (response.ok) {
        const data = await response.json()
        console.log(data, "DATA INSIDE THUNK")
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

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_ONE:
            newState = JSON.parse(JSON.stringify(state))
            console.log(action, "ACTION INSIDE REDUCER")
            newState.normPosts[action.post.id] = action.post
            action.post.replies?.length > 0 && action.post.replies.forEach(el => {
                newState.normPosts[el.id] = el
            })
            if (action.post.parent) {
                newState.normPosts[action.post.parent.id] = action.post.parent
            }
            // newState.allPosts = [...newState.allPosts, action.post]

            return newState


        case LOAD_POSTS:
            newState = { ...state }
            // newState.allPosts = [...action.posts]
            action.posts.forEach(el => {
                newState.normPosts[el.id] = el
                el.replies.forEach(el => {
                    newState.normPosts[el.id] = el
                })
            })
            return newState

        case ADD_POST:

            // deep copy old state
            newState = JSON.parse(JSON.stringify(state))

            // add post with key as id
            newState.normPosts[action.post.id] = action.post
            // preprend post to allPosts array because it's newer
            // newState.allPosts = [action.post, ...newState.allPosts]

            // if it's a reply, increment the number of replies key on parent post
            if (action.post.inReplyTo) {
                console.log(action.post, "ACTION.POST")
                console.log(newState.normPosts[action.post.inReplyTo], "NEW STATE AT PARENT POST")
                newState.normPosts[action.post.inReplyTo].numReplies++
                newState.normPosts[action.post.inReplyTo].replies = [action.post, ...newState.normPost[action.post.inReplyTo].replies]
                // const parent = newState.allPosts.find(el => el.id === action.post.inReplyTo)
                // console.log(parent, "PARENT POST IN REDUCER")
                // parent.numReplies++
            }

            return newState

        case UPDATE_POST:
            newState = { ...state }
            newState.normPosts[action.post] = action.post
            // newState.allPosts = newState.allPosts.map(el => el.id === action.post.id ? action.post : el)
            return newState

        case DELETE_POST:
            newState = { ...state }
            delete newState.normPosts[action.id]
            // newState.allPosts = newState.allPosts.filter(el => {
            //     return el.id !== action.id
            // })
            return newState

        default:
            return state
    }
}
