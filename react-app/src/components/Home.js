import { useState, useEffect } from "react";
import PostFeed from "./postfeed/PostFeed";

export default function Home() {

    const [loaded, setLoaded] = useState(false)
    const [viewPosts, setViewPosts] = useState([])

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/posts/home');
            const data = await res.json();
            setViewPosts(data.userPosts);
            setLoaded(true);
        })();
    }, []);

    if (!loaded) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div className="center-column">
            <div>
                <p>New Post here</p>
                <button>Create Post</button>
            </div>
            {viewPosts.length > 0 &&
                <PostFeed posts={viewPosts} />}
        </div>
    )
}
