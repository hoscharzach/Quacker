import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../store/posts";
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';

export default function EditProfile({ user, setProfileModalOpen }) {

    const dispatch = useDispatch()


    const sessionUser = useSelector(state => state.session.user)

    const [backgroundImage, setBackgroundImage] = useState(user.profileBackground || '')
    const [name, setName] = useState(user.displayName || '')
    const [bio, setBio] = useState(user.bio || '')
    const [profilePhoto, setProfilePhoto] = useState(user.profilePic || '')
    const [nameErrorText, setNameErrorText] = useState('')
    const [bioErrorText, setBioErrorText] = useState('')
    const [isError, setIsError] = useState(false)

    const formBorderColor = 'rgb(66, 83, 100)'
    const formHighlightColor = 'rgb(29, 155, 240)'
    const errorColor = 'rgb(244, 33, 46)'
    const backgroundHover = 'rgba(239,243,244,.1)'

    const nameInputStyles = {
        '& .MuiInputLabel-root:focused': { color: 'white' },
        '& .MuiInputLabel-root': { color: `${formBorderColor}` },
        '& .MuiInputLabel-root.Mui-disabled': { color: `${formBorderColor}` },
        '& .MuiInputLabel-root:disabled': { color: `${formBorderColor}` },
        '& label.Mui-focused': { color: 'white' },
        '& .MuiOutlinedInput-root': {
            color: 'white',
            '&:hover fieldset': {
                borderColor: nameErrorText ? `${errorColor}` : `${formHighlightColor}`,
            },
            '& fieldset': {
                borderColor: nameErrorText ? `${errorColor}` : `${formBorderColor}`,
            },
            '& fieldset:hover': { borderColor: nameErrorText ? `${errorColor}` : `${formBorderColor}`, },
        },

    }

    const bioInputStyles = {
        '& .MuiInputLabel-root:focused': { color: 'white' },
        '& .MuiInputLabel-root': { color: `${formBorderColor}` },
        '& label.Mui-focused': {
            color: 'white',
        },
        border: 'white',

        '& .MuiOutlinedInput-root': {
            color: 'white',
            '&:hover fieldset': {
                borderColor: bioErrorText ? `${errorColor}` : `${formHighlightColor}`,
            },
            '& fieldset': {
                borderColor: bioErrorText ? `${errorColor}` : `${formBorderColor}`,
            },
            '& fieldset:hover': {
                borderColor: bioErrorText ? `${errorColor}` : `${formBorderColor}`,
            },
        },
    }

    async function handleSubmit() {
        const payload = {
            username: user.username,
            displayName: name,
            bio
        }

        const errors = await dispatch(updateUserInfo(payload))
        if (!errors) {
            setProfileModalOpen(false)
        } else {
            window.alert("Something went wrong, please try again")
        }

    }


    useEffect(() => {
        if (name.length === 0) {
            setNameErrorText("Display name can't be blank")
        } else {
            setNameErrorText('')
        }
    }, [name])

    useEffect(() => {
        if (bio.length > 250) {
            setBioErrorText('Bio must be less than 250 characters')
        } else {
            setBioErrorText('')
        }
    }, [bio])

    useEffect(() => {
        bioErrorText || nameErrorText ? setIsError(true) : setIsError(false)
    }, [nameErrorText, bioErrorText])

    return (
        <Stack
            alignItems="center"
            spacing={1}
            sx={{
                width: '100%',
                paddingBottom: '30px'
            }}

        >
            <Box
                display="flex"
                alignItems="center"
                height="52px"
                width="97%"
            >
                <Box
                    width="56px">
                    <IconButton
                        sx={{
                            transition: 'background-color .5s',
                            '&:hover': {
                                backgroundColor: `${backgroundHover}`
                            }
                        }}
                        onClick={() => setProfileModalOpen(false)}>
                        <Close sx={{
                            width: '20px',
                            height: '20px'
                        }} />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        flexGrow: '3'
                    }}
                >
                    <span style={{ fontWeight: 700, fontSize: '20px' }}>Edit Profile</span>
                </Box>
                <Box>
                    <button
                        id="edit-profile-submit-button"
                        onClick={handleSubmit}
                        disabled={isError}>
                        Save
                    </button>
                </Box>

            </Box>
            <Box
                m={2}
                sx={{
                    width: '596px',
                    height: '193px',
                    backgroundPosition: 'center center',
                    backgroundImage: `url(${user.profileBackground})`
                }}>

            </Box>
            <Box
                height="84px"
                width="100%">
                <Box
                    height="112px"
                    width="112px"
                    borderRadius="50%"
                    position="relative">
                    <img style={{ border: "4px solid #15202b", width: '100%', height: '100%', borderRadius: '50%', position: 'absolute', top: -70, left: 15 }} alt="" src={user.profilePic || ''} ></img>
                </Box>

            </Box>
            <Box

                component="form"
                sx={{
                    color: 'white',
                    borderRadius: '5px',
                    '& > :not(style)': { m: 2, width: '95%' }
                }}
                autoComplete="off"
                noValidate>

                <TextField
                    error={Boolean(nameErrorText)}
                    helperText={nameErrorText}
                    value={name}
                    label="Display Name"
                    variant="outlined"
                    inputProps={{ maxLength: 20 }}
                    sx={nameInputStyles}
                    onChange={(e) => setName(e.target.value)} />
                <TextField
                    value={bio}
                    error={Boolean(bioErrorText)}
                    helperText={bioErrorText}
                    sx={bioInputStyles}
                    multiline
                    minRows={2}
                    maxRows={4}
                    label="Bio"
                    onChange={(e) => setBio(e.target.value)}
                    variant="outlined" />
            </Box>

        </Stack>

    )
}
