import React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn, format } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { API_URL } from "@/config/config";

const AppointmentSchema = z.object({
  date: z.string().optional(),
  time: z.string().min(1, "Please select time"),
  regFeeStatus: z.string().optional(),
  firstName: z.string().min(1, "Please enter first name"),
  lastName: z.string().min(1, "Please enter last name"),
  email: z.string().min(1, "Please enter email address").email(),
  mobile: z.string().min(10, "Telephone number must have 10 digits"),
  address: z.string().min(1, "Please enter address"),
  dob: z.string().optional(),
});

type AppointmentSchemaType = z.infer<typeof AppointmentSchema>;

interface AppointmentForm {
  appointmentId?: number; 
}

interface Props {
  data?: object
}

const AppointmentForm: React.FC<Props> = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentSchemaType>({
    resolver: zodResolver(AppointmentSchema),
  });
  const [appointmentDate, setAppointmentDate] = React.useState<Date>();
  const [dob, setDob] = React.useState<Date>();

  const onSubmit: SubmitHandler<AppointmentSchemaType> = async (data) => {
    data.date = appointmentDate?.toISOString().substring(0, 10);
    data.dob = dob?.toISOString().substring(0, 10);

    try {
      // first create patient
      const patientResponse = await fetch(API_URL + "/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          mobile: data.mobile,
          userType: "PATIENT",
          address: data.address,
          dob: data.dob,
        }),
      });
      if (!patientResponse.ok) {
        toast.error("Something went wrong");
      }

      const patient = await patientResponse.json();

      // then create the appointment
      const appointmentResponse = await fetch(API_URL + "/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentDate: data.date,
          appointmentTime: data.time,
          patient: patient,
          status: "PENDING",
          regFeeStatus: data.regFeeStatus,
        }),
      });
      if (!appointmentResponse.ok) {
        toast.error("Something went wrong");
      }
      toast.success("Appointment created successfully");
      const redirectTo = () => {
        window.location.href = "/appointments";
      };
      setTimeout(redirectTo, 1000);
    } catch (error) {
      toast.error("Error occurred when creating the appointment");
      const redirectTo = () => {
        window.location.href = "/appointments/create";
      };
      setTimeout(redirectTo, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-3 gap-6">
        <div className="w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !appointmentDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {appointmentDate ? (
                  format(appointmentDate)
                ) : (
                  <span>Appointment date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={appointmentDate}
                onSelect={setAppointmentDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors?.date?.message && (
            <div className="text-red-500 text-sm">{errors.date.message}</div>
          )}
        </div>
        <div>
          <Input
            type="text"
            id="time"
            placeholder="Example: 00:00 PM"
            {...register("time")}
          />
          {errors?.time?.message && (
            <div className="text-red-500 text-sm">{errors.time.message}</div>
          )}
        </div>
        <div>
          {/* <Controller
            name="regFeeStatus"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Registration Fee Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="PAID">PAID</SelectItem>
                </SelectContent>
              </Select>
            )}
          /> */}
          <Input
            type="text"
            id="regFeeStatus"
            placeholder="Registration Fee: PENDING | PAID"
            defaultValue={"PENDING"}
            // value={data?.regFeeStatus}
            {...register("regFeeStatus")}
          />
          {errors?.regFeeStatus?.message && (
            <div className="text-red-500 text-sm">
              {errors.regFeeStatus.message}
            </div>
          )}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-3 gap-6">
        <div>
          <Input
            type="text"
            id="firstName"
            placeholder="First Name"
            // value={data?.patient.firstName}
            {...register("firstName")}
          />
          {errors?.firstName?.message && (
            <div className="text-red-500 text-sm">
              {errors.firstName.message}
            </div>
          )}
        </div>
        <div>
          <Input
            type="text"
            id="lastName"
            placeholder="Last Name"
            // value={data?.patient.lastName}
            {...register("lastName")}
          />
          {errors?.lastName?.message && (
            <div className="text-red-500 text-sm">
              {errors.lastName.message}
            </div>
          )}
        </div>
        <div>
          <Input
            type="text"
            id="email"
            placeholder="username@example.com"
            // value={data?.patient.email}
            {...register("email")}
          />
          {errors?.email?.message && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}
        </div>
        <div>
          <Input
            type="number"
            id="mobile"
            placeholder="0712345678"
            // value={data?.patient.mobile}
            {...register("mobile")}
          />
          {errors?.mobile?.message && (
            <div className="text-red-500 text-sm">{errors.mobile.message}</div>
          )}
        </div>
        <div>
          <Input
            type="text"
            id="address"
            placeholder="1/1, Colombo"
            // value={data?.patient.address}
            {...register("address")}
          />
          {errors?.address?.message && (
            <div className="text-red-500 text-sm">{errors.address.message}</div>
          )}
        </div>
        <div className="w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dob && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dob ? format(dob) : <span>Date of Birth</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dob}
                onSelect={setDob}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors?.date?.message && (
            <div className="text-red-500 text-sm">{errors.date.message}</div>
          )}
        </div>
      </div>

      <Button className="w-full font-bold text-md" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AppointmentForm;
