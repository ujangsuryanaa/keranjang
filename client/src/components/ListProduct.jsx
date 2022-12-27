import React from "react";
import { Card } from "react-bootstrap";

import convertRupiah from "rupiah-format";

export default function ListProduct({ item }) {
  return (
    <div style={{paddingBottom:'30px'}}>
      <Card.Title className="fw-bold text-black text-center">{item.title}</Card.Title>
      <hr style={{color:'black'}} />
        <Card.Img
          variant="top"
          src={item.image}
          className="imageProduct fluid"
        />
        <hr style={{color:'black'}} />
        <Card.Body>
          <Card.Text className="m-0 text-black text-center">
            {convertRupiah.convert(item.price)}
          </Card.Text>
        </Card.Body>
    </div>
  );
}
