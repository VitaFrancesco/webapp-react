import Vote from "./Vote"
import style from "./Review.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"

import UrlContext from "../context/UrlContext"
import MessageContext from "../context/MessageContext"
import LoaderContext from "../context/LoaderContext"
import { useContext } from "react"

export default function Review({ review, reload }) {
    const { moviesUrl } = useContext(UrlContext)
    const { setMessage } = useContext(MessageContext)
    const { setLoader } = useContext(LoaderContext)

    function deleteReviews() {
        setLoader(true)
        axios.delete(`${moviesUrl}/${review.id}/reviews`)
            .then((res) => {

            }).catch((err) => console.error(err))
            .finally(() => {
                setLoader(false)
            })
        reload()
        setMessage('Hai rimosso definitivamente il commento')
        setTimeout(() => {
            setMessage('')
        }, 4000);
    }
    return (
        <div className={style.review}>
            <p>{review.text}</p>
            <div className={style.ranking}>
                <strong>Voto:</strong>
                <Vote vote={review.vote} />
            </div>
            <p className={style.name}>{review.name}</p>
            <div className={style.trash} onClick={deleteReviews} >
                <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </div>
        </div>
    )
}