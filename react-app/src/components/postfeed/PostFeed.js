import { useDispatch } from 'react-redux'
import { deletePostById } from '../../store/posts'
import EditPostModal from '../EditPostModal/EditPostModal'
import './postfeed.css'
import removeImage from '../../images/imageclose-x.svg'
import defaultProfile from '../../images/defaultprofilepic.svg'
import { Link } from 'react-router-dom'
import CreatePostModal from '../CreatePostModal'

export default function PostFeed({ posts }) {

    const dispatch = useDispatch()

    return (
        <div className="main-posts-wrapper">
            {posts && posts.map(el => (
                <div className="post-container" key={el.id} >
                    <div className='post-profile-icon-container'>
                        <Link to={`/profile/${el.user.username}`}><img src={el.user.profilePicture || defaultProfile} alt=""></img></Link>
                    </div>
                    <div className='post-right-container'>

                        <span className='post-content-text'>
                            {el.content} <strong>Post ID: {el.id}</strong><br></br>
                            <strong>Username: {el.user.username}</strong>
                            <Link to={`/profile/${el.user.username}/post/${el.id}`}>
                                {`${el.createdAt.slice(8, 11)} ${el.createdAt.slice(5, 7)}`}
                            </Link>
                        </span>

                        {el.images.length > 0 &&
                            el.images.map(el => (
                                <div key={el.id} className='post-images-wrapper'>
                                    <img alt='' src={el.url}></img>

                                </div>

                            ))}
                        <button onClick={() => dispatch(deletePostById(el.id))}>Delete</button>
                        <EditPostModal post={el} />
                        <CreatePostModal parentId={el.id} />
                        <div>Number of replies: {el.numReplies}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
