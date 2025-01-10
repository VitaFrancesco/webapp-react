import Card from "../components/Card"
import UrlContext from "../context/UrlContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function DetailBook() {
    const { moviesUrl } = useContext(UrlContext)
    const [movie, setMovie] = useState({})
    const { id } = useParams()

    useEffect(() => {
        axios.get(`${moviesUrl}/${id}`)
            .then((res) => {
                setMovie(res.data)
            })
    }, [])

    return (
        <>
            <Card movie={movie} />
        </>
    )
}