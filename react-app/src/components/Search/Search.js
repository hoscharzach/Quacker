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

    return (
        <div className="center-column">
            <div className="search-top-bar"><SearchBar /></div>

            <div style={{ borderRight: '1px solid rgb(56, 68, 77)', borderLeft: '1px solid rgb(56, 68, 77)', boxSizing: 'border-box', height: 'auto', width: '650px', position: 'absolute', top: 50 }}>

                <h1 style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Users</h1>
                <div>

                    {selectSearchUsers && selectPosts && selectSearchUsers.map(username => <UserCard key={users[username].id} user={users[username]} />)}
                </div>
                <h1 style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Posts</h1>
                <div>
                    {selectSearchPosts && selectPosts && selectSearchPosts.map(post => <ReplyCard key={post} reply={selectPosts[post]} />)}
                </div>
            </div>
        </div>
    )

}
