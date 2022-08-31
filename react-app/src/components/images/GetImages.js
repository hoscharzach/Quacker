import { useEffect, useState } from "react";


export default function ImageDisplay() {

    const [images, setImages] = useState(null)
    const [loading, setLoading] = useState(false)

    async function getAllImages() {
        setLoading(true)
        const data = await fetch('/api/images')
        const images = await data.json()
        setImages(images.images)
        setLoading(false)
    }

    useEffect(() => {
        getAllImages()
    }, [])

    return (
        <>
            {loading &&
                <p>Loading...</p>}

            {!loading &&
                images &&
                images.map(el => (
                    <img alt="" key={el.id} src={el.url}></img>
                ))}
        </>
    )
}
