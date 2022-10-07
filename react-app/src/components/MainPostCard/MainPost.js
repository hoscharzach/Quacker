import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { likePostToggle } from '../../store/posts'
import defaultProfile from '../../images/defaultprofilepic.svg'
import { Link, useHistory, useParams } from 'react-router-dom'
import './mainpost.css'
import ReplyModal from '../ReplyModal/ReplyModal'
import { format } from 'date-fns'
import BasicMenu from '../MenuDropdown'
import LikeButton from '../LikeButton'
import { IconButton } from '@mui/material'
import LikeButtonFilled from '../LikeButtonFilled'

export default function MainPostCard({ postId }) {

    const params = useParams()
    const history = useHistory()

    const likeButtonStyles = {
        '&:hover': {
            backgroundColor: 'rgb(249, 24, 128, .1)',
        },
        '&:hover *': {
            fill: 'rgb(249, 24, 128)',
        },
    }

    const post = useSelector(state => state.posts.normPosts[postId])
    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    const [postLiked, setPostLiked] = useState(post?.userLikes?.includes(sessionUser.id))

    async function handleLike() {
        postLiked ? setPostLiked(false) : setPostLiked(true)
        await dispatch(likePostToggle(postId))
    }

    return (
        <>
            {
                post &&
                <div className="main-post-container" key={post.id} >
                    <div className='main-post-header'>

                        <div className='main-post-header-icon'>
                            <Link to={`/profile/${post.user.username}`}>
                                <img className="profile-picture" src={post.user.profilePic || defaultProfile} alt=""></img>
                            </Link>
                        </div>
                        <div className='main-post-header-user'>
                            <div>
                                <Link to={`/profile/${post.user.username}`}>
                                    <span className='underline-white'>{post.user.displayName || post.user.username}</span>
                                </Link>
                            </div>
                            <div className='main-post-user-timestamp'>
                                <span className='main-post-username'>@{post.user.username}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>

                            <BasicMenu post={post} />
                        </div>


                    </div>
                    <div className='main-post-body-container'>

                        <div className='main-post-content-text'>
                            {post.content}
                        </div>

                        <div className='main-post-images-wrapper' data-post-images={post.images.length} >
                            {post.images.map(img => (
                                <img className='main-post-image' key={img.id} alt='' src={img.url}></img>
                            ))}
                        </div>

                        {/* 6:38 PM * Sep 8, 2022 Quacker Web App */}
                        <div className='main-post-timestamp'><span className='main-post-timestamp-text'>{format(Date.parse(post.createdAt), 'PPP')} · {format(Date.parse(post.createdAt), 'p')} · Quacker Web App </span></div>
                        <div className='main-post-buttons-outer-container'>
                            <div className='main-post-stats'>
                                <span className='stats-num'>{post.numLikes} </span>
                                <span className='underline-dim'>Likes</span>
                            </div>
                        </div>
                        <div className='main-post-buttons-wrapper'>
                            <ReplyModal parentId={post.id} numReplies={post.numReplies} />
                            {sessionUser &&
                                postLiked ?
                                <IconButton sx={likeButtonStyles} onClick={handleLike}>
                                    <LikeButtonFilled width={'22.25'} height={'22.25'} />
                                </IconButton> :
                                <IconButton sx={likeButtonStyles} onClick={handleLike}>
                                    <LikeButton height={'22.25'} width={'22.25'} />
                                </IconButton>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
