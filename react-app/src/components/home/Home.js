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
                <div className="home-top-bar" onClick={() => window.scrollTo(0, 0)} style={{ zIndex: '2', opacity: '.9', position: 'sticky', top: '0', display: 'flex', alignItems: 'center', paddingLeft: '15px', boxSizing: 'border-box', width: '650px', height: '50px', borderTop: '1px solid white', borderBottom: '1px solid white' }}>
                    <div>
                        Home
                    </div>
                    <div>

                    </div>
                </div>
                <CreatePost />

                {!loaded &&
                    <div id="loading"></div>}
                {loaded && feed &&
                    feed.map(el => (
                        <ReplyCard key={el.id} replyId={el.id} />
                    ))}
            </div>
        </>
    )
}
