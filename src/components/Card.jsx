import style from "./Card.module.css"
import { NavLink } from "react-router-dom"
import Vote from "./Vote"

export default function Card({ movie }) {
    return (
        <div className={style.col}>
            <div className={style.card}>
                <img src={movie.image} alt="" />
                <div className={style.cardBody}>
                    <h4 className={style.title}>{movie.title}</h4>
                    <p className={style.director}>{movie.director}</p>
                    <div className={style.avgVote}><Vote vote={movie.avg_vote} /></div>
                    <p className={style.abstract}>{movie.abstract}</p>
                    <div className={style.flexEnd}>
                        <NavLink to={`/${movie.id}`}><button className={style.readMore}>Read more...</button></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}