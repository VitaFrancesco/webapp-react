import axios from "axios"
import { useEffect, useState, useContext } from "react"
import Card from "../components/Card"
import UrlContext from "../context/UrlContext"

export default function Home() {
    const [movies, setMovies] = useState([])
    const { moviesUrl } = useContext(UrlContext)
    useEffect(() => {
        axios.get(moviesUrl)
            .then((res) => {
                setMovies(res.data)
            }
            ).catch((err) => console.error(err))
    }, [])

    return (
        <>
            <h1>Movies</h1>
            <div className="container">
                <div className="row">{
                    movies.map((movie, i) => {
                        return (
                            <Card key={i} movie={movie} />
                        )
                    })
                }</div>
            </div>
        </>
    )
}