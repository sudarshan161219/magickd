import { Routes, Route } from "react-router-dom";
import {
  Navbar, Footer, Blog,
  About,
  Contact,
  Portfolio,
  Register,
  SidebarNav,
  ProfileSideBar,
  InfoProduct,
  PaymentSuccess,
  Page_one,
  Page_two,
  Page_three,
} from "./components/export"
import Main from "./main/Main";
import Explore from "./Explore/Explore";
import ProtectedRoutes from "./protectedRoute/ProtectedRoutes";
import { Profile, SharedLayout, Downloads, Saved } from "./profile/export"
import { Toaster } from "react-hot-toast"


const App = () => {
  return (
    <>
      <Navbar />
      <SidebarNav />
      <ProfileSideBar />
      <Register />
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
        <Route path="/item/:id" element={<InfoProduct />} />
        <Route path="/payment_success" element={<PaymentSuccess />} />
        <Route path="/Terms-and-Conditions" element={<Page_one />} />
        <Route path="/Privacy-Policy" element={<Page_two />} />
        <Route path="/Cookie-Policy" element={<Page_three />} />
        {/* <Route path="/register" element={<Register />} /> */}

        {/* user Protected Routes */}
        <Route
          path="/user-profile"
          element={<ProtectedRoutes>{<SharedLayout />}</ProtectedRoutes>}
        >
          <Route index element={<Profile />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="saved" element={<Saved />} />
        </Route>
        <Route path="*" element={<h1>no page found</h1>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App