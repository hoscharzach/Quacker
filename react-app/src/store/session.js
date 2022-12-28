// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_ERROR = 'session/ADD_ERROR'
const REMOVE_ERRORS = 'session/REMOVE_ERRORS'
const UPDATE_LIKES = 'session/UPDATE_LIKES'
const FOLLOW_USER = 'session/FOLLOW_USER'


const follow = (username) => ({
  type: FOLLOW_USER,
  username
})

export const addError = (error) => ({
  type: ADD_ERROR,
  error
})

export const removeErrors = () => ({
  type: REMOVE_ERRORS
})

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

export const updateSessionUserLikes = (postId) => ({
  type: UPDATE_LIKES,
  postId
})

const initialState = { user: null, errors: [] };


export const followUser = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/${username}/follow`, {
    method: "POST"
  })

  if (response.ok) {
    const data = await response.json()
    if (data.errors) {
      return;
    }
  }

  dispatch(follow(username))
}
export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['Error: An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, displayname) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      displayname
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['error: An error occurred. Please try again.']
  }
}

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {

    // case FOLLOW_USER:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       followers: state.user.followers ? [...state.user.followers, action.fo]
    //     }
    //   }

    case UPDATE_LIKES:
      newState = { ...state }
      newState.user.postLikes.has(action.postId) ? newState.user.postLikes.delete(action.postId) : newState.user.postLikes.add(action.postId)
      return newState
    case SET_USER:
      const likedPostsSet = new Set(action.payload.postLikes)
      action.payload.postLikes = likedPostsSet
      return {
        ...state,
        user: action.payload
      }
    case REMOVE_USER:
      return { user: null }
    case ADD_ERROR:
      newState = { ...state }
      newState.errors = [...newState.errors, action.error]
      return newState
    case REMOVE_ERRORS:
      newState = { ...state }
      newState.errors = []
      return newState
    default:
      return state;
  }
}
