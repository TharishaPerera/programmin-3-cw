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
import { Edit, Eye, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Data {
  invoiceId: number;
  appointment: {
    appointmentId: number;
    appointmentDate: string;
    appointmentTime: string;
    patient: {
      userId: number;
      firstName: string;
      lastName: string;
      email: string;
      mobile: number;
    };
    status: string;
    regFeeStatus: string;
  };
  dateIssued: string;
  treatment: {
    treatmentId: number;
    treatmentType: [
      {
        treatmentTypeId: number;
        treatmentName: string;
        price: number;
      }
    ];
  };
  totalAmount: number;
}

const Invoices = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/invoices");
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

  const handleView = (invoiceId: number) => {
    window.location.href = "invoices/view/" + invoiceId;
  };

  return (
    <div className="w-screen px-28 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-center text-2xl font-semibold">Invoices</h2>
        <div className="space-x-2">
          <Link to="/home">
            <Button className="uppercase">Home</Button>
          </Link>
          {/* <Link to="/dentist/create" className="">
            <Button className="uppercase">Create</Button>
          </Link> */}
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of Invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Appointment Id</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Patient Mobile</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.invoiceId}</TableCell>
                <TableCell>{item?.appointment?.appointmentId}</TableCell>
                <TableCell>{item?.dateIssued}</TableCell>
                <TableCell>
                  {item?.appointment?.patient?.firstName +
                    " " +
                    item?.appointment?.patient?.lastName}
                </TableCell>
                <TableCell>{item?.appointment?.patient?.mobile}</TableCell>
                <TableCell>{item?.totalAmount}</TableCell>
                <TableCell className="items-center">
                  <Button
                    onClick={() => handleView(item.invoiceId)}
                    variant="secondary"
                    size="icon"
                  >
                    <Eye className="w-4 h-4" />
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

export default Invoices;
