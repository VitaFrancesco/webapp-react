import style from "./DetailBook.module.css"
import UrlContext from "../context/UrlContext"
import LoaderContext from "../context/LoaderContext"

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
    const { setLoader } = useContext(LoaderContext)

    const [movie, setMovie] = useState({})
    const [reviews, setReviews] = useState([])
    const { id } = useParams()
    const [newReview, setNewReview] = useState(false)
    const [newReviewForm, setNewReviewForm] = useState(false)
    const [openForm, setOpenForm] = useState(false)

    useEffect(() => {
        reload()
    }, [newReview])

    function reload() {
        setLoader(true)
        axios.get(`${moviesUrl}/${id}`)
            .then((res) => {
                setMovie(res.data)
                setReviews(res.data.reviews)
            }).catch((err) => console.error(err))
            .finally(() => {
                setLoader(false)
            })
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
                            <Vote vote={movie.avg_vote} />
                        </div>
                    </div>
                    {reviews.map((rev, i) => {
                        return (
                            <Review key={i} review={rev} reload={reload} />
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
                <AddReviews submit={showForm} reload={reload} movieId={id} />
                <FontAwesomeIcon className={style.closeReview} onClick={(e) => {
                    e.stopPropagation();
                    showForm();
                }} icon="fa-solid fa-x" />
            </div>
        </>
    )
}