import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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

interface Data {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  userType: string;
  address: string;
  dob: string;
}

const Patients = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/patients");
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

  const handleDelete = async (userId: number) => {
    await fetch(API_URL + "/patients/" + userId, {
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
      .then(() => {
        toast.error("Patient deleted successfully");
        const redirectTo = () => {
          window.location.href = "/patients";
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
        <h2 className="text-center text-2xl font-semibold">Patients</h2>
        <div className="space-x-2">
          <Link to="/home">
            <Button className="uppercase">Home</Button>
          </Link>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of patients.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>address</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.firstName + " " + item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.dob}</TableCell>
                <TableCell className="items-center">
                  <Button
                    // onClick={() => handleEdit(item.appointmentId)}
                    variant="secondary"
                    size="icon"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.userId)}
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

export default Patients;
