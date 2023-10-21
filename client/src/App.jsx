import { Routes, Route } from "react-router-dom";
import {
  Navbar, Footer, Blog,
  About,
  Contact,
  Portfolio,
  Register,
  SidebarNav,
  ProfileSideBar,
  AddItem,
  Users,
  MyItems,
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
          path="admin/99025773623568154745460635436441622443649708975362114242464"
          element={<ProtectedAdminRoute>{< AdminSharedLayout />}</ProtectedAdminRoute>}
        >
          <Route index element={<Panel />} />
          <Route path="auth" element={<Auth />} />
          <Route path="add_item" element={<AddItem />} />
          <Route path="users" element={<Users />} />
          <Route path="my_Item" element={<MyItems />} />

        </Route>

      </Routes>
      <Footer />
    </>
  )
}

export default App