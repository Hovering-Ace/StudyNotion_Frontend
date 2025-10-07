import "./App.css";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// React Router
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import OpenRoute from "./components/core/Auth/OpenRoute"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact"
import Dashboard from "./pages/Dashboard"
import Instructor from "./components/core/Dashboard/Instructor"
import MyCourses from "./components/core/Dashboard/MyCourses"
import Error from "./pages/Error"
import MyProfile from "./components/core/Dashboard/MyProfile"
import Settings from "./components/core/Dashboard/Settings"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import { ACCOUNT_TYPE } from "./utils/constants"
import Cart from "./components/core/Dashboard/Cart"
import AddCourse from "./components/core/Dashboard/AddCourse"
import EditCourse from "./components/core/Dashboard/EditCourse"
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import Career from "./components/core/Dashboard/Career"
import Downloader from "./components/core/Dashboard/Career/Download";

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      //  dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inter">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />

        {/* Auth Routes */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* Private (Dashboard) Routes */}
        <Route element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/career" element={<Career />} />
              <Route path="dashboard/career/download" element={<Downloader/>} />
            </>
          )}

          {/* Catch unmatched dashboard routes */}
          <Route path="*" element={<Error />} />

        </Route>


        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>



        {/* Catch unmatched public routes */}
        <Route path="*" element={<Error />} />
      </Routes>


    </div>
  );
}

export default App;
