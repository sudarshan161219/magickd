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
import SharedLayout from "./profile/SharedLayout"
import Profile from "./profile/Profile"
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

        {/* Protected Routes */}
        <Route
          path="/user-profile"
          element={<ProtectedRoutes>{<SharedLayout />}</ProtectedRoutes>}
        >
          <Route path="/user-profile" element={<Profile />} />
        </Route>


      </Routes>
      <Footer />
    </>
  )
}

export default App