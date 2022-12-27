import React, { useContext, useState } from "react";
import {
  Container,
} from "react-bootstrap";
import NavbarAuth from "../components/Navbar";
import ControlledCarousel from "../components/ControlledCarousel";

export default function LandingPages() {
  document.title = "ecommerce";

  //modal Login
  const [show, setShow] = useState(false);

  return (
    <div>
      <NavbarAuth setShow={setShow} show={show} />
      <ControlledCarousel />
      <Container className="mt-5 pt-5 container-fluid">
      </Container>
    </div>
  );
}
