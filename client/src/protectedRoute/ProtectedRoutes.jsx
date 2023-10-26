import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/Context";
// import { Loading } from "../Components/export";


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();

  if (userLoading) {
    return <h1>Loading...</h1>
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return children

};

export default ProtectedRoute;
