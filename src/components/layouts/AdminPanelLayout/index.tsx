import { useAppSelector } from "@/hooks/common";
import { selectAuth } from "@/redux/slice/authSlice";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminPanelLayout: React.FunctionComponent = () => {
  const { isLogin } = useAppSelector(selectAuth);

  return <div>{isLogin ? <Outlet /> : <Navigate to={"/login"} />}</div>;
};

export default AdminPanelLayout;
