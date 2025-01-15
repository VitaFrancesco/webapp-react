import style from "./DetailMovie.module.css"
import UrlContext from "../context/UrlContext"
import LoaderContext from "../context/LoaderContext"
import MessageContext from "../context/MessageContext"

import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { NavLink, Navigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Vote from "../components/Vote"
import Review from "../components/review"
import AddReviews from "../components/AddReview"

export default function DetailMovie() {
    const { moviesUrl } = useContext(UrlContext)
    const { setLoader } = useContext(LoaderContext)
    const { setMessage } = useContext(MessageContext)

    const [movie, setMovie] = useState({})
    const [reviews, setReviews] = useState([])
    const { id } = useParams()
    const [fetch, setFetch] = useState(false);
    const [newReviewForm, setNewReviewForm] = useState(false)
    const [openForm, setOpenForm] = useState(false)

    useEffect(() => {
        reload()
    }, [moviesUrl, id, fetch])

    function reload() {
        console.log('prima')
        setLoader(true)
        axios.get(`${moviesUrl}/${id}`)
            .then((res) => {
                setMovie(res.data)
                setReviews(res.data.reviews)
                console.log('dopo')
            }).catch((err) => console.error(err))
            .finally(() => {
                setLoader(false)
            })
    }

    function addReviews(review) {
        const newReview = {
            ...review,
            movie_id: id
        }
        axios.post(`${moviesUrl}/${id}/reviews`, newReview).then((res) => {
            setFetch((val) => !val);
        }).catch((err) => {
            console.log(err.response.data)
        }).finally(() => {
            setLoader(false)
        })
        showForm()

        setMessage('Grazie per aver detto la tua sul film!')
        setTimeout(() => {
            setMessage('')
        }, 4000)
    }

    function deleteReviews(id) {
        setLoader(true)
        axios.delete(`${moviesUrl}/${id}/reviews`)
            .then((res) => {
                setFetch((val) => !val);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setLoader(false)
            })

        setMessage('Hai rimosso definitivamente il commento')
        setTimeout(() => {
            setMessage('')
        }, 4000);
    }

    // blocca lo scroll
    function disableScrolling() {
        const scrollPosition = window.pageYOffset;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPosition}px`;
    }

    function enableScrolling() {
        const scrollPosition = window.pageYOffset;
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, scrollPosition);
    }

    // Disable scrolling by preventing touchmove
    function preventTouch(e) {
        e.preventDefault();
    }

    // Add listener to disable touch scrolling
    function disableTouchScroll() {
        document.addEventListener("touchmove", preventTouch, { passive: false });
    }

    // Remove listener to enable touch scrolling
    function enableTouchScroll() {
        document.removeEventListener("touchmove", preventTouch);
    }

    // Funzione per aprire il menu
    function showForm() {
        setNewReviewForm(newReviewForm ? false : true);
    }

    useEffect(() => {
        setOpenForm(newReviewForm);
        newReviewForm ?
            disableTouchScroll() : enableTouchScroll();
        newReviewForm ?
            disableScrolling() : enableScrolling();
    }, [newReviewForm])

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
                            <button className={style.addNewReview} onClick={showForm}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                            <div className={style.message}>Aggiungi Recensione</div>
                            <p>rating: </p>
                            {movie.avg_vote && <Vote vote={movie.avg_vote} />}
                        </div>
                    </div>
                    {reviews && reviews.map((rev, i) => {
                        return (
                            <Review key={i} review={rev} reload={reload} deleteHandler={deleteReviews} />
                        )
                    })}
                </div>
            </div>
            <div onClick={(e) => {
                // if (e.target.tagName === "form") {
                //     return
                // }
                // showForm();
                return
            }} className={openForm ? style.formReview : "dNone"}>
                <AddReviews reload={addReviews} />
                <FontAwesomeIcon className={style.closeReview} onClick={(e) => {
                    e.stopPropagation();
                    showForm();
                }} icon="fa-solid fa-x" />
            </div>
        </>
    )
}