import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/Context";
import styles from "./index.module.css"
import loading from "../assets/loading.svg"


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();

  if (userLoading) {
    return (
      <div className={styles.loadingContainer}>
        <img className={styles.img} src={loading} alt="loading" />
      </div>
    )
  }

  if (!user || user === null) {
    return <Navigate to="/" />
  }

  return children

};

export default ProtectedRoute;
