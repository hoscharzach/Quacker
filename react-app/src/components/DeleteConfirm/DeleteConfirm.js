import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import { deletePostById } from '../../store/posts';
import './deleteconfirm.css'


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
                <button id="confirm-delete" onClick={handleDelete}>Delete</button>
                <button id="cancel-delete-button" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
            </Stack>
        </Box >
    )

}
