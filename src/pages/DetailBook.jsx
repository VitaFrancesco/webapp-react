import style from "./DetailBook.module.css"
import UrlContext from "../context/UrlContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import Vote from "../components/Vote"

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
            <div className={`${style.book} container`}>
                <div className={style.cover}>
                    <img src={movie.image} alt="" />
                </div>

                <div className={style.bookInfo}>
                    <h2 className={style.title}>{movie.title}</h2>
                    <p className={style.director}>{movie.director}</p>
                    <p className={style.genre}><strong>Genre: </strong>{movie.genre}</p>
                    <p className={style.releaseYear}><strong>Release Year: </strong>{movie.release_year}</p>
                    <p className={style.abstract}><strong>Description: </strong>{movie.abstract}</p>
                </div>
            </div>
            <div className={`${style.flexEnd} container`}>
                <Vote vote={movie.avg_vote} />
            </div>
        </>
    )
}