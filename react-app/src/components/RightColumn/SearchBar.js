import { useEffect, useRef, useState } from "react";
import SearchIcon from "./SearchIcon";

export default function SearchBar() {

    const searchBar = useRef(null)
    const [search, setSearch] = useState('')
    const [showMenu, setShowMenu] = useState(false)

    function handleSearch(e) {
        if (e.key === 'Enter') {
            console.log(search)
            console.log(searchBar.current.value)
            setShowMenu(true)
        }
    }



    useEffect(() => {
        console.log(searchBar.current)
    }, [searchBar])
    return (
        <div id="search-bar">
            <SearchIcon height={'18px'} width={'18px'} />
            <input ref={searchBar} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch} value={search} className="search-input" style={{ color: '#8b98a5' }} placeholder="Search Quacker" />
            {showMenu &&
                <div className="search-dropdown" style={{ position: 'absolute', top: 48, left: 0, height: '600px', width: '370px', backgroundColor: 'rgba(21,32,43,1.00)' }}></div>}
        </div >
    )
}
