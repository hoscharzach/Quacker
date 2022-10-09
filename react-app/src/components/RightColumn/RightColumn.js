import './rightcolumn.css'
import SearchBar from './SearchBar'

export default function RightColumn({ variant }) {
    console.log(variant)
    switch (variant) {
        case 'NO_SEARCH':
            return (
                <div className='right-column'></div>
            )
        case 'WITH_SEARCH':
            return (
                <div className="right-column">
                    <SearchBar />
                </div>
            )
        default:
            return null
    }
}
