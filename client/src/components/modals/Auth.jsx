import React, { useContext, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/useContext";

export default function NavAuth() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => (setShow(false), setMessage(null));

  const [shows, setShows] = useState(false);
  const handleShows = () => setShows(true);
  const handleCloses = () => (setShows(false), setMessages(null));

  const switchLogin = () => {
    setShow(true);
    setShows(false);
  };

  const switchRegister = () => {
    setShows(true);
    setShow(false);
  };

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState(null);

  //login
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      console.log(body);
      const response = await API.post("/login", body, config);

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        if (response.data.data.status === "admin") {
          navigate("/transaction");
        } else {
          navigate("/");
        }
      }
      console.log(response);
    } catch (error) {
      const alert = <Alert variant="danger">Login Failed</Alert>;
      setMessage(alert);
      console.log(error);
    }
  });

  //register
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChangeRegister = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(register);
      console.log(body);
      await API.post("/register", body, config);

      const alert = <Alert variant="success">Register Success</Alert>;
      setMessages(alert);
    } catch (error) {
      const alert = <Alert variant="danger">Register Failed</Alert>;
      setMessages(alert);
      console.log(error);
    }
  });

  return (
    <div>
      <Button className="me-2" variant="outline-primary" onClick={handleShow}>
        Login
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="bg-dark">
          <h1 className="text-center mb-4 text-white">Login</h1>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            {message && message}
            <Form.Control
              className="mb-3 bg-dark text-white"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <Form.Control
              className="mb-3 bg-dark text-white"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Button type="submit" className="w-100 mb-3" variant="outline-primary">
              Submit
            </Button>
          </Form>
          <p className="text-white">
            Don't have an account? Klik{" "}
            <strong className="text-white" onClick={switchRegister}>
              Register
            </strong>
          </p>
        </Modal.Body>
      </Modal>

      <Button className="me-5" variant="outline-danger" onClick={handleShows}>
        Register
      </Button>
      <Modal show={shows} onHide={handleCloses}>
        <Modal.Body className='bg-dark'>
          <h1 className="text-center text-white mb-4">Register</h1>
          <Form onSubmit={(e) => handleSubmitRegister.mutate(e)}>
            {messages && messages}
            <Form.Control
              className="mb-3 text-white bg-dark"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChangeRegister}
            />
            <Form.Control
              className="mb-3 text-white bg-dark"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChangeRegister}
            />
            <Form.Control
              className="mb-3 text-white bg-dark"
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              onChange={handleChangeRegister}
            />
            <Button type="submit" className="w-100 mb-3" variant="outline-primary">
              Submit
            </Button>
          </Form>
          <p className="text-white">
            Already Have an Account? Klik{" "}
            <strong className="text-white" onClick={switchLogin}>
              Login
            </strong>
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
