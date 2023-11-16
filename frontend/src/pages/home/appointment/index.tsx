import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, ToggleLeft, ToggleRight, Trash } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
import { format } from "@/lib/utils";

interface Data {
  appointmentId: number;
  appointmentDate: String;
  appointmentTime: String;
  patient: any;
  status: String;
  regFeeStatus: String;
}

interface TreatmentType {
  treatmentTypeId: number;
  treatmentName: string;
  price: number;
}

const Appointments: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [treatmentTypes, setTreatmentTypes] = useState<TreatmentType[]>([]);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const handleCheckboxChange = (treatmentTypeId: number) => {
    setCheckedIds((prevCheckedIds) => {
      if (prevCheckedIds.includes(treatmentTypeId)) {
        // If the checkbox is already checked, remove its ID
        return prevCheckedIds.filter((id) => id !== treatmentTypeId);
      } else {
        // If the checkbox is not checked, add its ID
        return [...prevCheckedIds, treatmentTypeId];
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // appointments
        const appointmentResponse = await fetch(API_URL + "/appointments");
        if (!appointmentResponse.ok) {
          toast.error("Something went wrong");
        }

        const appointments = await appointmentResponse.json();
        setData(appointments);

        // treatment types
        const treatmentTypesResponse = await fetch(
          API_URL + "/treatment-types"
        );
        if (!treatmentTypesResponse.ok) {
          toast.error("Something went wrong");
        }

        const treatmentTypes = await treatmentTypesResponse.json();
        setTreatmentTypes(treatmentTypes);
      } catch (error) {
        console.log(error);
        toast.error("Error occurred when data fetching");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (appointmentId: number) => {
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
      .then(() => {
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
    const response = await fetch(API_URL + "/appointments/" + appointmentId);
    if (!response.ok) {
      toast.error("Something went wrong");
    }

    const appointment = await response.json();

    if (appointment && appointment.status === "PENDING") {
      appointment.status = "COMPLETE";
    } else if (appointment && appointment.status === "COMPLETE") {
      appointment.status = "PENDING";
    }

    delete appointment.appointmentId;
    // update appointment status
    const updatedAppointmentResponse = await fetch(
      API_URL + "/appointments/" + appointmentId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      }
    );
    if (!updatedAppointmentResponse.ok) {
      toast.error("Something went wrong");
    }
    toast.success("Appointment updated successfully");

    const updatedAppointment = await updatedAppointmentResponse.json();

    if (checkedIds.length > 0) {
      // get selected treatment types
      const selectedTreatmentTypesResponse = await fetch(
        API_URL + "/treatment-types/selected",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkedIds),
        }
      );
      if (!selectedTreatmentTypesResponse.ok) {
        toast.error("Something went wrong");
      }

      const selectedTreatmentTypes = await selectedTreatmentTypesResponse.json();

      // create treatment
      const treatmentResponse = await fetch(API_URL + "/treatments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment: updatedAppointment,
          treatmentType: selectedTreatmentTypes,
        }),
      });
      if (!treatmentResponse.ok) {
        toast.error("Something went wrong");
      }
      const treatment = await treatmentResponse.json();

      // create invoice
      const invoicesResponse = await fetch(API_URL + "/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment: updatedAppointment,
          dateIssued: format(new Date()),
          treatment: treatment,
          totalAmount: 0.0,
        }),
      });
      if (!invoicesResponse.ok) {
        toast.error("Something went wrong");
      }

      const invoice = await invoicesResponse.json();
      window.location.href = "/invoices/view/" + invoice.invoiceId;
    }
    const redirectTo = () => {
      window.location.href = "/appointments";
    };
    setTimeout(redirectTo, 1000);
  };

  const handleRegFeeStatus = async (appointmentId: number) => {
    const response = await fetch(API_URL + "/appointments/" + appointmentId);
    if (!response.ok) {
      toast.error("Something went wrong");
    }

    const appointment = await response.json();

    if (appointment && appointment.regFeeStatus === "PENDING") {
      appointment.regFeeStatus = "COMPLETE";
    } else if (appointment && appointment.regFeeStatus === "COMPLETE") {
      appointment.regFeeStatus = "PENDING";
    }

    await fetch(API_URL + "/appointments/" + appointmentId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <p className="bg-gray-200 py-2 px-4 rounded-lg">Filters</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Appointments By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to='by-date'>Appointment Date</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to='by-appointment-id'>Appointment Id</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
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
                <TableCell>{item.appointmentId}</TableCell>
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

                  <AlertDialog>
                    <AlertDialogTrigger>
                      {item.status == "COMPLETE" ? (
                        <ToggleRight className="w-4 h-4" />
                      ) : (
                        <ToggleLeft className="w-4 h-4" />
                      )}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {item.status == "PENDING"
                            ? "Select Treatments"
                            : "Change Status"}
                        </AlertDialogTitle>
                        <div>
                          {item.status == "PENDING" && (
                            <div className="space-y-2">
                              {treatmentTypes.map((item, index) => (
                                <div key={index} className="space-x-2">
                                  <input
                                    className="accent-black"
                                    type="checkbox"
                                    id={item.treatmentName}
                                    checked={checkedIds.includes(
                                      item.treatmentTypeId
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(item.treatmentTypeId)
                                    }
                                  />
                                  <label htmlFor={item.treatmentName}>
                                    {item.treatmentName}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        {item.status == "PENDING" ? (
                          <AlertDialogAction
                            onClick={() =>
                              handleAppointmentStatus(item.appointmentId)
                            }
                          >
                            Complete
                          </AlertDialogAction>
                        ) : (
                          <AlertDialogAction
                            onClick={() =>
                              handleAppointmentStatus(item.appointmentId)
                            }
                          >
                            Pending
                          </AlertDialogAction>
                        )}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
