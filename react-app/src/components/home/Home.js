import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, getOldPosts } from "../../store/posts";
import './home.css'
import ReplyCard from "../ReplyCard/ReplyCard";
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from "../Loading";

export default function Home() {

    const dispatch = useDispatch()

    const feed = useSelector(state => state.posts.feed)
    const fetched = useSelector(state => state.posts.fetched)
    const page = useSelector(state => state.posts.page)
    const selectPosts = useSelector(state => state.posts.normPosts)

    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        scrollTop()
    }, [])

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        getHomePage()
    }, [])

    async function getHomePage() {
        if (!fetched) {
            await dispatch(getFeed())
        }
        setLoaded(true)
    }

    async function getMorePosts() {
        await dispatch(getOldPosts(page + 1))
    }

    const endMessage = (
        <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Hello, I put the cap on infinite scroll to 10 pages just in case a bug caused too many renders. You've reached the end!</div>
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
                {!loaded ? <Loading /> :
                    <InfiniteScroll
                        dataLength={feed.length}
                        next={getMorePosts}
                        hasMore={page <= 10}
                        loader={<Loading />}
                        endMessage={endMessage}>
                        {feed.map((el) => (
                            <ReplyCard name={`reply${el}`} key={el} reply={selectPosts[el]} />
                        ))}
                    </InfiniteScroll>
                }

            </div>
        </>
    )
}
