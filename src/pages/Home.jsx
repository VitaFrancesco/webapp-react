import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
    const [movies, setMovies] = useState([])
    const moviesUrl = "http://localhost:3000/movies"
    useEffect(() => {
        axios.get(moviesUrl)
            .then((res) => {
                setMovies(res.data)
            }
            ).catch((err) => console.error(err))
    }, [])

    return (
        <>
            <h1>Homepage</h1>
            <div>{
                movies.map((movie, i) => {
                    return (
                        <h3 key={i}>{movie.title}</h3>
                    )
                })
            }</div>
        </>
    )
}