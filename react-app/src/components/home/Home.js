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

    async function getPosts() {
        dispatch(getAllPosts())
            .then(a => setLoaded(true))
    }
    useEffect(() => {
        getPosts()
    }, [dispatch]);

    useEffect(() => {
        const topReply = document.getElementsByClassName("reply8")[0]
        if (topReply) {
            topReply.scrollIntoView({ behavior: 'smooth' })
            // window.scrollTo({ top: (topReply.scrollHeight + 200), behavior: 'smooth' })
        }
    }, [loaded])

    return (
        <>
            <div className="center-column">
                <div className="home-top-bar" onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    // dispatch(getNewPosts())
                }} style={{
                    zIndex: '998',
                    opacity: '.9',
                    position: 'sticky',
                    top: '0',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '15px',
                    boxSizing: 'border-box',
                    width: '650px',
                    height: '50px',
                    borderTop: '1px solid rgb(66, 83, 100)',
                    borderBottom: '1px solid rgb(66, 83, 100)'
                }}>
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
                    <div className="">
                        {feed.map((el, i) => (
                            <ReplyCard name={`reply${i}`} key={el.id} reply={el} />
                        ))}
                    </div>
                }
            </div>
        </>
    )
}
