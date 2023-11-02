// Dashboard.js
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined, UsergroupAddOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons'
import { Menu } from "antd";
import '../../StylesCSS/antdui.css';
import Home from "./Home";
import ActiveUser from "./ActiveUser";
import AllPosts from "./AllPosts";
import CreateUser from "./CreateUser";

const Dashboard = () => {

  return (
    <div className="maindiv">
      <Header />
      <div className="sidebar">
        <Sidebar />
        <Content />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

function Header() {
  return <div className="header">Header</div>;
}

function Footer() {
  return <div className="footer">
    Footer
    
    </div>;
}

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div>
      <Menu
        onClick={({ key }) => {
          if (key === "/signout") {
            localStorage.clear();
            console.log('user clear');
            navigate('/login');
          } else {
            navigate(key);
          }
        }}
        items={[
          { label: "Home", key: "/dashboard/home", icon: <HomeOutlined /> },
          { label: "User", key: "/dashboard/activeuser", icon: <UserOutlined /> },
          { label: "Get All User", key: "/dashboard/allusers", icon: <UsergroupAddOutlined /> },
          { label: "Create User", key: "/dashboard/adduser", icon: <UserAddOutlined /> },
          { label: "Signout", key: "/signout", icon: <LogoutOutlined /> },
        ]}
      />
    </div>
  );
}

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="home" element={<Home/>} />
        <Route path="activeuser" element={<ActiveUser />} />
        <Route path="allusers" element={<AllPosts />} />
        <Route path="adduser" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
