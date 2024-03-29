import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";

import axios from "axios";

const FoodDetails = () => {
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  // const product = products.find((product) => product.id === id);
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://server-camideli.yellowsandstravel.com/api/v1/member/detail-page/${id}`
        );
        const data = response.data.item;
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const { name, price, category, desc, imageId, description, categoryId } =
    product;
  const imageUrl = imageId && imageId.length > 0 ? imageId[0].imageUrl : "";
  const helperImg = `${process.env.REACT_APP_HOST}/${imageUrl}`;
  const categoryTitle =
    categoryId && categoryId.length > 0 ? categoryId[0].name : "";
  // console.log(categoryTitle);
  // const relatedProduct = product.filter((item) => categoryTitle === item.category);
  const [previewImg, setPreviewImg] = useState(imageUrl);
  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        name,
        price,
        imageUrl,
      })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(enteredName, enteredEmail, reviewMsg);
  };

  useEffect(() => {
    setPreviewImg(product.imageUrl);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={name} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
                {
                  imageId && imageId.length > 0 ? ( // if imageId is not null
                    imageId.map((item, index) => (
                      <div
                        className="img__item mb-3"
                        onClick={() => setPreviewImg(item.imageUrl)}
                        key={index}
                      >
                        <img
                          src={`${process.env.REACT_APP_HOST}/${item.imageUrl}`}
                          alt=""
                          className="w-50"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="img__item mb-3"> </div>
                  )
                  // <div
                }
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img
                  src={`${process.env.REACT_APP_HOST}/${previewImg}`}
                  alt=""
                  className="w-100"
                />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{name}</h2>
                <p className="product__price">
                  {" "}
                  Price: <span>Rp{price.toLocaleString("id")}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{categoryTitle}</span>
                </p>

                <button onClick={addItem} className="addTOCart__btn">
                  Add to Cart
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                  className={` ${tab === "desc" ? "tab__active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                {/* <h6
                  className={` ${tab === "rev" ? "tab__active" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review
                </h6> */}
              </div>

              {tab === "desc" ? (
                <div
                  className="tab__content"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
              ) : (
                <div className="tab__form mb-3">
                  <div className="review pt-5">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>
                  <form className="form" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setEnteredName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Write your review"
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="addTOCart__btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Col>

            {/* <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col> */}

            {/* {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))} */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
