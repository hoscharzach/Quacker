import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation, useParams, useSearchParams } from "react-router-dom"
import { searchThunk } from "../../store/posts"
import ReplyCard from "../ReplyCard/ReplyCard"
import SearchBar from "../RightColumn/SearchBar"
import './search.css'
import UserCard from "./UserCard"

export default function Search() {

    const useQuery = () => {
        const { search } = useLocation()
        return useMemo(() => new URLSearchParams(search), [search])
    }
    let query = useQuery()
    const dispatch = useDispatch()

    const [type, setType] = useState('users')

    const selectPosts = useSelector(state => state.posts.normPosts)
    const users = useSelector(state => state.posts.users)
    const searchUsersPage = useSelector(state => state.posts.searchUsersPage)
    const searchPostsPage = useSelector(state => state.posts.searchPostsPage)
    const selectSearchUsers = useSelector(state => state.posts.searchUsers)
    const selectSearchPosts = useSelector(state => state.posts.searchPosts)

    useEffect(() => {
        (async () => {
            await dispatch(searchThunk(query))
        })();
    }, [query])

    const tabs = [['users', 'Users'], ['posts', 'Posts']]
    const tabStyle = { flexGrow: '1', display: 'flex', justifyContent: 'center', height: '100%', margin: '0 5px' }

    return (
        <div className="center-search-column">
            <div className="search-top-bar">
                <SearchBar />
                <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '53px', padding: '4px 40px', position: 'fixed', top: 50, width: '650px' }}>
                    {tabs.map(tab => (
                        <div key={tab[0]} data-active={type === `${tab[0]}` ? `${tab[0]}` : null} className={`${tab[0]}-profile-button-container`} style={tabStyle}>
                            <button className={`${tab[0]}-profile-button`} key={tab[0]} style={{ width: '100%' }} onClick={(e) => setType(`${tab[0]}`)} >{`${tab[1]}`}</button>
                        </div>
                    ))}

                </div>
            </div>
            <div>
                {type === 'posts' && selectSearchPosts && selectPosts && selectSearchPosts.map(post => <ReplyCard key={post} reply={selectPosts[post]} />)}
                {type === 'users' && selectSearchUsers && selectPosts && selectSearchUsers.map(username => <UserCard key={users[username].id} user={users[username]} />)}
            </div>
        </div>
    )

}
