import { Button, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { deletePostById } from '../../store/posts';


export default function DeleteConfirm({ post, setDeleteModalOpen }) {

    const dispatch = useDispatch()

    async function handleDelete() {
        const data = await dispatch(deletePostById(post.id))
        if (data) window.alert(data)

    }

    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                width: '320px',
            }}
        >

            <Stack
                spacing={2}
            >
                <Typography
                    sx={{
                        fontFamily: 'chirp',
                        fontWeight: 400
                    }}>
                    Delete Quack?
                </Typography>
                <Typography
                    sx={{
                        typography: 'body2',
                        width: '256px',
                        overflowWrap: 'break-word',
                        color: '#8B98A5',
                        fontFamily: 'chirp'
                    }}>
                    This can't be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results.</Typography>
                <Button sx={{
                    backgroundColor: 'rgb(244, 33, 46)',
                    transition: 'background-color .2s',
                    borderRadius: '999px',
                    width: '256px',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'rgb(220, 40, 31)'
                    }
                }} variant="contained" onClick={handleDelete}>Delete</Button>
                <Button sx={{
                    width: '256px',
                    backgroundColor: '#15202B',
                    borderRadius: '999px',
                    border: 1,
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'rgba(239, 243, 244, .1)'
                    }
                }} variant="outlined" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            </Stack>
        </Box>
    )

}
