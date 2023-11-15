import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { API_URL } from "@/config/config";
import { format } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
      address: string;
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

interface Payment {
  invoice: Data;
  amount: number;
  date: string;
  paymentMethod: string;
  paymentStatus: string;
}

const ViewInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Data>();
  const [payment, setPayment] = useState<Payment>();
  const [selectedValue, setSelectedValue] = useState<string>("");

  console.log("rendering")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceResponse = await fetch(API_URL + "/invoices/" + id);
        if (!invoiceResponse.ok) {
          toast.error("Something went wrong");
        }

        const invoice = await invoiceResponse.json();
        setData(invoice);
      } catch (error) {
        console.log(error);
        toast.error("Error occurred when data fetching");
      }
    };

    const fetchPayment = async () => {
      if (data?.appointment) {
        try {
          console.log("inside if");
          const paymentResponse = await fetch(
            API_URL + "/payments/" + data?.appointment.appointmentId
          );
          if (!paymentResponse.ok) {
            toast.error("Something went wrong");
          }
          const payment = await paymentResponse.json();
          if (payment) {
            setPayment(payment);
          }
        } catch (error) {
          console.log(error);
          toast.error("Error occurred when data fetching");
        }
      }
    };

    fetchData();
    fetchPayment();
  }, []);

  console.log(data)
  const handlePayment = async () => {
    // create payment
    try {
      const paymentResponse = await fetch(API_URL + "/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoice: data,
          amount: data?.totalAmount,
          date: format(new Date()),
          paymentMethod: selectedValue,
          paymentStatus: "PAID",
        }),
      });
      if (!paymentResponse.ok) {
        toast.error("Something went wrong");
      }

      const payment = await paymentResponse.json();
      setPayment(payment);

      toast.success("Payment updated successfully");
      const redirectTo = () => {
        window.location.href = '/payments';
      };
      setTimeout(redirectTo, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while accepting payment");
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-screen px-28 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-center text-2xl font-semibold">
          Invoice: {data?.invoiceId}
        </h2>
        <div className="space-x-2">
          <Link to="/invoices">
            <Button className="uppercase">Back</Button>
          </Link>
          <Button onClick={handlePrint} className="uppercase">
            Print
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 shadow-md rounded-md">
          <div className="text-md font-semibold tracking-wide">APPOINTMENT</div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="font-medium">Appointment Id</div>
            <div>: {data?.appointment.appointmentId}</div>

            <div className="font-medium">Appointment Date</div>
            <div>: {data?.appointment.appointmentDate}</div>

            <div className="font-medium">Appointment Time</div>
            <div>: {data?.appointment.appointmentTime}</div>

            <div className="font-medium">Appointment Status</div>
            <div>: {data?.appointment.status}</div>

            <div className="font-medium">Registration Fee Rs.1000.00</div>
            <div>: {data?.appointment.regFeeStatus}</div>
          </div>
        </div>

        <div className="p-6 shadow-md rounded-md row-span-2">
          <div className="text-md font-semibold tracking-wide">INVOICE</div>
          <div className="flex text-xl justify-between items-center">
            <div className=" font-semibold tracking-wide">
              AMOUNT TO BE PAID:
            </div>
            <div className="justify-end items-center font-bold">
              Rs. {data?.totalAmount}
            </div>
          </div>
          <Separator className="my-7 border" />
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="font-medium">Invoice Issued Date</div>
            <div>: {data?.dateIssued}</div>

            <div className="font-medium col-span-2 text-center my-4">
              TREATMENTS
            </div>

            {data?.treatment.treatmentType.map((treatment, index) => (
              <div key={index} className="col-span-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="font-medium">{treatment.treatmentName}</div>
                  <div>: Rs. {treatment.price}</div>
                </div>
              </div>
            ))}

            <Separator className="my-4 border col-span-2" />

            <div className="font-medium">Registration Fee</div>
            <div>: Rs. 1000</div>

            <Separator className="my-4 border col-span-2" />

            <div className="font-medium">Total</div>
            <div>: Rs. {data?.totalAmount}</div>

            <Separator className="my-4 border col-span-2" />

            <div className="col-span-2 flex justify-between items-center">
              <div className="font-medium">Payment</div>
              <div>
                {payment?.paymentStatus == "PAID" ? (
                  <div className="font-medium border-2 border-gray-700 px-8 py-1 rounded-lg">
                    PAID
                  </div>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger className="bg-black text-white px-4 py-1 rounded-md">
                      Receive Payment
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Payment method</AlertDialogTitle>
                        <div className="flex items-center space-x-10">
                          <label className="flex items-center">
                            <input
                              className="accent-black"
                              type="radio"
                              value="CASH"
                              checked={selectedValue === "CASH"}
                              onChange={handleRadioChange}
                            />
                            Cash Payment
                          </label>

                          <label>
                            <input
                              className="accent-black"
                              type="radio"
                              value="CARD"
                              checked={selectedValue === "CARD"}
                              onChange={handleRadioChange}
                            />
                            Card Payment
                          </label>
                        </div>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePayment}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 shadow-md rounded-md">
          <div className="text-md font-semibold tracking-wide">PATIENT</div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="font-medium">Patient Name</div>
            <div>
              :{" "}
              {data?.appointment.patient.firstName +
                " " +
                data?.appointment.patient.lastName}
            </div>

            <div className="font-medium">Email Address</div>
            <div>: {data?.appointment.patient.email}</div>

            <div className="font-medium">Contact Number</div>
            <div>: {data?.appointment.patient.mobile}</div>

            <div className="font-medium">Address</div>
            <div>: {data?.appointment.patient.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoice;
