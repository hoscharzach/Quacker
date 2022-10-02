import { Box, Button, IconButton, ImageListItem, Paper, Stack, TextField } from "@mui/material";
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
            <Box
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
            <TextField sx={{ width: '95%', color: 'white' }} label="Name" variant="outlined" />
            <TextField sx={{ width: '95%', color: 'white' }} variant="outlined" />

        </Stack>

    )
}
