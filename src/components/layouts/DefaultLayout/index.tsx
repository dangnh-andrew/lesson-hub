import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import DefaultHeader from "../headers/DefaultHeader";
import { useAppSelector } from "@/hooks/common";
import { selectAuth } from "@/redux/slice/authSlice";

const DefaultLayout: React.FunctionComponent = () => {
  const location = useLocation();
  const isFullPage = location.pathname === "/geogebra";
  const { isLogin } = useAppSelector(selectAuth);

  return (
    <>
      <DefaultHeader />
      <div className="main-content">
        <div className={`main-container ${isFullPage ? "full-screen" : ""}`}>
          {/* {isLogin ? <Outlet /> : <Navigate to="/login" />} */}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
