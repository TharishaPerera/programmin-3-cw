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
  scheduleId: number
  dentist: {
      userId: number
      firstName: string
      lastName: string
  },
  day: string
  startTime: string
  endTime: string
}

const Schedules = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/schedules");
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
    console.log(data)
  }, []);

  const handleDelete = async (id: number) => {
    console.log(id)
    await fetch(API_URL + "/schedules/" + id, {
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
        toast.error("Schedule deleted successfully");
        const redirectTo = () => {
          window.location.href = "/schedules";
        };
        setTimeout(redirectTo, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="w-screen px-28 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-center text-2xl font-semibold">Schedules</h2>
        <div className="space-x-2">
          <Link to="/home">
            <Button className="uppercase">Home</Button>
          </Link>
          {/* <Link to="/patients/create" className="">
            <Button className="uppercase">Create</Button>
          </Link> */}
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of schedules.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Schedule Id</TableHead>
              <TableHead>Dentist Id</TableHead>
              <TableHead>Dentist</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.scheduleId}</TableCell>
                <TableCell>{item.dentist.userId}</TableCell>
                <TableCell>{item.dentist.firstName + " " + item.dentist.lastName}</TableCell>
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.startTime}</TableCell>
                <TableCell>{item.endTime}</TableCell>
                <TableCell className="items-center">
                  <Button
                    // onClick={() => handleEdit(item.appointmentId)}
                    variant="secondary"
                    size="icon"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.scheduleId)}
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

export default Schedules;
