import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostFeed from "../postfeed/PostFeed";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";
import './home.css'

export default function Home() {

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const [posts, setPosts] = useState(null)
    const selectAllPosts = useSelector(state => state.posts.normPosts)

    console.log("RERENDERING HOME COMPONENT", selectAllPosts)

    useEffect(() => {
        (async () => {
            await dispatch(getAllPosts());
            setLoaded(true);
        })();
    }, [dispatch]);

    useEffect(() => {
        setPosts(Object.values(selectAllPosts).filter(el => !el.inReplyTo).reverse())
    }, [loaded])

    console.log(posts, "POSTS IN HOME COMPONENT")
    return (
        <>
            <div className="center-column">

                <CreatePost />

                {!loaded &&
                    <div id="loading"></div>}
                {loaded && posts &&
                    <PostFeed posts={posts} />}
            </div>
        </>
    )
}
