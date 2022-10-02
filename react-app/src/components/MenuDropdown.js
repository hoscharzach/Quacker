import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import EditPostModal from './EditPostModal/EditPostModal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditPost from './EditPostModal/EditPost';
import DeleteConfirm from './DeleteConfirm/DeleteConfirm.js'
import { useSelector } from 'react-redux';
import { shadows } from '@mui/system';
import { MenuList } from '@mui/material';



export default function BasicMenu({ post }) {
    const sessionUser = useSelector(state => state.session.user)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [editModalOpen, setEditModalOpen] = React.useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteStyle = {
        boxSizing: 'border-box',
        width: '320px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 'auto',
        borderRadius: '15px',
        bgcolor: '#15202b',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const editStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 'auto',
        borderRadius: '15px',
        bgcolor: '#15202b',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };

    const buttonStyle = {
        marginRight: '10px',
    }


    return (
        <>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </Button>
                <Menu
                    sx={{
                        '& .MuiPaper-root': {
                            boxShadow: 'rgb(136 153 166 / 20%) 0px 0px 15px, rgb(136 153 166 / 15%) 0px 0px 3px 1px',
                        },
                        '& .MuiList-root': {
                            padding: 0
                        }
                    }}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {sessionUser.id === post.user.id &&
                        <MenuItem
                            className='mui-menu-item'
                            sx={{
                                color: 'red',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,.03)'
                                }
                            }}
                            onClick={() => {
                                setDeleteModalOpen(true)
                                handleClose()
                            }}
                        >
                            <DeleteForeverIcon style={{ fill: 'red' }} sx={buttonStyle} />
                            Delete
                        </MenuItem>
                    }
                    {sessionUser.id === post.user.id &&
                        <MenuItem
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,.03)'
                                }
                            }}
                            onClick={() => {
                                handleClose()
                                setEditModalOpen(true)
                            }}
                        >
                            <EditIcon sx={buttonStyle} />
                            Edit
                        </MenuItem>
                    }

                    <MenuItem
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,.03)'
                            }
                        }}
                        onClick={() => {
                            handleClose()
                            navigator.clipboard.writeText(`https://quacker-fullstack.herokuapp.com/post/${post.id}`)
                        }}
                    >
                        <ContentPasteIcon sx={buttonStyle} />
                        Copy Link
                    </MenuItem>
                </Menu>
            </div>
            <Modal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={editStyle}>
                    <EditPost post={post} setEditModalOpen={setEditModalOpen} />
                </Box>
            </Modal>
            <Modal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={deleteStyle}>
                    <DeleteConfirm post={post} setDeleteModalOpen={setDeleteModalOpen} />
                </Box>
            </Modal>
        </>
    );
}
