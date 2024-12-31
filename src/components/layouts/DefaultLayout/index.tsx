import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import DefaultHeader from "../headers/DefaultHeader";

const DefaultLayout: React.FunctionComponent = () => {
  const location = useLocation();
  const isFullPage = location.pathname === "/geogebra";

  return (
    <>
      <DefaultHeader />
      <div className="main-content">
        <div className={`main-container ${isFullPage ? "full-screen" : ""}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
