import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MenuPage = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-center text-4xl font-semibold">ToothCare</h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Link to="/appointments" className="">
          <Button className="w-full px-20 py-16 uppercase">Appointments</Button>
        </Link>
        <Link to="/patients">
          <Button className="w-full px-20 py-16 uppercase">Patients</Button>
        </Link>
        <Link to="/dentists">
          <Button className="w-full px-20 py-16 uppercase">Dentists</Button>
        </Link>
        <Link to="/schedules">
          <Button className="w-full px-20 py-16 uppercase">Schedules</Button>
        </Link>
        <Link to="/invoices">
          <Button className="w-full px-20 py-16 uppercase">Invoices</Button>
        </Link>
        <Link to="/payments">
          <Button className="w-full px-20 py-16 uppercase">Payments</Button>
        </Link>
      </div>
    </div>
  );
};

export default MenuPage;