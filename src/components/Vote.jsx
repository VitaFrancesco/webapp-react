import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from "./Vote.module.css"

export default function Vote({ vote }) {

    const starArray = new Array(5)
    starArray.fill(0)

    const stars = []; // 4
    const voteFloor = Math.floor(vote); // 4
    const hasHalf = vote - voteFloor > 0.5; // false

    for (let i = 1; i <= voteFloor; i++) {
        stars.push(<FontAwesomeIcon key={'full' + i} className={style.yellow} icon="fa-solid fa-star" />);
    }
    if (hasHalf) {
        stars.push(<div key={'half'} className={style.twoColor}>
            <div className={`${style.halfStar} ${style.start}`}>
                <FontAwesomeIcon className={style.yellow} icon="fa-solid fa-star" />
            </div>
            <div className={`${style.halfStar} ${style.end}`}>
                <FontAwesomeIcon className={style.black} icon="fa-solid fa-star" />
            </div>
        </div>);
    }
    for (let i = (hasHalf) ? voteFloor + 1 : voteFloor; i < 5; i++) {
        stars.push(<FontAwesomeIcon key={'empty' + i} className={style.black} icon="fa-solid fa-star" />);
    }

    return (
        <div className={style.valutation}>{stars}</div>
    )
}