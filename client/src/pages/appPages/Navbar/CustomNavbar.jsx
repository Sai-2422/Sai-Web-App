import React from "react";
import {
  Button,
  ButtonGroup,
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Image,
} from "react-bootstrap";
import { NavLink, Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logOut } from "../../../redux/reducers/authReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";
const saiNavLogo =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082839/SAI%20WebApp/saiNavLogo.png";
const CustomNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isAuthenticated = Boolean(user);

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Logout successful");
    window.location.href = "/";
  };

  const profileImageSrc = user?.profileImg || defaultProfileImage;

  const firstName = user?.name.split(" ")[0];
  const userRole = user?.role;

  return (
    <>
      <Navbar
        bg="body-tertiary"
        expand="lg"
        sticky="top"
        style={{ zIndex: 1000 }}
      >
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            <Image
              src={saiNavLogo}
              alt="Navbar Logo"
              roundedCircle
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link as={NavLink} to="/" activeClassName="active">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products" activeClassName="active">
                Products
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about-us" activeClassName="active">
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact-us" activeClassName="active">
                Contact
              </Nav.Link>
              {isAuthenticated && userRole === "admin" && (
                <NavDropdown title="Admin" id="admin-dropdown">
                  <NavDropdown.Item as={NavLink} to="/admin/hsrp-order">
                    Get All HSRP Order
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/admin/add-internship">
                    Add New Internship
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/admin/internships">
                    Get All Internships
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/admin/add-product">
                    Add New Product
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/admin/products">
                    Get All Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/admin/interns">
                    Get All Interns
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/admin/users">
                    Get All Users
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as="a"
                    href="https://forms.gle/JFEtEx3Y6cEemycb7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Registration
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {isAuthenticated && userRole === "customer" && (
                <NavDropdown title="Customer" id="customer-dropdown">
                  <NavDropdown.Item as={NavLink} to="/customer/post-hsrp-order">
                    Apply HSRP Plate
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/customer/passing">
                    Vehicle Passing
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {isAuthenticated && userRole === "student" && (
                <NavDropdown title="Students" id="students-dropdown">
                  <NavDropdown.Item as={NavLink} to="/edu/apprenticeship">
                    Apprenticeship
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/edu/internship/apply">
                    Apply InternShip
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/edu/internship/info">
                    Available Internship
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <ButtonGroup className="ms-3 me-3">
              {isAuthenticated ? (
                <div className="d-flex justify-content-between align-items-center">
                  <span className="me-2">Welcome, {firstName}!</span>{" "}
                  <NavDropdown
                    title={
                      <Image
                        src={profileImageSrc}
                        roundedCircle
                        style={{ width: 30, height: 30 }}
                      />
                    }
                    id="profile-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item as={NavLink} to="/user/profile">
                      View Details
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/user/update-password">
                      Update Password
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/user/update-profile">
                      Update Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <>
                  <Link to="/user/sign-up">
                    <Button variant="primary">Sign Up</Button>
                  </Link>
                  <Link to="/user/sign-in">
                    <Button variant="primary" className="ms-2">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </ButtonGroup>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default CustomNavbar;
