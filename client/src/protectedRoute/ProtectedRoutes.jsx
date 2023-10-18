import React from "react";
import { Navigate,useLocation } from "react-router-dom";
import { useAppContext } from "../context/Context";
// import { Loading } from "../Components/export";


const ProtectedRoute = ({ children }) => {
  // const { user, userLoading } = useAppContext();

  // if (userLoading) {
  //   return <Loading />
  // }

  // if (!user) {
  //   return <Navigate to="/"  />
  // }

  return children

};

export default ProtectedRoute;
