import { useContext } from "react";
import MessageContext from "../context/MessageContext";
import style from "./Message.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Message() {
    const { message } = useContext(MessageContext)

    return (
        <div className={message ? style.message : "dNone"}>
            <p>{message}</p>
            <FontAwesomeIcon icon="fa-solid fa-circle-check" />
        </div>
    )
}