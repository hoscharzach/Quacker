import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostFeed from "../postfeed/PostFeed";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";
import './home.css'

export default function Home() {

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const posts = useSelector(state => state.posts.allPosts)

    useEffect(() => {
        (async () => {
            await dispatch(getAllPosts());
            setLoaded(true);
        })();
    }, [dispatch]);

    return (
        <>
            <div className="center-column">

                <CreatePost />

                {!loaded &&
                    <div id="loading"></div>}
                {posts &&
                    <PostFeed posts={posts} />}
            </div>
        </>
    )
}
