import React, { useContext } from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/useContext";
import NavAuth from "./modals/Auth";
import NavUser from "./NavUser";

export default function NavbarAuth({ setShow, show }) {
  const [state] = useContext(UserContext);
  const isLogin = state.isLogin;
  return (
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-black justify-content-between">
          <NavbarBrand className="ms-5">
            <Link to={"/"}>
              <img src='https://ibox.co.id/static/logo/iboxlogo2.png' style={{ width: "100px" }} alt="logobrand" />
            </Link>
            <Link to={'/iphone'} style={{color:'white', textDecoration:'none'}}>
              <a style={{paddingLeft:'50px'}}>iPhone</a>
            </Link>
          </NavbarBrand>
          {isLogin ? <NavUser /> : <NavAuth show={show} setShow={setShow} />}
        </Navbar>
      </Container>
    </div>
  );
}
