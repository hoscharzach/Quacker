import { Box, Button, Fab, IconButton, ImageListItem, Paper, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Close from "@mui/icons-material/Close";
import { useState } from "react";

export default function EditProfile({ user, setProfileModalOpen }) {

    const backgroundHover = 'rgba(239,243,244,.1)'

    const [backgroundImage, setBackgroundImage] = useState(user.profileBackground || '')
    const [name, setName] = useState(user.displayName || '')
    const [userBio, setUserBio] = useState(user.bio || '')
    const [profilePhoto, setProfilePhoto] = useState(user.profilePic || '')

    return (
        <Stack
            alignItems="center"
            spacing={1}
            sx={{
                width: '100%'
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
                        onClick={() => setProfileModalOpen(false)}
                    >
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
                            }
                        }}
                    >
                        Save
                    </Button>
                </Box>

            </Box>
            <ImageListItem>
                <img sx={{ width: '100%' }} src={user.profileBackground}></img>
            </ImageListItem>
        </Stack>

    )
}
