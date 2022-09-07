import { useDispatch, useSelector } from 'react-redux'
import { deletePostById } from '../store/posts'
import EditPostModal from '../components/EditPostModal/EditPostModal'
import defaultProfile from '../images/defaultprofilepic.svg'
import { Link } from 'react-router-dom'
import CreatePostModal from '../components/CreatePostModal'
import './postfeed/postfeed.css'

export default function Cards({ postId }) {

    const post = useSelector(state => state.posts.normPosts[postId])
    const dispatch = useDispatch()

    return (
        <>
            {
                post &&
                <div className="post-container" key={post.id} >
                    <div className='post-profile-icon-container'>
                        <Link to={`/profile/${post.user.username}`}><img src={post.user.profilePicture || defaultProfile} alt=""></img></Link>
                    </div>
                    <div className='post-right-container'>

                        <span className='post-content-text'>
                            {post.content} <strong>Post ID: {post.id}</strong><br></br>
                            <strong>Username: {post.user.username}</strong>
                            <Link to={`/profile/${post.user.username}/post/${post.id}`}>
                                {`${post.createdAt.slice(8, 11)} ${post.createdAt.slice(5, 7)}`}
                            </Link>
                        </span>

                        {post.images.length > 0 &&
                            post.images.map(img => (
                                <div key={img.id} className='post-images-wrapper'>
                                    <img alt='' src={img.url}></img>

                                </div>

                            ))}
                        <button onClick={() => dispatch(deletePostById(post.id))}>Delete</button>
                        <EditPostModal post={post} />
                        <CreatePostModal parentId={post.id} />
                        <div>Number of replies: {post.numReplies}</div>
                    </div>
                </div>
            }
        </>
    )
}
