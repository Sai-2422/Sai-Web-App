import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

// App Pages
import Utils from "./pages/appPages/Utils/Utils";
import About from "./pages/appPages/About/About";
import Footer from "./pages/appPages/Footer/footer";
import Contact from "./pages/appPages/Contact/Contact";
import Carousel from "./pages/appPages/Carousel/Carousel";
import Capacity from "./pages/appPages/Calculator/Capacity";
import CustomNavbar from "./pages/appPages/Navbar/CustomNavbar";
import SignUpForm from "./pages/authPages/userPages/SignUp/SignUpForm";
import SignInForm from "./pages/authPages/userPages/SignIn/SignInForm";

//Admin Pages
import UserList from "./components/UesrList/UserList";
import ProductList from "./components/Products/ProductList";
import NotFoundPage from "./pages/appPages/PageNotFound/PageNotFound";
import ProductDesc from "./pages/productPages/ProductCardForUser/ProductDesc";
import UserDetails from "./pages/authPages/userPages/UserDetails/UserDetails";
import UpdateProfile from "./pages/authPages/userPages/UpdateProfile/UpdateProfile";
import UpdatePassword from "./pages/authPages/userPages/UpdatePassword/UpdatePassword";
import ResetPasswordOtp from "./pages/authPages/userPages/ForgetPassword/OTP/ResetPasswordOtp";
import UpdateUserByAdmin from "./pages/authPages/adminPages/UpdateUserByAdmin/UpdateUserByAdmin";
import ResetPasswordToken from "./pages/authPages/userPages/ForgetPassword/Token/ResetPasswordToken";
import UserDetailsForAdmin from "./pages/authPages/adminPages/UserDetailsForAdmin/UserDetailsForAdmin";

//Customer Pages
import OrdersList from "./components/OrderList/OrderList";
import HsrpOrderForm from "./pages/customerPages/CreateHsrpOrder/AddOrder";
import VehiclePassing from "./pages/customerPages/VehiclePassing/VehiclePassing";
import OrderDetailsForAdmin from "./pages/customerPages/OrderDetails/OrderDetails";

// Product Pages
import AddProduct from "./pages/productPages/AddProduct/AddNewProduct";
import ProductListForAdmin from "./components/Products/ProductListForAdmin";
import UpdateProductByAdmin from "./pages/productPages/UpdateProductByAdmin/UpdateProductByAdmin";
import ProductDetailsForAdmin from "./pages/productPages/ProductDetailsForAdmin/ProductDetailsForAdmin";

// Internship Pages
import InternsList from "./components/InternsList/InternsList";
import InternshipList from "./components/InternshipList/InternshipList";
import InternDetail from "./pages/studentPages/InternDetails/InternDetails";
import AddInternship from "./pages/studentPages/AddInternship/AddInternship";
import UpdateInternship from "./pages/studentPages/UpdateInternship/UpdateInternship";
import InternshipListForAdmin from "./components/InternshipList/InternshipListForAdmin";
import InternshipForm from "./pages/studentPages/InternshipApplyForm/InternshipApplyForm";
import ApprenticeshipForm from "./pages/studentPages/ApprenticeshipIndia/apprenticeship";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <header>
        <CustomNavbar />
      </header>
      <Routes>
        <Route path="/" element={<Carousel />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* Utils */}
        <Route path="/utils">
          <Route path="" element={<Utils />} />
          <Route path="capacity" element={<Capacity />} />
          <Route path="price-calculator" element={<Calculator />} />
        </Route>
        {/* Users */}
        <Route path="/user">
          <Route path="sign-up" element={<SignUpForm />} />
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="profile" element={<UserDetails />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route path="reset-password" element={<ResetPasswordOtp />} />
          <Route
            path="reset-password/:token"
            element={<ResetPasswordToken />}
          />
        </Route>
        <Route path="/admin">
          {/* Hsrp Order */}
          <Route path="hsrp-order" element={<OrdersList />} />
          <Route
            path="order-details/:orderId"
            element={<OrderDetailsForAdmin />}
          />

          {/* User */}
          <Route path="users" element={<UserList />} />
          <Route
            path="user-details/:userId"
            element={<UserDetailsForAdmin />}
          />
          <Route path="update-user/:userId" element={<UpdateUserByAdmin />} />

          {/* Internships */}
          <Route path="interns" element={<InternsList />} />
          <Route path="add-internship" element={<AddInternship />} />
          <Route path="internships" element={<InternshipListForAdmin />} />
          <Route path="intern-details/:internId" element={<InternDetail />} />
          <Route
            path="update-internship/:internId"
            element={<UpdateInternship />}
          />

          {/* Products */}
          <Route path="products" element={<ProductListForAdmin />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route
            path="product-details/:productId"
            element={<ProductDetailsForAdmin />}
          />
          <Route
            path="update-product/:productId"
            element={<UpdateProductByAdmin />}
          />
        </Route>
        <Route path="/products">
          <Route path="" element={<ProductList />} />
          <Route path="detail/:productId" element={<ProductDesc />} />
        </Route>
        <Route path="/customer">
          <Route path="post-hsrp-order" element={<HsrpOrderForm />} />
          <Route path="passing" element={<VehiclePassing />} />
        </Route>
        <Route path="/edu">
          <Route path="" element={<ProductList />} />
          <Route path="apprenticeship" element={<ApprenticeshipForm />} />
          <Route path="internship/apply" element={<InternshipForm />} />
          <Route path="internship/info" element={<InternshipList />} />
        </Route>
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
