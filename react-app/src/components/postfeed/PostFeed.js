import { useDispatch } from 'react-redux'
import { deletePostById } from '../../store/posts'
import EditPostModal from '../EditPostModal/EditPostModal'
import './postfeed.css'

export default function PostFeed({ posts }) {

    const dispatch = useDispatch()

    return (
        <div className="main-posts-wrapper">
            {posts && posts.length > 0 && posts.map(el => (
                <div className="post-container" key={el.id} >
                    <p className='post-content-text'>{el.content}</p>
                    {el.images.length > 0 &&
                        el.images.map(el => (
                            <img alt='' key={el.id} src={el.url}></img>
                        ))}
                    <button onClick={
                        () => {
                            dispatch(deletePostById(el.id))
                        }
                    }>Delete</button>
                    <EditPostModal post={el} />
                </div>
            ))}
        </div>
    )
}
