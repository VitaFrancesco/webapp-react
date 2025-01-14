import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./Loader.module.css"

export default function Loader() {

    return (
        <div className={style.loadingPage}>
            <div className={style.iconLoading}>
                <FontAwesomeIcon icon="fa-solid fa-spinner" />
            </div>
        </div>
    )
}