import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

export default function EditProfile({ user, setProfileModalOpen }) {

    const backgroundHover = 'rgba(239,243,244,.1)'

    const [backgroundImage, setBackgroundImage] = useState(user.profileBackground || '')
    const [name, setName] = useState(user.displayName || '')
    const [bio, setBio] = useState(user.bio || '')
    const [profilePhoto, setProfilePhoto] = useState(user.profilePic || '')
    const [nameErrorText, setNameErrorText] = useState('')
    const [bioErrorText, setBioErrorText] = useState('')

    const formBorderColor = 'rgb(66, 83, 100)'
    const formHighlightColor = 'rgb(29, 155, 240)'
    const errorColor = 'rgb(244, 33, 46)'

    const nameInputStyles = {
        '& .MuiInputLabel-root:focused': { color: 'white' },
        '& .MuiInputLabel-root': { color: `${formBorderColor}` },
        '& label.Mui-focused': {
            color: 'white',
        },
        border: 'white',

        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: nameErrorText ? `${errorColor}` : `${formHighlightColor}`,
            },
            color: 'white',
            '& fieldset': {
                borderColor: nameErrorText ? `${errorColor}` : `${formBorderColor}`,
            },
            '& fieldset:hover': {
                borderColor: nameErrorText ? `${errorColor}` : `${formBorderColor}`,
            },
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

    function handleSubmit() {
    }


    useEffect(() => {
        if (name.length === 0) {
            setNameErrorText('Display name is required')
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
                    <Button
                        onClick={handleSubmit}
                        disabled={nameErrorText || bioErrorText}
                        sx={{
                            backgroundColor: 'rgb(239,243,244)',
                            color: 'black',
                            width: '65px',
                            height: '32px',
                            borderRadius: '999px',
                            textTransform: 'none',
                            fontFamily: 'chirp',
                            fontWeight: '700',
                            fontSize: '14px',
                            transition: 'background-color .5s',
                            '&:hover': {
                                backgroundColor: 'rgb(215,219,220)'
                            },
                            '&:disabled': {
                                opacity: .5
                            }
                        }}
                    >
                        Save
                    </Button>
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
                    error={nameErrorText}
                    helperText={nameErrorText}
                    value={name}
                    label="Display Name"
                    variant="outlined"
                    maxlength="25"
                    sx={nameInputStyles}
                    onChange={(e) => setName(e.target.value)} />
                <TextField
                    value={bio}
                    error={bioErrorText}
                    helperText={bioErrorText}
                    sx={bioInputStyles}
                    multiline
                    maxRows={4}
                    label="Bio"
                    onChange={(e) => setBio(e.target.value)}
                    variant="outlined" />
            </Box>

        </Stack>

    )
}
