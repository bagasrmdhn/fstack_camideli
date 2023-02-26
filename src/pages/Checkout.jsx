import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Toast, ToastHeader } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import mandiriImg from "../assets/images/mandiri.svg";
import bcaImg from "../assets/images/bca.png";
import { orderingSubmit, reset } from "../store/Order/orderSlice";
import Swal from "sweetalert2";

import "../styles/checkout.css";

const Checkout = () => {
  const [enterFirstName, setEnterFirstName] = useState("");
  const [enterLastName, setEnterLastName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [enterBankFrom, setEnterBankFrom] = useState("");
  const [enterImageUpload, setEnterImageUpload] = useState("");
  const [enterBankTo, setEnterBankTo] = useState("");
  const [enterBankAccountName, setEnterBankAccountName] = useState("");
  const [enterAddress, setEnterAddress] = useState("");

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const orderedItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const noRekBca = "2141301367";
  const shippingCost = 10000;
  const user = useSelector((state) => state.auth.user);

  const totalAmount = cartTotalAmount + Number(shippingCost);
  const { isError, isLoading, isSuccess } = useSelector((state) => state.order);

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Success!",
        text: "Your order has been placed",
        icon: "success",
        confirmButtonText: "Ok",
      });

      dispatch(reset());
    }
    if (isError) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }, [isSuccess, isError, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const orderDetails = {
      userId: user.user.id,
      firstName: enterFirstName,
      lastName: enterLastName,
      orderDate: new Date().toLocaleDateString(),
      image: enterImageUpload,
      email: user.user.email,
      phoneNumber: enterNumber,
      address: enterAddress,
      city: enterCity,
      postalCode: postalCode,
      bankFrom: enterBankFrom,
      bankTo: enterBankTo,
      accountHolder: enterBankAccountName,
      total: totalAmount,
      items: orderedItems,
    };
    console.log(orderDetails);
    dispatch(orderingSubmit(orderDetails));
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Shipping Address</h6>
              <form
                className="checkout__form"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    required
                    onChange={(e) => setEnterFirstName(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    required
                    onChange={(e) => setEnterLastName(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={user.user.email}
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="file"
                    placeholder="Upload proof of payment"
                    required
                    onChange={(e) => setEnterImageUpload(e.target.files[0])}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="From Bank"
                    required
                    onChange={(e) => setEnterBankFrom(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="bank account name"
                    required
                    onChange={(e) => setEnterBankAccountName(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <textarea
                    name="address"
                    id="address"
                    cols="30"
                    rows="5"
                    placeholder="Enter your address"
                    onChange={(e) => setEnterAddress(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className=" form__group">
                  <label htmlFor="bankTo">Bank To</label>
                  <select
                    className="form-control"
                    name="bankTo"
                    id="bankTo"
                    onChange={(e) => setEnterBankTo(e.target.value)}
                  >
                    <option value="">Select Bank</option>
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BCA">Bank BCA</option>
                  </select>
                </div>

                <button type="submit" className="addTOCart__btn">
                  {isLoading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <Row>
                <div className="checkout__bill">
                  <h6 className="d-flex align-items-center justify-content-between mb-3">
                    Subtotal:{" "}
                    <span>Rp{cartTotalAmount.toLocaleString("id")}</span>
                  </h6>
                  <h6 className="d-flex align-items-center justify-content-between mb-3">
                    Shipping: <span>Rp{shippingCost.toLocaleString("id")}</span>
                  </h6>
                  <div className="checkout__total">
                    <h5 className="d-flex align-items-center justify-content-between">
                      Total: <span>Rp{totalAmount.toLocaleString("id")}</span>
                    </h5>
                  </div>
                </div>
                <div className=" mt-5">
                  {/* <h6 className="d-flex align-items-left justify-content-between mb-3 ">
                    <div>
                      <p>Bank Mandiri</p>
                      <p>Account Number: 123456789</p>
                      <p>Account Name: John Doe</p>
                    </div>
                    <span>
                      <img className="bank-logo" src={mandiriImg} alt="" />
                    </span>
                  </h6> */}

                  <div className="checkout__total">
                    <h6 className="d-flex align-items-left justify-content-between mb-3 ">
                      <div>
                        <p>Bank BCA</p>
                        <p>Account Number: {noRekBca} </p>
                        <p>Account Name: Sarah Farida Ainun</p>
                      </div>
                      <span>
                        <img className="bank-logo" src={bcaImg} alt="" />
                      </span>
                    </h6>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
