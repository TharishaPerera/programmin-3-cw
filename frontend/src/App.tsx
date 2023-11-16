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
import Patients from "./pages/home/patients";
import Schedules from "./pages/home/schedules";
import Invoices from "./pages/home/invoices";
import ViewInvoice from "./pages/home/invoices/view";
import Payment from "./pages/home/payments";
import AppointmentsByDate from "./pages/home/appointment/byDate";
import AppointmentsById from "./pages/home/appointment/byId";

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
              <Route path="by-date" element={<AppointmentsByDate />} />
              <Route path="by-appointment-id" element={<AppointmentsById />} />
            </Route>
            {/* Dentists */}
            <Route path="/dentists">
              <Route index element={<Dentists />} />
              <Route path="create" element={<CreateAppointment />} />
              <Route path="update/:id" element={<UpdateAppointment />} />
            </Route>
            {/* Patients */}
            <Route path="/patients">
              <Route index element={<Patients />} />
              <Route path="create" element={<CreateAppointment />} />
              <Route path="update/:id" element={<UpdateAppointment />} />
            </Route>
            {/* Schedules */}
            <Route path="/schedules">
              <Route index element={<Schedules />} />
              <Route path="create" element={<CreateAppointment />} />
              <Route path="update/:id" element={<UpdateAppointment />} />
            </Route>
            {/* Invoices */}
            <Route path="/invoices">
              <Route index element={<Invoices />} />
              <Route path="view/:id" element={<ViewInvoice />} />
            </Route>
            {/* Payments */}
            <Route path="/payments">
              <Route index element={<Payment />} />
              <Route path="view/:id" element={<ViewInvoice />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
