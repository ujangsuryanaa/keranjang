import React, { useContext } from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import { UserContext } from "../context/useContext";
import { Dropdown, Image, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { AiOutlineUser, AiFillFileAdd, AiOutlineOrderedList } from "react-icons/ai";

export default function NavAdmin() {
  const [state, dispatch] = useContext(UserContext);
  
  let navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-dark justify-content-between shadow">
          <NavbarBrand className="ms-5">
            <Link to={"/transaction"}>
              <img src='https://ibox.co.id/static/logo/iboxlogo2.png' style={{ maxWidth: "100px" }} alt="logobrand" />
            </Link>
          </NavbarBrand>
          <Nav>
            <Nav.Link className="align-item-center justify-content-center me-5 pe-5 fw-bolder text-primer">
              <div style={{ display:"flex", marginRight:"40px"}}>
              <AiOutlineUser style={{width:"35" , height:"35"}}/>
              <NavDropdown
              // title={profilToggle}
              >
                <Dropdown.Item>
                  <Link
                    to="/add-product"
                    className="text-decoration-none"
                  >
                    <AiFillFileAdd/>
                    <span className="text-dark"> Add Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/list-product"
                    className="text-dark text-decoration-none"
                  >
                    <AiOutlineOrderedList/>
                    <span className="text-dark"> List Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-dark">
                <IoLogOut className="text-danger" style={{width:"20px",height:"30px"}}/>
                  <span className="text-primer" onClick={logout}>
                    {" "}
                    Logout
                  </span>
                </Dropdown.Item>
              </NavDropdown>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
}
