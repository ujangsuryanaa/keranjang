import React, { useContext } from "react";
import { Dropdown, Image, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/useContext";
import profileblank from "../assets/imgBlank.jpg";
import profile1 from "../assets/profileVector.png";
import { IoLogOut } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import cart from "../assets/cart.png";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";

export default function NavUser() {
  const profileVector = <Image src={profile1} width="15" height="15" />;

  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const id = state.user.id;

  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/profile/" + id);
    return response.data.data;
  });
  console.log(profile);

  const profilToggle = (
    <Image
      src={
        profile?.image
          ? "http://localhost:5000/uploads/" + profile?.image
          : profileblank
      }
      width="35"
      height="35"
      className=" rounded-circle"
    />
  );

  const [bubble, setBubble] = useState([]);

  useEffect(() => {
    API.get("/carts-id")
      .then((res) => {
        setBubble(res.data.data);
      })
      .catch((err) => console.log("error", err));
  });

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <div>
      <Nav>
        <Nav.Link className="me-3 mt-2 text-danger">
          <Link to="/cart" className="text-decoration-none">
            <div className="cart">
              <img src={cart} alt="" style={{ maxWidth: "40px" }} />
              <span className="notif" style={{ backgroundColor: "" }}>
                {bubble.length}
              </span>
            </div>
          </Link>
        </Nav.Link>
        <Nav.Link className="align-item-center justify-content-center me-5 pe-5 fw-bolder text-primer">
        <div style={{ display:"flex", marginRight:"40px", color:"white"}}>
        <AiOutlineUser style={{width:"35" , height:"35", color:'white'}}/>
          <NavDropdown className="text-primer">
            <Dropdown.Item className="text-primer"> 
              <Link to="/profile" className="text-primer text-decoration-none">
                {profileVector}
                <span className="text-primer"> Profile</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-primer">
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
    </div>
  );
}
