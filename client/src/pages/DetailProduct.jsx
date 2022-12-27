import React from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarAuth from "../components/Navbar";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";

export default function DetailProduct() {
  const title = "Product";
  document.title = "ecommerce | " + title;

  const navigate = useNavigate();

  let { id } = useParams();
  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });
  console.log(product);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({
        product_id: parseInt(id),
        qty: 1,
        subtotal: product?.price,
      });
      await API.post("/cart", body, config);
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarAuth />
      <Container className="mt-5 pt-5 px-5">
        <Row>
          <Col xs={4} className="container-fluid ">
            <img
              className="rounded"
              src={product?.image}
              alt="detailProduct"
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={5}>
            <div style={{border:'solid 1px', paddingLeft:'20px', paddingRight:'20px'}}>
              <h3 className="text-dark mt-2"><strong>{product?.title}</strong></h3>
              {/* <h5 className="text-primer2 my-3">Stock : {product?.stock}</h5> */}
              <p className="text-dark text-justified">{product?.desc}</p>
            </div>
            </Col>
            <Col xs={3}>
            <div style={{border:'solid 1px', paddingTop:'50px', paddingBottom:'50px'}}>
              <h3 className="">
                {convertRupiah.convert(product?.price)}
              </h3>
              <Link to={"/cart"}>
                <Button
                  style={{width:'100%'}}
                  className="bg-dark"
                  onClick={handleSubmit}
                >
                  Add Cart
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
