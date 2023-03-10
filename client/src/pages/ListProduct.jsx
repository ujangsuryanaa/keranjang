import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import DeleteProduct from "../components/modals/DeleteProduct";
import NavAdmin from "../components/NavAdmin";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";

export default function ListProductAdmin() {
  const title = "List Product";
  document.title = "ecommerce | " + title;

  let { data: products, refetch } = useQuery("productCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  console.log(products);
  let navigate = useNavigate();

  //handle Delete
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  //Tooltip Here
  const renderTooltip = (desc) => (
    <Tooltip id="button-tooltip" className="loadDesc">
      {desc}
    </Tooltip>
  );

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete("/product/" + id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  //Update Product
  const handleUpdate = (id) => {
    navigate("/update-product/" + id);
  };

  return (
    <div>
      <NavAdmin />
      <Container className="mt-5 pt-5">
        <h1 className="text-primer my-3">List Product</h1>
        <Table responsive striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Description</th>
              <th colSpan={2} className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <tr>
                <td className="align-middle">{index + 1}</td>
                <td>
                  <img
                    src={item?.image}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                </td>
                <td className="align-middle">{item?.title}</td>
                {/* <td className="align-middle ">{item?.stock}</td> */}
                <td className="align-middle">
                  {convertRupiah.convert(item?.price)}
                </td>
                <td className="align-middle">
                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip(item?.desc)}
                  >
                    <Button className="listAdmin">
                      {item?.desc.slice(0, 15)}...
                    </Button>
                  </OverlayTrigger>
                </td>
                <td className="align-middle">
                  <Button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    type="button"
                    className="buttonList"
                  >
                    Delete
                  </Button>
                </td>
                <td className="align-middle">
                  <>
                    <Button
                      className="buttonList2"
                      onClick={() => {
                        handleUpdate(item.id);
                      }}
                    >
                      Update
                    </Button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <DeleteProduct
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}
