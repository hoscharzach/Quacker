import { useSelector } from "react-redux"
import { intlFormatDistance } from 'date-fns'
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './parentcard.css'

export default function ParentCard({ postId }) {

    const post = useSelector(state => state.posts.normPosts[postId])

    const [timestamp, setTimeStamp] = useState('')

    useEffect(() => {
        if (post) {
            const newDate = Date.parse(post.createdAt)
            setTimeStamp(intlFormatDistance(newDate, new Date()))
        }
    }, [post])

    // smaller image container
    // line going from profile pic to below
    // smaller text
    // put replying to text in the main card

    return (
        <>
            {
                post &&
                <Link to={`/profile/${post.user.username}/post/${post.id}`}>
                    <div className="reply-modal-body-container">

                        <div className='reply-modal-parent-left'>
                            <img className='reply-modal-parent-profile-pic' src={post.user.profilePic || defaultProfilePic} alt=""></img>
                            <div className='reply-modal-connecting-line-container'>
                                <div className='reply-modal-connecting-line'></div>
                            </div>
                        </div>
                        <div className='parent-card-right'>
                            <div>
                                {post.user.displayName || post.user.username} <span className='reply-modal-username-timestamp'>@{post.user.username} · <Link to={`/profile/${post.user.username}/post/${post.id}`}>{timestamp}</Link></span>
                            </div>
                            <div className='parent-card-content'>
                                {post.content}
                            </div>
                            <div className='parent-post-images-container' data-post-images={post.images.length} >
                                {post.images.map(img => (
                                    <img className='parent-post-image' key={img.id} alt='' src={img.url}></img>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            }
        </>
    )
}
