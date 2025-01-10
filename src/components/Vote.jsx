import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from "./Vote.module.css"

export default function Vote({ vote }) {
    const starArray = new Array(5)
    starArray.fill(0)

    return (
        <div className={style.valutation}>
            {starArray.map((star, i) => {
                return (
                    i + 1 <= vote ?
                        <FontAwesomeIcon key={i} className={style.yellow} icon="fa-solid fa-star" /> :
                        i + 1.3 <= vote && i + 1.7 >= vote ?
                            <div key={i} className={style.twoColor}>
                                <div className={`${style.halfStar} ${style.start}`}>
                                    <FontAwesomeIcon className={style.yellow} icon="fa-solid fa-star" />
                                </div>
                                <div className={`${style.halfStar} ${style.end}`}>
                                    <FontAwesomeIcon className={style.black} icon="fa-solid fa-star" />
                                </div>
                            </div> :
                            <FontAwesomeIcon key={i} className={style.black} icon="fa-solid fa-star" />
                )
            })}
        </div>
    )
}