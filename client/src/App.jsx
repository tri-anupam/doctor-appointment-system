import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
//--
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ApplyDoctor = lazy(() => import("./pages/ApplyDoctor"));
const NotificationPage = lazy(() => import("./pages/NotificationPage"));
const Users = lazy(() => import("./pages/admin/Users"));
const Doctors = lazy(() => import("./pages/admin/Doctors"));
const Profile = lazy(() => import("./pages/doctor/Profile"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const Appointments = lazy(() => import("./pages/Appointments"));
const DoctorAppointments = lazy(() =>
  import("./pages/doctor/DoctorAppointments")
);
//--

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          {loading ? (
            <Spinner />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route
                path="/apply-doctor"
                element={
                  <ProtectedRoute>
                    <ApplyDoctor />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/notification"
                element={
                  <ProtectedRoute>
                    <NotificationPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/admin/doctors"
                element={
                  <ProtectedRoute>
                    <Doctors />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/doctor/profile/:id"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/doctor/book-appointment/:doctorId"
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/appointments"
                element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/doctor-appointments"
                element={
                  <ProtectedRoute>
                    <DoctorAppointments />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          )}
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
