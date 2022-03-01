import Link from "next/link";
import classes from './mainHeader.module.css';
import "bootstrap/dist/css/bootstrap.css";


const Header = ()=>{
   return (
    <header className={classes.header}>
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Our Shop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link  aria-current="page" href="/Welcome">All Products</Link>
                        </li>
                        <li className="nav-item">
                        <Link  aria-current="page" href="/AddProduct">Add Product</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    );
}
export default Header;