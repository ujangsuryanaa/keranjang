import React, { useContext, useState } from "react";
import {
  Card,
  CardImg,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ListProduct from "../components/ListProduct";
import NavbarAuth from "../components/Navbar";
import { API } from "../config/api";
import { UserContext } from "../context/useContext";
import ContainerPage from "../components/ContainerPage";

export default function Iphone() {
  document.title = "restaurant";

  //modal Login
  const [show, setShow] = useState(false);
  const [state] = useContext(UserContext); //user data
  const handleClick = () => setShow(true);

  console.log(state.user);

  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  console.log(products);

  const [filter, setFilter] = useState("");

  let searchText = (e) => {
    setFilter(e.target.value);
  };

  let dataFilter = products?.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });

  return (
    <div>
      <NavbarAuth setShow={setShow} show={show} />
      <Container style={{marginTop:'90px'}}>
        <p>Home / <span className="text-muted">iPhone</span></p>
      </Container>
      <hr />  
      <ContainerPage />
      <Container className="mt-5 mb-3 container-fluid">
        <Row>
          {dataFilter?.map((item, index) => (
            <Col xs={3} className="mb-2">
              <Link
                className="text-decoration-none"
                to={state.isLogin === true ? `/detail-product/${item.id}` : ""}
                onClick={state.isLogin === false ? handleClick : ""}
              >
                <ListProduct item={item} key={index} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
