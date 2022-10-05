import SearchIcon from "./SearchIcon";

export default function SearchBar() {
    return (
        <div id="search-bar">
            <SearchIcon height={'18px'} width={'18px'} />
            <input className="search-input" style={{ color: '#8b98a5' }} placeholder="Search Quacker" />
        </div >
    )
}
