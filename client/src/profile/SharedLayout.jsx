import { Outlet } from "react-router-dom";
import { ProfileSideBar } from "../components/export"
const SharedLayout = () => {
  return (
        <div className="dashboard-page">
          <Outlet />
          <ProfileSideBar />
        </div>
  );
};

export default SharedLayout;
