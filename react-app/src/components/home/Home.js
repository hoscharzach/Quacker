import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getNewPosts } from "../../store/posts";
import './home.css'
import ReplyCard from "../ReplyCard/ReplyCard";

export default function Home() {

    const dispatch = useDispatch()
    const feed = useSelector(state => state.posts.feed)
    const fetched = useSelector(state => state.posts.fetched)
    const latestPost = useSelector(state => state.posts.latestPost)

    const [loaded, setLoaded] = useState(false)
    const [newLoaded, setNewLoaded] = useState(true)
    const [oldLoaded, setOldLoaded] = useState(true)


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        (async () => {

            // if feed hasn't been fetched for the first time or if it's empty, get all feed posts
            if (!fetched) {
                await dispatch(getAllPosts());
                // set loaded to true
                setLoaded(true);
            } else {
                // otherwise set loaded to true and just add new posts to the top
                setLoaded(true)
                setNewLoaded(false)
                await dispatch(getNewPosts(latestPost))
                setNewLoaded(true)
            }
        })();
    }, [dispatch]);


    // useEffect(() => {
    //     const topReply = document.getElementsByClassName("reply8")[0]
    //     if (topReply) {
    //         topReply.scrollIntoView({ behavior: 'smooth' })
    //
    //     }
    // }, [loaded])

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
                    // borderBottom: '1px solid rgb(66, 83, 100)'
                }}>
                    <div>
                        Home
                    </div>

                </div>
                <CreatePost />
                {!newLoaded &&
                    <div style={{ width: '650px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <div id="loading"></div>
                    </div>}
                {!loaded &&
                    <div style={{ width: '650px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <div id="loading"></div>
                    </div>}
                {loaded && feed &&
                    <div className="">
                        {feed.map((el) => (
                            <ReplyCard name={`reply${el.id}`} key={el.id} reply={el} />
                        ))}
                    </div>
                }
                <div style={{ height: '600px' }}>
                    {!oldLoaded &&
                        <div style={{ width: '650px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <div id="loading"></div>
                        </div>}
                </div>
            </div>
        </>
    )
}
