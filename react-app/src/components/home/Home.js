import { useState, useEffect, useReducer } from "react";
import CreatePost from "./CreatePost";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getNewPosts, getOldPosts, loadOldPosts, loadPosts } from "../../store/posts";
import './home.css'
import ReplyCard from "../ReplyCard/ReplyCard";
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from "../Loading";

export default function Home() {

    const dispatch = useDispatch()
    const feed = useSelector(state => state.posts.feed)
    const fetched = useSelector(state => state.posts.fetched)
    const page = useSelector(state => state.posts.page)
    const latestPost = useSelector(state => state.posts.latestPost)

    // const [page, setPage] = useState(1)
    const [loaded, setLoaded] = useState(false)
    const [newLoaded, setNewLoaded] = useState(true)
    // const [feed, setFeed] = useState([])

    useEffect(() => {
        scrollTop()
    }, [])

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        getFeed()
    }, [])

    async function getFeed() {
        if (!fetched) {
            await dispatch(getAllPosts())
            setLoaded(true)
        } else {
            setLoaded(true)
            setNewLoaded(false)
            await dispatch(getNewPosts(latestPost))
            setNewLoaded(true)
        }
    }

    async function getMorePosts() {
        await dispatch(getOldPosts(page + 1))
    }

    const endMessage = (
        <div>Hello, I put the cap on infinite scroll to 10 pages just in case a bug caused too many renders. You've reached the end!</div>
    )

    return (
        <>
            <div className="center-column" style={!loaded ? { height: '110vh' } : null}>
                <div
                    className="home-top-bar"
                    onClick={scrollTop}
                >
                    <div>Home</div>
                </div>
                <CreatePost />
                {loaded &&
                    <InfiniteScroll
                        dataLength={feed.length}
                        next={getMorePosts}
                        hasMore={page <= 10}
                        loader={<Loading />}
                        endMessage={endMessage}
                    >
                        {feed.map((el) => (
                            <ReplyCard name={`reply${el.id}`} key={el.id} reply={el} />
                        ))}
                    </InfiniteScroll>
                }
                {!newLoaded &&
                    <Loading />}
                {!loaded &&
                    <Loading />}

            </div>
        </>
    )
}
