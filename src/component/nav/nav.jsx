import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./nav.css";
import logo2 from "../../assets/icons8-menu-128.png";
import searchLogo from "../../assets/icons8-search-30.png";
import heartLogo from "../../assets/icons8-heart-48.png";
import bagLogo from "../../assets/icons8-bag-24.png";
import userLogo from "../../assets/icons8-user-24.png";
import menuLogo from "../../assets/icons8-menu-128.png";

const NAV_ITEMS = [
    { src: searchLogo, alt: "Search", action: null },
    { src: heartLogo, alt: "Favorites", action: '/favorite' },
    { src: bagLogo, alt: "Cart", action: null },
    { src: userLogo, alt: "User", action: null, className: 'd-none' },
    { src: null, alt: "Language", action: null, className: 'd-none', select: true }
];

const DROP_DOWN_ITEMS = [
    "SHOP",
    "SKILLS",
    "STORIES",
    "ABOUT",
    "CONTACT US"
];

export default function Nav() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => setShowDropdown(prev => !prev);

    const handleNavItemClick = (action) => {
        if (action) {
            navigate(action);
        }
    };

    return (
        <>
            <nav>
                <section className="nav-top">
                    <span>
                        <img 
                            className="menu-logo" 
                            src={menuLogo} 
                            alt="Menu" 
                            onClick={toggleDropdown} 
                        />
                        <img 
                            onClick={() => handleNavItemClick('/')} 
                            src={logo2} 
                            alt="Home" 
                        />
                    </span>

                    <span className="company-logo">LOGO</span>
                    <ul>
                        {NAV_ITEMS.map((item, index) => (
                            item.select ? (
                                <li className={item.className} key={index}>
                                    <select name="language">
                                        <option value="">ENG</option>
                                        <option value="bengali">BNG</option>
                                    </select>
                                </li>
                            ) : (
                                <li 
                                    className={item.className} 
                                    key={index} 
                                    onClick={() => handleNavItemClick(item.action)}
                                >
                                    <img 
                                        src={item.src} 
                                        alt={item.alt} 
                                    />
                                </li>
                            )
                        ))}
                    </ul>
                </section>

                <section className="nav-bottom d-none">
                    <ul>
                        {DROP_DOWN_ITEMS.map((item, index) => (
                            <li key={index} onClick={() => handleNavItemClick('/')}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {showDropdown && (
                    <section className="drop-down">
                        <ul>
                            {DROP_DOWN_ITEMS.map((item, index) => (
                                <li key={index} onClick={() => handleNavItemClick('/')}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </nav>

            <div className="home-shop">
                <span onClick={() => handleNavItemClick('/')}>HOME</span>
                <span className="vl">|</span>
                <span>SHOP</span>
            </div>
        </>
    );
}