import { Routes, Route } from "react-router-dom";
import {
  Navbar, Footer, Blog,
  About,
  Contact,
  Portfolio,
  Register,
  SidebarNav,
  ProfileSideBar
} from "./components/export"
import Main from "./main/Main";
import Explore from "./Explore/Explore";
import ProtectedRoutes from "./protectedRoute/ProtectedRoutes";
import ProtectedAdminRoute from "./protectedRoute/ProtectedAdminRoute";
import { Profile, SharedLayout, Downloads, Saved } from "./profile/export"
import { AdminSharedLayout, Auth, Panel } from "./adminpanel/export"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
      <Navbar />
      <SidebarNav />
      <ProfileSideBar />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/Portfolio" element={<Portfolio />} />
        <Route path="/ContactUs" element={<Contact />} />
        <Route path="/register" element={<Register />} />

        {/* user Protected Routes */}
        <Route
          path="/user-profile"
          element={<ProtectedRoutes>{<SharedLayout />}</ProtectedRoutes>}
        >
          <Route index element={<Profile />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="saved" element={<Saved />} />
        </Route>


        {/* Admin Protected Route */}
        <Route
          path="admin/9902576816064162248089752424640"
          element={<ProtectedAdminRoute>{< AdminSharedLayout />}</ProtectedAdminRoute>}
        >
          <Route path="36211454745473623543649735436497/auth" element={<Auth />} />
          <Route path="43404787354362343955343952478723/panel" element={<Panel />} />
        </Route>

      </Routes>
      <Footer />
    </>
  )
}

export default App