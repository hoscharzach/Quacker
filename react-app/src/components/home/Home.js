import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";
import './home.css'
import ReplyCard from "../ReplyCard/ReplyCard";

export default function Home() {

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const feed = useSelector(state => state.posts.feed)

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
                        < ReplyCard key={el.id} replyId={el.id} />
                    ))}
            </div>
        </>
    )
}
