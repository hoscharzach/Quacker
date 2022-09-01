
const LOAD_POSTS = '/posts/LOAD'
const ADD_POST = '/posts/ADD'
const UPDATE_POST = '/posts/UPDATE'
const DELETE_POST = '/posts/DELETE'

const initialState = { normPosts: {}, allPosts: [] }

const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
})

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadPosts(data.allPosts))
    } else {
        throw response
    }
}


export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_POSTS:
            newState = JSON.parse(JSON.stringify(state))
            console.log(action, "ACTION IN REDUCER")
            newState.allPosts = [...action.posts]

            action.posts.forEach(el => {
                newState.normPosts[el.id] = el
            })
            return newState
        default:
            return state
    }
}
