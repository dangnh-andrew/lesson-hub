import React from "react";
import { Outlet } from "react-router-dom";

const AdminPanelLayout: React.FunctionComponent = () => {
  return (
    <>
      <Outlet/>
    </>
  );
};

export default AdminPanelLayout;