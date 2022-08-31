import './postfeed.css'

export default function PostFeed({ posts }) {
    return (
        <div className="main-posts-wrapper">
            {posts && posts.length > 0 && posts.map(el => (
                <div className="post-container" key={el.id} >
                    <p>{el.content}</p>
                    {el.images.length > 0 &&
                        el.images.map(el => (
                            <img src={el.url}></img>
                        ))}
                </div>
            ))}
        </div>
    )
}
