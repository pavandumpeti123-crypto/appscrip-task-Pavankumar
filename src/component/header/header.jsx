import "./header.css";
import logo1 from "../../assets/icons8-card-exchange-24.png";

export default function Header() {
    return (
        <header>
            <span className="header-item">
                <img src={logo1} alt="Logo" />
                Lorem ipsum dolor
            </span>
            <span className="header-item">
                <img src={logo1} alt="Logo" />
                Lorem ipsum dolor
            </span>
            <span className="header-item d-none">
                <img src={logo1} alt="Logo" />
                Lorem ipsum dolor
            </span>
        </header>
    );
}
