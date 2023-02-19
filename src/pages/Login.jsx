import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../store/Auth/authSlice";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // const userAuth = useSelector((state) => state.auth.user);
  // const token = useSelector((state) => state.auth.token);
  // // console.log(userAuth);
  // // console.log(token);
  useEffect(() => {
    if (user || isSuccess) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      navigate("/home");
    }
    // dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                {isError && <p className="text-danger">{message}</p>}
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    ref={loginNameRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    ref={loginPasswordRef}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
