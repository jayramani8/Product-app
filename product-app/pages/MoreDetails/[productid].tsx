import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import Header from "../../components/Header";
import { apiData } from "../Welcome";
import { GetStaticProps } from "next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export const getStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  const paths = data.map((curElem: { id: number }) => {
    return {
      params: {
        productid: curElem.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.productid;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const myData = (props: { data: apiData }) => {
  //   const { id, title, bodyd } = ata;

  const deleteHandler = () => {
    fetch(`https://fakestoreapi.com/products/${props.data.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => toast("Data Deleted Successfully"));
  };
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="row p-3 w-100 bg-white">
        <div className="col-lg-6 col-sm-12  text-center p-3 moreDetails">
          <Image width="300" height="350" src={props.data.image} alt="image" />
          <h3>{props.data.title}</h3>
        </div>
        <div className="col-lg-6 col-sm-12 bg-light p-3">
          <h1>Catagary : {props.data.category}</h1>
          <br />
          <div>
            <h2>Description</h2>
            <div>{props.data.description}</div>
          </div>
          <br />
          <div>
            <h2>Price : ₹{props.data.price}</h2>
          </div>
          <br />
          <div className="d-flex justify-content-evenly">
            <Link href={`/UpdateProduct/${props.data.id}`} passHref>
              <button className="btn btn-primary w-25 p-2 ml-3">Edit</button>
            </Link>
            <button
              className="btn btn-danger w-25 p-2 ml-4"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default myData;
