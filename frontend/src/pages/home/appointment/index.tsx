import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_URL } from "@/config/config";
import { Edit, ToggleLeft, ToggleRight, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Data {
  appointmentId: number;
  appointmentDate: String;
  appointmentTime: String;
  patient: any;
  status: String;
  regFeeStatus: String;
}

const Appointments: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/appointments");
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

  const handleDelete = async (appointmentId: number) => {
    console.log(appointmentId);
    await fetch(API_URL + "/appointments/" + appointmentId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Delete successful:", data);
        toast.error("Appointment deleted successfully");
        const redirectTo = () => {
          window.location.href = "/appointments";
        };
        setTimeout(redirectTo, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong");
      });
  };

  const handleAppointmentStatus = async (appointmentId: number) => {
    console.log(appointmentId);
    const response = await fetch(API_URL + "/appointments/" + appointmentId);
    if (!response.ok) {
      toast.error("Something went wrong");
    }

    const appointment = await response.json();
    console.log(appointment);

    if (appointment && appointment.status === "PENDING") {
      appointment.status = "COMPLETE";
    } else if (appointment && appointment.status === "COMPLETE") {
      appointment.status = "PENDING";
    }
    
    await fetch(API_URL + "/appointments/" + appointmentId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Appointment update successful:", data);
        toast.error("Appointment updated successfully");
        const redirectTo = () => {
          window.location.href = "/appointments";
        };
        setTimeout(redirectTo, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong");
      });
  };

  const handleRegFeeStatus = async (appointmentId: number) => {
    console.log(appointmentId);
    const response = await fetch(API_URL + "/appointments/" + appointmentId);
    if (!response.ok) {
      toast.error("Something went wrong");
    }

    const appointment = await response.json();
    console.log(appointment);
    
    if (appointment && appointment.regFeeStatus === "PENDING") {
      appointment.regFeeStatus = "COMPLETE";
    } else if(appointment && appointment.regFeeStatus === "COMPLETE") { 
      appointment.regFeeStatus = "PENDING";
    }
    
    await fetch(API_URL + "/appointments/" + appointmentId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Appointment update successful:", data);
        toast.error("Appointment updated successfully");
        const redirectTo = () => {
          window.location.href = "/appointments";
        };
        setTimeout(redirectTo, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong");
      });
  };

  const handleEdit = async (appointmentId: number) => {
    window.location.href = "appointments/update/" + appointmentId;
  };

  return (
    <div className="w-screen px-28 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-center text-2xl font-semibold">Appointments</h2>
        <div className="space-x-2">
          <Link to="/home">
            <Button className="uppercase">Home</Button>
          </Link>
          <Link to="/appointments/create">
            <Button className="uppercase">Create</Button>
          </Link>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Patient Mobile</TableHead>
              <TableHead>Appointment Status</TableHead>
              <TableHead>Registration Fee</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.appointmentDate}</TableCell>
                <TableCell>{item.appointmentTime}</TableCell>
                <TableCell>
                  {item.patient.firstName + " " + item.patient.lastName}
                </TableCell>
                <TableCell>{item.patient.mobile}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.regFeeStatus}</TableCell>
                <TableCell className="items-center">
                  <Button
                    onClick={() => handleEdit(item.appointmentId)}
                    variant="secondary"
                    size="icon"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleAppointmentStatus(item.appointmentId)}
                    variant="secondary"
                    size="icon"
                  >
                    {item.status == "COMPLETE" ? (
                      <ToggleRight className="w-4 h-4" />
                    ) : (
                      <ToggleLeft className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    onClick={() => handleRegFeeStatus(item.appointmentId)}
                    variant="secondary"
                    size="icon"
                  >
                    {item.regFeeStatus == "COMPLETE" ? (
                      <ToggleRight className="w-4 h-4" />
                    ) : (
                      <ToggleLeft className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.appointmentId)}
                    variant="secondary"
                    size="icon"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Appointments;
