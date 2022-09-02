import { useDispatch } from 'react-redux'
import { deletePostById } from '../../store/posts'
import EditPostModal from '../EditPostModal/EditPostModal'
import './postfeed.css'
import closeImage from '../../images/imageclose-x.svg'
import defaultProfile from '../../images/defaultprofilepic.svg'
import { Link } from 'react-router-dom'

export default function PostFeed({ posts }) {

    let className

    const dispatch = useDispatch()

    return (
        <div className="main-posts-wrapper">
            {posts && posts.length > 0 && posts.map(el => (
                <div className="post-container" key={el.id} >
                    <div className='post-profile-icon-container'>
                        <Link to={`/profile/${el.user.username}`}><img src={el.user.profilePicture || defaultProfile} alt=""></img></Link>
                    </div>
                    <div className='post-right-container'>

                        <span className='post-content-text'>
                            {el.content}
                            <Link to={`/profile/${el.user.username}/post/${el.id}`}>
                                {`${el.createdAt.slice(8, 11)} ${el.createdAt.slice(5, 7)}`}
                            </Link>
                        </span>

                        {el.images.length > 0 &&
                            el.images.map(el => (
                                <div className='post-images-wrapper'>
                                    <img alt='' key={el.id} src={el.url}></img>

                                </div>

                            ))}
                        <button onClick={
                            () => {
                                dispatch(deletePostById(el.id))
                            }
                        }>Delete</button>
                        <EditPostModal post={el} />
                    </div>
                </div>
            ))}
        </div>
    )
}
