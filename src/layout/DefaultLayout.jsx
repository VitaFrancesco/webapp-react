import Header from "../components/Header";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import LoaderContext from "../context/LoaderContext";

export default function DefaultLayout() {
    const { loader } = useContext(LoaderContext)

    return (
        <>
            <Header />
            <main>
                <Outlet />
                <Message />
            </main>
            {loader && <Loader />}
        </>
    )
}