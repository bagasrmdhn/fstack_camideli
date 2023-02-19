import React from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  const { _id, name, imageId, price } = props.item;
  const dispatch = useDispatch();
  const imageUrl = imageId && imageId.length > 0 ? imageId[0].imageUrl : "";

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        _id,
        name,
        imageUrl,
        price,
      })
    );
  };

  return (
    <div className=" product__item">
      <div className="product__img">
        <img
          src={`${process.env.REACT_APP_HOST}/${imageUrl}`}
          alt="product-img"
          className="image-resize img-responsive"
        />
      </div>

      <div className="product__content">
        <Link to={`/foods/${_id}`}>
          <h5>{name}</h5>
        </Link>
        <div className="d-flex align-items-center justify-content-between">
          <span className="product__price">Rp{price}</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
