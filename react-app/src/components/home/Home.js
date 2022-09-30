import { useState, useEffect, useReducer } from "react";
import CreatePost from "./CreatePost";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getNewPosts, getOldPosts } from "../../store/posts";
import './home.css'
import ReplyCard from "../ReplyCard/ReplyCard";

export default function Home() {

    // add small div to bottom of page, when its in view SPAWN IN LOADING DIV to get small div out of view,
    // then fetch posts

    const containerToWatch = useRef(null)
    const dispatch = useDispatch()
    const feed = useSelector(state => state.posts.feed)
    const fetched = useSelector(state => state.posts.fetched)
    const latestPost = useSelector(state => state.posts.latestPost)
    const page = useSelector(state => state.posts.page)

    const [loaded, setLoaded] = useState(false)
    const [newLoaded, setNewLoaded] = useState(true)
    const [oldLoaded, setOldLoaded] = useState(true)


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    async function observerCallback(entries) {
        const [entry] = entries

        if (entry.isIntersecting) {
            console.log("I'm intersecting")
            setOldLoaded(false)
            await dispatch(getOldPosts(page + 1))
            setOldLoaded(true)
        }
    }
    const options = {
        root: null,
        rootMargin: "0px",
        threshhold: 1
    }

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, options)
        if (containerToWatch.current) observer.observe(containerToWatch.current)

    }, [containerToWatch, options])

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
                    // borderTop: '1px solid rgb(66, 83, 100)',
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
                    <div className="feed-container">
                        {feed.map((el) => (
                            <ReplyCard name={`reply${el.id}`} key={el.id} reply={el} />
                        ))}
                    </div>
                }{
                    loaded &&
                    <>
                        <div>
                            <button onClick={() => {
                                setOldLoaded(false)
                                dispatch(getOldPosts(page + 1))
                                setOldLoaded(true)
                            }}>Click for older posts</button>
                        </div>
                        <div id="bottom-feed-box" ref={containerToWatch} style={{ height: '600px' }}>
                            {!oldLoaded &&
                                <div style={{ width: '650px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    <div id="loading"></div>
                                </div>}
                        </div>

                    </>
                }
            </div>
        </>
    )
}
