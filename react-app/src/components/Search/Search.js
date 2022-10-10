import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation, useParams, useSearchParams } from "react-router-dom"
import { loadSearchResults, searchThunk } from "../../store/posts"
import Loading from "../Loading"
import ReplyCard from "../ReplyCard/ReplyCard"
import SearchBar from "../RightColumn/SearchBar"
import './search.css'
import UserCard from "./UserCard"

export default function Search() {

    const selectPosts = useSelector(state => state.posts.normPosts)
    const selectUsers = useSelector(state => state.posts.users)

    const useQuery = () => {
        const { search } = useLocation()
        return useMemo(() => new URLSearchParams(search), [search])
    }

    let query = useQuery()
    const dispatch = useDispatch()

    const [type, setType] = useState('users')
    const [usersPage, setUsersPage] = useState(1)
    const [postsPage, setPostsPage] = useState(1)
    const [searchPosts, setSearchPosts] = useState([])
    const [searchUsers, setSearchUsers] = useState([])
    const [moreUsers, setMoreUsers] = useState(false)
    const [morePosts, setMorePosts] = useState(false)
    const [resultsLoading, setResultsLoading] = useState(false)
    const [initialFetchFinished, setInitialFetchFinished] = useState(true)

    useEffect(() => {
        (async () => {
            setSearchPosts([])
            setSearchUsers([])
            setInitialFetchFinished(false)
            const response = await fetch(`/api/search/${query}`)
            if (response.ok) {
                const data = await response.json()
                dispatch(loadSearchResults(data))
                setSearchPosts([...data.posts.map(post => post.id)])
                setSearchUsers([...data.users.map(user => user.username)])
                setMorePosts(data.morePosts)
                setMoreUsers(data.moreUsers)
                setPostsPage(2)
                setUsersPage(2)
                setInitialFetchFinished(true)
                window.scrollTo(0, 0)
            } else {
                setInitialFetchFinished(true)
                window.scrollTo(0, 0)
            }
        })();
    }, [query])

    async function viewMorePosts() {
        setResultsLoading(true)
        const response = await fetch(`/api/search/posts/${query}/${postsPage}`)
        if (response.ok) {
            const data = await response.json()
            dispatch(loadSearchResults(data))
            setSearchPosts(prev => [...prev, ...data.posts.map(post => post.id)])
            setPostsPage(prev => prev + 1)
        } else {
            alert("Something went wrong")
        }
        setResultsLoading(false)
    }

    async function viewMoreUsers() {
        setResultsLoading(true)
        const response = await fetch(`/api/search/users/${query}/${usersPage}`)
        if (response.ok) {
            const data = await response.json()
            dispatch(loadSearchResults(data))
            setSearchUsers(prev => [...prev, ...data.users.map(user => user.username)])
            setUsersPage(prev => prev + 1)
        } else {
            alert("Something went wrong")
        }
        setResultsLoading(false)
    }


    const tabs = [['users', 'Users'], ['posts', 'Posts']]
    const tabStyle = { flexGrow: '1', display: 'flex', justifyContent: 'center', height: '100%', margin: '0 5px' }

    return (
        <div className="center-search-column">
            <div className="search-top-bar">
                <SearchBar />
                <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '53px', padding: '4px 40px', position: 'fixed', top: 50, width: '650px' }}>
                    {tabs.map(tab => (
                        <div key={tab[0]} data-active={type === `${tab[0]}` ? `${tab[0]}` : null} className={`${tab[0]}-profile-button-container`} style={tabStyle}>
                            <button className={`${tab[0]}-profile-button`} key={tab[0]} style={{ width: '100%' }} onClick={(e) => {
                                window.scrollTo(0, 0)
                                setType(`${tab[0]}`)
                            }}>
                                {`${tab[1]}`}
                            </button>
                        </div>
                    ))}

                </div>
            </div>
            <div className="search-results-container">
                {type === 'posts' && selectPosts && searchPosts.map(post => <ReplyCard key={post} reply={selectPosts[post]} />)}
                {type === 'users' && selectUsers && searchUsers.map(username => <UserCard key={selectUsers[username].id} user={selectUsers[username]} />)}
            </div>
            {resultsLoading && <Loading height={'100px'} />}
            {!initialFetchFinished && <Loading />}
            {!resultsLoading && initialFetchFinished && morePosts && type === 'posts' && <button style={{ borderTop: '1px solid rgb(66, 83, 100)', borderBottom: '1px solid rgb(66, 83, 100)' }} className="view-more-button" onClick={() => viewMorePosts()}>View more posts</button>}
            {!resultsLoading && initialFetchFinished && moreUsers && type === 'users' && <button className="view-more-button" onClick={() => viewMoreUsers()}>View more users</button>}
            {type === 'users' && !moreUsers && <div style={{ borderTop: '1px solid rgb(66, 83, 100)' }}></div>}
            {type === 'posts' && !morePosts && <div style={{ borderTop: '1px solid rgb(66, 83, 100)' }}></div>}
        </div>
    )

}
