import { useDispatch, useSelector } from 'react-redux'
import { deletePostById } from '../store/posts'
import EditPostModal from '../components/EditPostModal/EditPostModal'
import defaultProfile from '../images/defaultprofilepic.svg'
import { Link } from 'react-router-dom'
import CreatePostModal from '../components/CreatePostModal'
import './cards.css'

export default function Cards({ postId }) {

    const post = useSelector(state => state.posts.normPosts[postId])
    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    return (
        <>
            {
                post &&
                <div className='post-container-border'>
                    <div className="post-container" key={post.id} >
                        <div className='post-profile-icon-container'>
                            <Link to={`/profile/${post.user.username}`}><img className="profile-picture" src={post.user.profilePicture || defaultProfile} alt=""></img></Link>
                        </div>
                        <div className='post-right-container'>

                            <div className='post-user-timestamp'>
                                {post.user.displayname || post.user.username} @{post.user.username} · <Link to={`/profile/${post.user.username}/post/${post.id}`}>timestamp and id: {post.id}</Link>
                            </div>

                            <div className='post-content-text'>
                                {post.content}
                            </div>

                            <div className='post-images-wrapper'>
                                {post.images.length > 0 &&
                                    post.images.map(img => (
                                        <div key={img.id} className='post-image'>
                                            <img alt='' src={img.url}  ></img>
                                        </div>

                                    ))}
                            </div>
                            {sessionUser.id === post.user.id &&
                                <>
                                    <button onClick={() => dispatch(deletePostById(post.id))}>Delete</button>
                                    <EditPostModal post={post} />
                                </>
                            }
                            <CreatePostModal location={'card'} parentId={post.id} />
                            <div>Number of replies: {post.numReplies}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
