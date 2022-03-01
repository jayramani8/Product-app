import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const title = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const category = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const image = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const titles = title.current?.value;
    const prices = price.current?.value;
    const categorys = category.current?.value;
    const descriptions = description.current?.value;
    const images = image.current?.value;

    if (titles?.trim() === "") {
      toast("Title is empty");
    } else if (prices?.trim() === "") {
      toast("Price is empty");
    } else if (categorys?.trim() === "") {
      toast("Category is empty");
    } else if (descriptions?.trim() === "") {
      toast("Description is empty");
    } else if (images?.length === 0) {
      toast("Image is empty");
    } else {
      fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify({
          title: titles,
          price: prices,
          description: descriptions,
          image: images,
          category: categorys,
        }),
      })
        .then((res) => res.json())
        .then((json) => toast("Data Submited"))
        .catch(() => toast("Failed to submit data"));
    }
  };
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container contact-form body">
        <form method="post">
          <h3 className="text-danger">Add products</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group m-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Title"
                  ref={title}
                />
              </div>
              <div className="form-group m-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  ref={price}
                />
              </div>
              <div className="form-group m-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  ref={category}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group m-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  ref={description}
                ></textarea>
              </div>
              <div className="form-group m-3">
                <input type="file" className="form-control" ref={image} />
              </div>
            </div>
            <div className="form-group text-center m-3">
              <button
                type="submit"
                onClick={submitHandler}
                name="btnSubmit"
                className="btnContact"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
