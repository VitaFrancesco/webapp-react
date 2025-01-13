import style from "./DetailBook.module.css"
import UrlContext from "../context/UrlContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { NavLink, Navigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Vote from "../components/Vote"
import Review from "../components/review"
import AddReviews from "../components/AddReview"

export default function DetailBook() {
    const { moviesUrl } = useContext(UrlContext)
    const [movie, setMovie] = useState({})
    const [reviews, setReviews] = useState([])
    const { id } = useParams()
    const [newReview, setNewReview] = useState(false)

    useEffect(() => {
        reload()
    }, [newReview])

    function reload() {
        axios.get(`${moviesUrl}/${id}`)
            .then((res) => {
                setMovie(res.data)
                setReviews(res.data.reviews)
            }).catch((err) => console.error(err))
    }

    return (
        <>
            <div className="container">
                <NavLink to={"/"}><button className={style.backLink}>Back <FontAwesomeIcon icon="fa-solid fa-arrow-left" /></button></NavLink>
                <div className={style.book}>
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
            </div>
            <div className="container">
                <div className={style.cardReviews}>
                    <div className={style.flexSpace}>
                        <h3>Reviews:</h3>
                        <div>
                            <p>rating: </p>
                            <Vote vote={movie.avg_vote} />
                        </div>
                    </div>
                    {reviews.map((rev, i) => {
                        return (
                            <Review key={i} review={rev} />
                        )
                    })}
                </div>
            </div>
            <div className="container">
                <AddReviews reload={reload} movieId={id} />
            </div>
        </>
    )
}