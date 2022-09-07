import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostFeed from "../postfeed/PostFeed";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";
import './home.css'
import Cards from "../Cards";

export default function Home() {

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const feed = useSelector(state => state.posts.feed)
    const sessionUser = useSelector(state => state.session.user)


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
                {loaded && feed &&
                    feed.map(el => (
                        <Cards key={el.id} postId={el.id} />
                    ))}
            </div>
        </>
    )
}
