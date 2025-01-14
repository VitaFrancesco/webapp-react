import Vote from "./Vote"
import style from "./Review.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"

import UrlContext from "../context/UrlContext"
import MessageContext from "../context/MessageContext"
import LoaderContext from "../context/LoaderContext"
import { useContext } from "react"

export default function Review({ review, deleteHandler }) {
    return (
        <div className={style.review}>
            <p>{review.text}</p>
            <div className={style.ranking}>
                <strong>Voto:</strong>
                <Vote vote={review.vote} />
            </div>
            <p className={style.name}>{review.name}</p>
            <div className={style.trash} onClick={() => deleteHandler(review.id)} >
                <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </div>
        </div>
    )
}