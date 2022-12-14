import { nanoid } from 'nanoid'

function isImgUrl(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
        img.onerror = () => resolve(false);
        img.onload = () => resolve(true);
    });
}

const CLEAR_IMAGES = 'session/CLEAR_IMAGES'
const ADD_IMAGE = 'session/ADD_IMAGE'
const REMOVE_IMAGE = 'session/REMOVE_IMAGE'

const addImage = (data) => ({
    type: ADD_IMAGE,
    data
})

export const removeImage = (id) => ({
    type: REMOVE_IMAGE,
    id
})

export const clearImages = () => ({
    type: CLEAR_IMAGES
})

const initialState = { staging: {} }

export const uploadImage = (image) => async (dispatch) => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch('/api/images', {
        method: "POST",
        body: formData,
    });
    if (res.ok) {
        const data = await res.json();
        const validImg = await isImgUrl(data.url)
        if (validImg) {
            data.id = nanoid()
            dispatch(addImage(data))
        } else {
            return 'Invalid Image'
        }
    }
    else {
        const errors = await res.json()
        return errors.errors
    }
}

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case ADD_IMAGE:
            newState = JSON.parse(JSON.stringify(state))
            newState.staging[action.data.id] = action.data
            return newState
        case CLEAR_IMAGES:
            return { staging: {} }
        case REMOVE_IMAGE:
            newState = JSON.parse(JSON.stringify(state))
            delete newState.staging[action.id]
            return newState
        default:
            return state;
    }
}
