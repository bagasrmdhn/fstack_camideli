import React, { useRef, useEffect } from "react";

import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import { LogOut, reset } from "../../store/Auth/authSlice";
import "../../styles/header.css";

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const navigate = useNavigate();

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  const logOutHandler = (e) => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
    e.preventDefault();
  };
  const nav__links = [
    {
      display: "Home",
      path: "/home",
    },
    {
      display: "Foods",
      path: "/foods",
    },
    user
      ? {
          display: "Cart",
          path: "/cart",
        }
      : {
          display: "Login",
          path: "/login",
        },

    {
      display: "Contact",
      path: "/contact",
    },
  ];
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (headerRef.current) {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerRef.current.classList.add("header__shrink");
        } else {
          headerRef.current.classList.remove("header__shrink");
        }
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between mt-2">
          <div className="logo">
            <img src={logo} alt="logo" />
            {/* <h5>Tasty Treat</h5> */}
          </div>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i class="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            {user ? (
              <span className="user">
                <Link to="/home" onClick={logOutHandler}>
                  Logout
                </Link>
              </span>
            ) : (
              <span className="user">
                <Link to="/login">
                  <i class="ri-user-line"></i>
                </Link>
              </span>
            )}

            {user && (
              <span className="user">
                <Link to={`/history/${user.user.id}`}>History</Link>
              </span>
            )}

            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
