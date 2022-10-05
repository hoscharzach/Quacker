import { ClickAwayListener } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "./SearchIcon";
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import { Link } from "react-router-dom";

export default function SearchBar() {

    const users = Object.values(useSelector(state => state.posts.users))

    const searchBar = useRef(null)
    const [search, setSearch] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [results, setResults] = useState([])

    async function handleSearch(e) {
        if (e.key === 'Enter') {
            const results = await fetch('/api/')
            setShowMenu(true)
        }
    }

    useEffect(() => {
    }, [searchBar])
    return (
        <div onClick={() => setShowMenu(true)} ref={searchBar} id="search-bar">
            <SearchIcon height={'18px'} width={'18px'} />
            <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch} value={search} className="search-input" style={{ color: '#8b98a5' }} placeholder="Search Quacker" />
            {showMenu &&
                <ClickAwayListener onClickAway={() => setShowMenu(false)}>

                    <div className="search-dropdown" style={{ position: 'absolute', top: 48, left: 0, height: 'auto', width: '370px', backgroundColor: 'rgba(21,32,43,1.00)' }}>
                        {users && users.map(user => (
                            <Link key={user.id} to={`/profile/${user.username}`}>
                                <div className="search-item" key={user.id}>
                                    <div>
                                        <img className="search-profile-pic" src={user.profilePic || defaultProfilePic}></img>
                                    </div>
                                    <div>
                                        <div className="search-profile-name">{user.displayName}</div>
                                        <div className="search-profile-username">@{user.username}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </ClickAwayListener>
            }
        </div >
    )
}
