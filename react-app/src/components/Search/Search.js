import { useState } from "react"
import { useHistory } from "react-router-dom"
import SearchBar from "../RightColumn/SearchBar"

export default function Search() {

    const history = useHistory()
    console.log(history.search)
    return (
        <SearchBar />
    )

}
