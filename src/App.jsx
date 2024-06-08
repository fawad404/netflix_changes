import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newPage/NewUser";
import ProductList from "./pages/productList/productList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Routes with Topbar and Sidebar */}
        <Route
          path="/"
          element={
            user ? 
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Home />
              </div>
            </>
            : <Navigate to="/login"/>
          } 
        />
        <Route
          path="/users"
          element={
            user ? 
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <UserList />
              </div>
            </>
            : <Navigate to="/login"/>
          }
        />
        <Route
          path="/user/:userId"
          element={
            user ? 
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <User />
              </div>
            </>
            : <Navigate to="/login"/>
          }
        />
        <Route
          path="/newUser"
          element={
            user ? 
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <NewUser />
              </div>
            </>
            : <Navigate to="/login"/>
          }
        />
        <Route
          path="/movies"
          element={
            user ? 
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <ProductList />
              </div>
            </>
            : <Navigate to="/login"/>
          }
        />
        <Route
          path="/product/:productId"
          element={
            user ? 
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Product />
              </div>
            </>
            : <Navigate to="/login"/>
          }
        />
        <Route
          path="/newproduct"
          element={
            user ? 
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <NewProduct />
              </div>
            </>
            : <Navigate to="/login"/>
          }
        />
        <Route
          path="/lists"
          element={
            user ? 
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <ListList />
              </div>
            </>
            : <Navigate to="/login"/>
          }
        />
        <Route
          path="/list/:listId"
          element={
            user ? 
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <List />
              </div>
            </>
            : <Navigate to="/login"/>
          }
        />
        <Route
          path="/newList"
          element={
            user ? 
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <NewList />
              </div>
            </>
            : <Navigate to="/login"/>
          }
        />
      </Routes>
      
      {/* Login route without Topbar and Sidebar */}
      <Routes>
  <Route
    path="/login"
    element={user ? <Navigate to="/" /> : <Login />}
  />
</Routes>

    </Router>
  );
}

export default App;
