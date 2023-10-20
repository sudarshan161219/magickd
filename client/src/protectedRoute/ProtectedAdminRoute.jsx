import React from 'react'
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/Context";
// import { Loading } from "../Components/export";


const ProtectedAdminRoute = ({ children }) => {
    // const { admin, adminLoading } = useAppContext();

    // if (adminLoading) {
    //   return <Loading />
    // }

    // if (!admin) {
    //   return <Navigate to="/"  />
    // }

    return children
}

export default ProtectedAdminRoute