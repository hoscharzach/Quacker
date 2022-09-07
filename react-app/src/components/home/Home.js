import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostFeed from "../postfeed/PostFeed";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";
import './home.css'

export default function Home() {

    let posts

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const selectAllPosts = useSelector(state => state.posts.normPosts)


    useEffect(() => {
        (async () => {
            await dispatch(getAllPosts());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (selectAllPosts) {
        posts = Object.values(selectAllPosts).filter(el => !el.inReplyTo).reverse()
    }

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
