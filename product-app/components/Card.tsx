import React from "react";
import classes from "../styles/Welcome.module.css";
import Link from "next/link";
import Image from "next/image";

type cardData={
  key:number
  id:number
  title:string
  image:string
  price:number
  category:string
}
const Card = (props:cardData) => {
  return (
    <>
      <div className="col-3 p-4" key={props.id}>
        <div className={classes.card}>
          <Image src={props.image} height="350" width="262" className="card-img-top"  alt="..." />
          <div className={`card-body  text-center ${classes.cardbody}`}>
            <h3 className="card-title">₹{props.price}</h3>
            <div className={classes.Cardtitle}>{props.title}</div>
            <Link  href={`/MoreDetails/${props.id}`} passHref>
              <button className="btn btn-primary mt-2">More Details</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
