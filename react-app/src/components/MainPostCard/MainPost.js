import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { deletePostById } from '../../store/posts'
import EditPostModal from '../EditPostModal/EditPostModal'
import defaultProfile from '../../images/defaultprofilepic.svg'
import { Link, useParams } from 'react-router-dom'
import './mainpost.css'
import ReplyModal from '../ReplyModal/ReplyModal'
import deleteIconSquare from '../../images/deleteiconsquare.svg'

export default function MainPostCard({ postId }) {

    const params = useParams()

    const post = useSelector(state => state.posts.normPosts[postId])
    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    console.log(params, postId)
    console.log(params?.postId == postId)

    return (
        <>
            {
                post &&
                <div className="main-post-container" key={post.id} >
                    <div className='main-post-header'>

                        <div className='main-post-header-icon'>
                            <img className="profile-picture" src={post.user.profilePicture || defaultProfile} alt=""></img>
                        </div>
                        <div className='main-post-header-user'>
                            <div>{post.user.displayName || post.user.username}</div>
                            <div className='main-post-user-timestamp'>
                                <span className='main-post-username'>@{post.user.username}</span>
                            </div>
                        </div>

                    </div>
                    <div className='main-post-profile-icon-container'>

                    </div>
                    <div className='main-post-body-container'>
                        <Link to={params.postId == post.id ? '#' : `/profile/${post.user.username}/post/${post.id}`}>


                            <div className='main-post-content-text'>
                                {post.content}
                            </div>

                            <div className='main-post-images-wrapper' data-post-images={post.images.length} >
                                {post.images.map(img => (
                                    <img className='main-post-image' key={img.id} alt='' src={img.url}></img>
                                ))}
                            </div>
                        </Link>
                        <div className='main-post-buttons-outer-container'>

                            <div className='main-post-buttons-wrapper'>
                                {sessionUser.id === post.user.id &&
                                    <>
                                        <span className='delete-button-span'><button id='delete-post-button' onClick={() => dispatch(deletePostById(post.id))}><img alt='' id='delete-post-icon' src={deleteIconSquare}></img>Delete</button></span>
                                        <EditPostModal post={post} />
                                        <ReplyModal parentId={post.id} numReplies={post.numReplies} />
                                    </>
                                }
                                {sessionUser.id !== post.user.id &&
                                    <>
                                        <ReplyModal parentId={post.id} numReplies={post.numReplies} />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
