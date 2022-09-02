import { useState, useEffect } from "react";
import CreatePost from "./postfeed/CreatePost";
import PostFeed from "./postfeed/PostFeed";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../store/posts";

export default function Home() {

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const posts = useSelector(state => state.posts.allPosts)

    useEffect(() => {
        (async () => {
            await dispatch(getAllPosts());
            setLoaded(true);
        })();
    }, []);

    if (!loaded) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <>
            <div className="center-column">

                <CreatePost />

                {posts &&
                    <PostFeed posts={posts} />}
            </div>
        </>
    )
}
