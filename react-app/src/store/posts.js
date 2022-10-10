import clone from "./clone"

const LOAD_POSTS = '/posts/LOAD'
const ADD_POST = '/posts/ADD'
const UPDATE_POST = '/posts/UPDATE'
const DELETE_POST = '/posts/DELETE'
const LOAD_ONE = '/posts/SINGLE'
const ADD_USER_POSTS = '/posts/USER'
const ADD_NEW_POSTS = '/posts/NEW'
const ADD_OLD_POSTS = 'posts/OLD'
const UPDATE_USER_INFO = '/users/EDIT'
const TOGGLE_POST_LIKE = '/post/like'
const SET_USER_POSTS_LOADED = '/profile/POSTS'
const LOAD_SEARCH_RESULTS = '/search/POPULATE'

export const setPostsLoaded = (username, contentType) => ({
    type: SET_USER_POSTS_LOADED,
    contentType,
    username
})

export const loadPosts = (data) => ({
    type: LOAD_POSTS,
    data
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

const updateUser = (user) => ({
    type: UPDATE_USER_INFO,
    user
})

const togglePostLike = (data) => ({
    type: TOGGLE_POST_LIKE,
    data
})

export const loadSearchResults = (data) => ({
    type: LOAD_SEARCH_RESULTS,
    data
})


export const loadOldPosts = (data) => ({
    type: ADD_OLD_POSTS,
    data
})

export const searchThunk = (search) => async (dispatch) => {
    const response = await fetch(`/api/search/${search}`)

    if (response.ok) {
        const data = await response.json()
        // console.log(data, "DATA IN THUNK")
        dispatch(loadSearchResults(data))
    } else {
        return new Error("Something went wrong")
    }
}

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

export const getUserPosts = (username, query) => async (dispatch) => {
    const response = await fetch(`/api/posts/${username}/query/${query}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(updateUser(data.user))
        dispatch(addUserPosts(data.posts))
        dispatch(setPostsLoaded(username, query))
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
        return new Error('You are not authorized to delete this')
    }
}

export const getFeed = () => async (dispatch) => {
    const response = await fetch(`/api/posts/home/1`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadPosts(data))
    } else {
        const errors = await response.json()
        return errors
    }
}

export const getOldPosts = (page) => async (dispatch) => {
    const response = await fetch(`/api/posts/home/${page}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(loadOldPosts(data))
    } else {
        const errors = await response.json()
        return errors
    }
}
export const updateUserInfo = (payload) => async (dispatch) => {
    const response = await fetch(`/api/users/${payload.username}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateUser(data.user))
    } else {
        const errors = await response.json()
        return errors
    }
}

export const likePostToggle = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}/like`, {
        method: 'POST'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(togglePostLike(data))
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

const initialState = {
    normPosts: {},
    feed: [],
    users: {},
    fetched: false,
    page: 1,
    postsLoaded: {},
    searchPosts: [],
    searchUsers: [],
    searchPostsPage: 1,
    searchUsersPage: 1
}

export default function reducer(state = initialState, action) {

    let newState
    let parent

    switch (action.type) {

        case LOAD_SEARCH_RESULTS:
            let posts = {}
            let users = {}

            if (action.data.posts) {
                action.data.posts.forEach(post => {
                    users[post.user.username] = post.user
                    posts[post.id] = post
                })
            }

            if (action.data.users) {
                action.data.users.forEach(user => users[user.username] = user)
            }

            return {
                ...state,
                normPosts: {
                    ...state.normPosts,
                    ...posts
                },
                users: {
                    ...state.users,
                    ...users
                }
            }

        case SET_USER_POSTS_LOADED:

            let userLoadedState
            if (!state.postsLoaded[action.username]) {
                userLoadedState = {
                    quacks: false,
                    replies: false,
                    media: false,
                    likes: false
                }

                userLoadedState[action.contentType] = true
                return {
                    ...state,
                    postsLoaded: {
                        [action.username]: userLoadedState
                    }
                }
            } else {
                return {
                    ...state,
                    postsLoaded: {
                        ...state.postsLoaded,
                        [action.username]: {
                            ...state.postsLoaded[action.username],
                            [action.contentType]: true
                        }
                    }
                }
            }
        case TOGGLE_POST_LIKE:

            newState = { ...state }

            const id = action.data.postId
            const likes = action.data.updatedLikes

            return {
                ...state,
                normPosts: {
                    ...state.normPosts,
                    [id]: {
                        ...state.normPosts[id],
                        userLikes: likes
                    }
                }
            }

        case UPDATE_USER_INFO:
            newState = { ...state }

            Object.values(newState.normPosts).map(post => post.user.id === action.user.id ? post.user = action.user : post)
            newState.users[action.user.username] = action.user

            return newState

        case ADD_OLD_POSTS:
            const oldPosts = []
            const oldPostsObj = {}

            action.data.posts.forEach(post => {
                oldPostsObj[post.id] = post
                oldPosts.push(post.id)
            })

            return {
                ...state,
                page: action.data.page,
                normPosts: { ...state.normPosts, ...oldPostsObj },
                feed: [...state.feed, ...oldPosts]
            }

        case ADD_USER_POSTS:
            newState = { ...state }

            action.posts.forEach(post => {
                if (!newState.normPosts[post.id]) {
                    newState.normPosts[post.id] = post
                }
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

            let userFeed = []
            action.data.posts.forEach(post => {
                if (!newState.users[post.user.username]) {
                    newState.users[post.user.username] = post.user
                }
                userFeed.push(post.id)
                newState.normPosts[post.id] = post
            })

            newState.feed = userFeed
            newState.fetched = true

            newState.page = action.data.page
            return newState

        case ADD_POST:
            parent = action.post.inReplyTo


            if (parent) {
                let replyCount = state.normPosts[parent].numReplies
                return {
                    ...state,
                    normPosts: {
                        ...state.normPosts,
                        [action.post.id]: action.post,
                        [parent]: {
                            ...state.normPosts[parent],
                            numReplies: replyCount + 1
                        }
                    }

                }
            } else {
                return {
                    ...state,
                    normPosts: {
                        ...state.normPosts,
                        [action.post.id]: action.post
                    },
                    feed: [action.post.id, ...state.feed]
                }
            }

        case UPDATE_POST:
            return {
                ...state,
                normPosts: {
                    ...state.normPosts,
                    [action.post.id]: action.post
                }
            }

        case DELETE_POST:

            const normPostsCopy = { ...state.normPosts }
            parent = normPostsCopy[action.id].inReplyTo

            if (parent) {
                normPostsCopy[action.id].numReplies--
            }

            delete normPostsCopy[action.id]

            return {
                ...state,
                normPosts: {
                    ...normPostsCopy
                }
            }

        default:
            return state
    }
}
