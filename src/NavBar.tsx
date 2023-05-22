import { Link } from "react-router-dom";

const NavBar = () => {
    return (
    <nav className="NavBar">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/articles">Articles</Link></li>
        </ul>
    </nav>);
}

export default NavBar;