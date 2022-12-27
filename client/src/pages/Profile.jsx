import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavbarAuth from "../components/Navbar";
import imgBlank from "../assets/imgBlank.jpg"
import Transaction from "../components/Transaction";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/useContext";

export default function Profile() {
  const title = "Profile";
  document.title = "ecommerce | " + title;

  const [state] = useContext(UserContext);

  const id = state.user.id;

  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/profile/" + id);
    return response.data.data;
  });

  return (
    <div>
      <NavbarAuth />
      <Container className="mt-5 pt-5 container-fluid">
        <Row>
          <Col xs={12} md={6}>
            <h2 className="text-dark fw-bold mb-3">My Profile</h2>
            <Row>
              <Col xs={12} md={4}>
                <img
                  src={
                    profile?.image
                      ? "http://localhost:5000/uploads/" + profile?.image
                      : imgBlank
                  }
                  style={{ width: "80%", borderRadius: "8px" }}
                  className=""
                  alt=""
                />
              </Col>
              <Col>
                <div className="text-dark">
                  <h5 className="m-0 p-0">Name :</h5>
                  <h5>{state.user.name}</h5>
                  <h5 className="m-0 p-0">Email : </h5>
                  <h5>{state.user.email}</h5>
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <h2 className="text-dark fw-bold mb-3">My Transactions</h2>
            <div style={{ width: "100%", height: "400px", overflow: "scroll" }}>
              <Transaction />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
