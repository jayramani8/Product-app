import Link from "next/link";
import React, { useState } from "react";
import classes from "./mainHeader.module.css";
import "bootstrap/dist/css/bootstrap.css";

type headerProps = {
  searchData: Function;
  selectTitle: Function;
};
const MainHeader = (props: headerProps) => {
  //   console.log(props);
  const [searchData, setSearchData] = useState("");
  // console.log(typeof(searchData));
  const searchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const searchDataHandler = () => {
    props.searchData(searchData);
  };

  const selectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const select = e.target.value;
    // console.log(typeof(select));

    props.selectTitle(select);
  };

  return (
    <header className={classes.header}>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Our Shop
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link aria-current="page" href="/Welcome">
                  All Products
                </Link>
              </li>
              <li className="nav-item">
                <Link aria-current="page" href="/AddProduct">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <select className="form-select" onChange={selectFilter}>
                  <optgroup label="Title">
                    <option value="">--filter--</option>
                    <option value="title">Title</option>
                  </optgroup>
                  <optgroup label="Price">
                    <option value="00-100">00-100</option>
                    <option value="100-300">100-300</option>
                    <option value="300-600">300-600</option>
                    <option value="600+">600 above</option>
                  </optgroup>
                </select>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                onChange={searchFilter}
                onKeyUp={searchDataHandler}
              />
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default MainHeader;
