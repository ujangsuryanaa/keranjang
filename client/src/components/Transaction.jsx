import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import qrCode from "../assets/qrcode.svg";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Rupiah from "rupiah-format";
import nodata from "../assets/nodata.png";
import dateFormat from "dateformat";

export default function Transaction() {
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/user-transaction");
    return response.data.data;
  });
  console.log(transactions);
  return (
    <>
      {transactions?.length != 0 ? (
        <div>
          {transactions?.map((items, index) => (
            <Container
              className="p-4 overflow-auto rounded-4 mb-2 bg-dark text-white"
            >
              <Row>
                {items?.product?.map((data, idx) => (
                  <Col md={8} key={idx}>
                    <Row className="mb-3">
                      <Col sm={4}>
                        <img
                          src={
                            "http://localhost:5000/uploads/" +
                            data?.product?.Image
                          }
                          alt="fotokopi"
                          style={{ width: 100, borderRadius: 5 }}
                        />
                      </Col>
                      <Col sm={8}>
                        <div>
                          <h5>{data?.product?.Title}</h5>
                          <p>
                            <b> {dateFormat(items?.created_at, "dddd, ")}</b>
                            <span>
                              {dateFormat(items.created_at, "d mmmm yyyy ")}
                            </span>{" "}
                          </p>
                          <p>Qty: {data?.qty}</p>
                        </div>
                        <div className="mt-1" style={{ fontSize: 15 }}>
                          <p className="my-1">
                            Price : {Rupiah.convert(data?.subtotal)}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                ))}

                <Col md={4} className="text-center">
                  <img className="w-50" src='https://ibox.co.id/static/logo/iboxlogo2.png' alt="ibox" />
                  <br />
                  <br />
                  <img src={qrCode} alt="" />
                  <div
                    className="text-center w-75 m-auto my-3 fw-semibold"
                    style={{
                      backgroundColor: "rgba(0, 209, 255, .3)",
                      color: "#34a8eb",
                    }}
                  >
                    {items?.status}
                  </div>
                  <div className="text-center w-75 m-auto my-3 fw-normal">
                    Subtotal:{Rupiah.convert(items?.total)}
                  </div>
                </Col>
              </Row>
            </Container>
          ))}
        </div>
      ) : (
        <Col>
          <div className="text-center ">
            <img
              src={nodata}
              className="img-fluid"
              style={{ width: "70%" }}
            />
            <div className=" text-primer">
              No data Transactions, Let's Shopping
            </div>
          </div>
        </Col>
      )}
    </>
  );
}
