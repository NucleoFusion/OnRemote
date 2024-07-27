import React from "react";
import { Link } from "react-router-dom";

function Navbar(){

    return ( 
        <nav className="navbar navbar-expand-lg bg-body-tertiary" id='Navbar'>
            <div className="container-fluid">
                <Link to='/'>
                    <button className="navbar-brand" href="/home">Navbar</button>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to='/home'>
                            <button className="nav-link active" aria-current="page" href="/home">Home</button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/itemEntry'>
                            <button className="nav-link active" aria-current="page" href="/itemEntry">Item Entry</button>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            View Data
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to='/show/locations'>
                                    <button className="dropdown-item" type="button">Locations</button>
                                </Link>
                            </li>
                            <li>
                                <Link to='/show/cust'>
                                    <button className="dropdown-item" type="button">Customer</button>
                                </Link>
                            </li>
                            <li>
                                <Link to='/show/products'>
                                    <button className="dropdown-item" type="button">Products</button>
                                </Link>
                            </li>
                        </ul>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;