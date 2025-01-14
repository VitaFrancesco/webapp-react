import axios from "axios"
import { useEffect, useState, useContext } from "react"
import Card from "../components/Card"
import UrlContext from "../context/UrlContext"
import LoaderContext from "../context/LoaderContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Home() {
    const [movies, setMovies] = useState([])
    const { moviesUrl } = useContext(UrlContext)
    const { setLoader } = useContext(LoaderContext)
    const [search, setSearch] = useState("")

    useEffect(() => {
        setLoader(true)
        axios.get(moviesUrl)
            .then((res) => {
                setMovies(res.data)
            }
            ).catch((err) => console.error(err))
            .finally(() => {
                setLoader(false)
            })
    }, [])

    function onSubmit(event) {
        event.preventDefault()
        setLoader(true)

        axios.get(moviesUrl, {
            params: {
                search: search
            }
        }).then((res) => {
            setMovies(res.data)
        }).catch((err) => console.error(err))
            .finally(() => {
                setLoader(false)
            })
    }

    return (
        movies && <>
            <form className="research" onSubmit={(e) => onSubmit(e)}>
                <input type="text" name="search" value={search} placeholder="cerca..." onChange={(e) => setSearch(e.target.value)} />
                <button type="submit"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
            </form>
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