import { NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <nav>
                <NavLink to={"/"}>
                    <div className="logo">
                        <div className="logoSfera">F</div>
                        <div className="logoSfera">I</div>
                        <div className="logoSfera">L</div>
                        <div className="logoSfera">M</div>
                    </div>
                </NavLink>
            </nav>
        </header>
    )
}