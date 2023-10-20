import { Outlet } from "react-router-dom"

const AdminSharedLayout = () => {
  return (
    <div className="dashboard-page">
      <Outlet />
    </div>
  )
}

export default AdminSharedLayout
