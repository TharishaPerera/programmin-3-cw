import AppointmentForm from "@/components/forms/AppointmentForm";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/config";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateAppointment = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/appointments/" + id);
        if (!response.ok) {
          toast.error("Something went wrong");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
        toast.error("Error occurred when data fetching");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen px-28 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-center text-2xl font-semibold">Update Appointment</h2>
        <Link to="/appointments" className="">
          <Button className="uppercase">Back</Button>
        </Link>
      </div>
      <div>
        <AppointmentForm data={data} />
      </div>
    </div>
  );
};

export default UpdateAppointment;
