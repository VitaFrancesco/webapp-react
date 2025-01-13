import Vote from "./Vote"
import style from "./Review.module.css"

export default function Review({ review }) {
    return (
        <div className={style.review}>
            <div className={style.ranking}>
                <Vote vote={review.vote} />
            </div>
            <p>{review.text}</p>
            <p className={style.name}>{review.name}</p>
        </div>
    )
}