import React, { useState } from "react";
import MainHeader from "../components/MainHeader";
import "bootstrap/dist/css/bootstrap.css";
import Card from "../components/Card";
import Router from "next/router";
import { type } from "os";

export const getStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export type apiData = {
  category: string,
  description: string,
  id: number,
  image: string,
  price: number,
  rating: {
    rate: number,
    count: number,
  },
  title:string,
};
const Welcome = (props:{data:apiData[]}) => {
  // console.log(typeof(props.data));
  const [searchValue, setSearchValue] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const filterHandler = (searchItem: string) => {
    setSearchValue(searchItem);
  };
  const filterSelectTitle = (titleItem: string) => {
    setSelectTitle(titleItem);
  };

  return (
    <>
      <MainHeader searchData={filterHandler} selectTitle={filterSelectTitle} />
      {}
      <div className="container">
        <div className="row">
          {props.data
          .filter((val: apiData) => {
              if (selectTitle === "00-100") {
                return val.price < 100;
              } else if (selectTitle === "100-300") {
                return val.price > 100 && val.price < 300;
              } else if (selectTitle === "300-600") {
                return val.price > 300 && val.price < 600;
              } else if (selectTitle === "600+") {
                return val.price > 600;
              } else if (searchValue === "") {
                return val;
              } else if (selectTitle === "00-100") {
                // console("0000");
              } else if (
                val.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                val.category.toLowerCase().includes(searchValue.toLowerCase())
              ) {
                return val;
              }
            })
            .sort((prev:apiData , next:any) => {
              // console.log(next:{});
              if (selectTitle === "") {
                return next;
              } else if (selectTitle === "title") {
                if (prev.title.toLowerCase() < next.title.toLowerCase()) {
                  return -1;
                } else if (
                  prev.title.toLowerCase() > next.title.toLowerCase()
                ) {
                  return 1;
                }
              }
            })
            .map((item: apiData) => {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  category={item.category}
                />
              );
            })}
        </div>
      </div>
      ;
    </>
  );
};

export default Welcome;
