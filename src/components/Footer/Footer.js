import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-light text-dark mt-5 pt-4 pb-4">
      <Container>
        <Row>
          <Col md={4} sm={12} className="mb-3">
            <img
              src="/logo.png"
              alt="News Portal Logo"
              style={{ width: "50px", height: "auto" }}
              className="d-inline-block align-top"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et
              metus.
            </p>
          </Col>

          <Col md={2} sm={6} className="mb-3">
            <h5 className="text-uppercase footer-heading">Navigation</h5>{" "}
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-dark text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/news" className="text-dark text-decoration-none">
                  Latest News
                </a>
              </li>
              <li>
                <a href="/events" className="text-dark text-decoration-none">
                  Events
                </a>
              </li>
              <li>
                <a href="/contact" className="text-dark text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <h5 className="text-uppercase footer-heading">Help</h5>{" "}
            <ul className="list-unstyled">
              <li>
                <a
                  href="/customer-support"
                  className="text-dark text-decoration-none"
                >
                  Customer Support
                </a>
              </li>
              <li>
                <a
                  href="/delivery-details"
                  className="text-dark text-decoration-none"
                >
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="/terms" className="text-dark text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-dark text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3} sm={12} className="mb-3">
            <h5 className="text-uppercase footer-heading">Newsletter</h5>{" "}
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="w-100"
                />
              </Form.Group>
              <Button
                style={{ backgroundColor: "#042b53", borderColor: "#042b53" }}
                type="submit"
                className="mt-2 w-100"
              >
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} News Portal. All Rights
              Reserved.
              <a href="/terms" className="ml-2 text-dark text-decoration-none">
                Terms of Service
              </a>{" "}
              |
              <a
                href="/privacy"
                className="ml-2 text-dark text-decoration-none"
              >
                Privacy Policy
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
