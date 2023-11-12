import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/Login/index";
import MenuPage from "@/pages/home/menu";
import LandingPage from "@/pages/LandingPage";
import Appointments from "@/pages/home/appointment";
import CreateAppointment from "@/pages/home/appointment/create";
import { Toaster } from "sonner";
import UpdateAppointment from "./pages/home/appointment/update";
import Dentists from "./pages/home/dentist";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-neutral-100 min-h-screen">
        <Routes>
          <Route path="/login" element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="home" element={<MenuPage />} />
            {/* Appointments */}
            <Route path="/appointments">
              <Route index element={<Appointments />} />
              <Route path="create" element={<CreateAppointment />} />
              <Route path="update/:id" element={<UpdateAppointment />} />
            </Route>
            {/* Dentists */}
            {/* <Route path="/dentists">
              <Route index element={<Dentists />} />
              <Route path="create" element={<CreateAppointment />} />
              <Route path="update/:id" element={<UpdateAppointment />} />
            </Route> */}
          </Route>
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
