import { useState, useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import style from "./AddReview.module.css"
import UrlContext from "../context/UrlContext"
import MessageContext from "../context/MessageContext";
import LoaderContext from "../context/LoaderContext";

export default function AddReviews({ reload }) {
    const { moviesUrl } = useContext(UrlContext)
    const { setMessage } = useContext(MessageContext)
    const { setLoader } = useContext(LoaderContext)

    const [rating, setRating] = useState(0)
    const [errorForm, setErrorForm] = useState([])


    const [initialReview, setInitialReview] = useState({
        name: "",
        text: "",
        vote: 0
    })

    function onChange(e) {

        const elem = e.target;
        let value;
        if (elem.type === 'radio') {
            value = JSON.parse(elem.value);
            setRating(value)
        } else {
            value = elem.value;
        }

        setInitialReview({
            ...initialReview,
            [elem.name]: value
        })
    }

    function validateForm() {
        const errors = [];

        if (!initialReview.name.trim()) {
            errors.push('name');
        };
        if (!initialReview.text.trim()) {
            errors.push('text');
        };
        if (!initialReview.vote) {
            errors.push('vote');
        };

        return errors
    }

    function createreview(event) {
        event.preventDefault()
        setLoader(true)

        const errors = validateForm()

        if (errors.length) {
            setLoader(false)
            setErrorForm(errors)
            return
        }

        const newReview = {
            name: initialReview.name.trim(),
            text: initialReview.text.trim(),
            vote: initialReview.vote
        }

        reload(newReview)



        setInitialReview({
            name: "",
            text: "",
            vote: 0
        })
        setRating(0)

    }

    return (
        <form className={style.form} onSubmit={(e) => createreview(e)}>
            <div className={style.sector}>
                <div className={`${style.error} ${errorForm.includes('name') ? "" : "dNone"}`}>Nome mancante</div>
                <label htmlFor="name">Name</label>
                <input name="name" type="text" placeholder="Inserisci il nome" value={initialReview.name} onChange={(e) => onChange(e)} />
            </div>


            <div className={style.sector}>
                <div className={`${style.error} ${errorForm.includes('text') ? "" : "dNone"}`}>Testo mancante</div>
                <label htmlFor="text">Review</label>
                <textarea name="text" rows={4} value={initialReview.text} onChange={(e) => onChange(e)} placeholder="Cosa ne pensi del film..." />
            </div>

            <div className={`${style.sector}`}>
                <div className={`${style.error} ${errorForm.includes('vote') ? "" : "dNone"}`}>Voto mancante</div>
                <div className={style.rating}>
                    <label className={style.star}>
                        <input id="5" value={5} name="vote" type="radio" checked={initialReview.vote === 5} onChange={(e) => onChange(e)} />
                        <FontAwesomeIcon className={rating >= 5 ? style.yellow : ""} icon="fa-solid fa-star" />
                    </label>
                    <label className={style.star}>
                        <input id="4" value={4} name="vote" type="radio" checked={initialReview.vote === 4} onChange={(e) => onChange(e)} />
                        <FontAwesomeIcon className={rating >= 4 ? style.yellow : ""} icon="fa-solid fa-star" />
                    </label>
                    <label className={style.star}>
                        <input id="3" value={3} name="vote" type="radio" checked={initialReview.vote === 3} onChange={(e) => onChange(e)} />
                        <FontAwesomeIcon className={rating >= 3 ? style.yellow : ""} icon="fa-solid fa-star" />
                    </label>
                    <label className={style.star}>
                        <input id="2" value={2} name="vote" type="radio" checked={initialReview.vote === 2} onChange={(e) => onChange(e)} />
                        <FontAwesomeIcon className={rating >= 2 ? style.yellow : ""} icon="fa-solid fa-star" />
                    </label>
                    <label className={style.star}>
                        <input id="1" value={1} name="vote" type="radio" checked={initialReview.vote === 1} onChange={(e) => onChange(e)} />
                        <FontAwesomeIcon className={rating >= 1 ? style.yellow : ""} icon="fa-solid fa-star" />
                    </label>
                </div>
            </div>

            <button className={style.submit} type="submit">Invia</button>
        </form>
    )
}