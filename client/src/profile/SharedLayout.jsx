import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
        <div className="dashboard-page">
          <Outlet />
        </div>
  );
};

export default SharedLayout;
