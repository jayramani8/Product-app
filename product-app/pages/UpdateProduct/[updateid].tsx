import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../../components/Header";
import { GetStaticProps } from "next";
import { apiData } from "../Welcome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  const paths = data.map((curElem: { id: number }) => {
    return {
      params: {
        updateid: curElem.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.updateid;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const MyData = (props: { data: apiData }) => {
  const [inputObj, setInputObj] = useState({
    title: props.data.title,
    price: props.data.price,
    category: props.data.category,
    description: props.data.description,
    image: "",
  });

  const updateInputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setInputObj({
      ...inputObj,
      [e.target.name]: value,
    });
  };

  const updateHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputObj.title.trim() === "") {
      toast("Title is empty");
    } else if (inputObj.price.toString() === "") {
      toast("Price is empty");
    } else if (inputObj.category.trim() === "") {
      toast("Category is empty");
    } else if (inputObj.description.trim() === "") {
      toast("Description is empty");
    } else if (inputObj.image.length === 0) {
      toast("Image is empty");
    } else {
      fetch(`https://fakestoreapi.com/products/${props.data.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: inputObj.title,
          price: inputObj.price,
          description: inputObj.description,
          image: inputObj.image,
          category: inputObj.category,
        }),
      })
        .then((res) => res.json())
        .then((json) => toast("Data Update Successfully"))
        .catch(() => toast("Failed to Update data"));
    }
  };
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container contact-form body">
        <form method="post">
          <h3 className="text-danger">Update Products</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group m-3">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={inputObj.title}
                  onChange={updateInputHandler}
                  placeholder="Product Title"
                />
              </div>
              <div className="form-group m-3">
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={inputObj.price}
                  onChange={updateInputHandler}
                  placeholder="Price"
                  // ref={price}
                />
              </div>
              <div className="form-group m-3">
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={inputObj.category}
                  onChange={updateInputHandler}
                  placeholder="Category"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group m-3">
                <textarea
                  className="form-control"
                  name="description"
                  value={inputObj.description}
                  onChange={updateInputHandler}
                  placeholder="Description"
                  // ref={description}
                ></textarea>
              </div>
              <div className="form-group m-3">
                <input
                  type="file"
                  name="image"
                  onChange={updateInputHandler}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group text-center m-3">
              <button
                type="submit"
                onClick={updateHandler}
                name="btnSubmit"
                className="btnContact"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyData;
