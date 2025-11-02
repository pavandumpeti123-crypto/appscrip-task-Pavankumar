import "./footerDropDown.css";
import arrow from "../../assets/icons8-right-arrow-30.png";
import { useState } from "react";

export default function FooterDropDown({ item }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="row">
            <div className="row-top" onClick={toggleDropdown}>
                <h3>{item.title}</h3>
                <img
                    className={`footer-arrow ${isOpen ? 'footer-arrow-up' : 'footer-arrow-down'}`}
                    src={arrow}
                    alt="Toggle Dropdown"
                />
            </div>
            {!isOpen && (
                <div className="row-bottom">
                    <div className="footer-row-select">
                        {item.data.map((elm, idx) => (
                            <span key={idx}>{elm}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}