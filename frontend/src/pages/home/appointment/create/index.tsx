import AppointmentForm from "@/components/forms/AppointmentForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CreateAppointment = () => {
  return (
    <div className="w-screen px-28 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-center text-2xl font-semibold">Create Appointment</h2>
        <Link to="/appointments" className="">
          <Button className="uppercase">Back</Button>
        </Link>
      </div>
      <div>
        <AppointmentForm />
      </div>
    </div>
  );
};

export default CreateAppointment;
