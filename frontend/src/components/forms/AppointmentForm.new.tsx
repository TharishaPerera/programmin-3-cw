import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { API_URL, appointmentTimes } from "@/config/config";
import { toast } from "sonner";

interface AppointmentProps {
  date?: Date;
  time?: string;
  dentist?: string,
  regFeeStatus?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  address?: string;
  dob?: Date;
}

interface DentistData {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  userType: string;
  specialization: string;
  qualification: string;
  password: string;
}

const AppointmentSchema = z.object({
  date: z.date({ required_error: "Appointment date is required." }),
  time: z.string({ required_error: "Appointment time is required." }),
  dentist: z.string({ required_error: "Dentist is required." }),
  regFeeStatus: z.string({
    required_error: "Registration fee status is required.",
  }),
  firstName: z.string({ required_error: "First name is required." }).min(1),
  lastName: z.string({ required_error: "Last name is required." }).min(1),
  email: z.string({ required_error: "Email is required." }).min(1).email(),
  mobile: z
    .string({ required_error: "Telephone number is required." })
    .min(10, "Telephone number must have 10 digits")
    .max(10, "Telephone number must have 10 digits"),
  address: z.string({ required_error: "Address is required." }).min(1),
  dob: z.date({ required_error: "Date of Birth is required." }),
});

const AppointmentFormNew: React.FC<AppointmentProps> = ({
  date,
  time,
  dentist,
  regFeeStatus,
  firstName,
  lastName,
  email,
  mobile,
  address,
  dob,
}) => {

  const [dentistData, setDentistData] = useState<DentistData[]>([]);

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      date: date ?? new Date(),
      time: time ?? "",
      dentist: dentist ?? "",
      regFeeStatus: regFeeStatus ?? "",
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      email: email ?? "",
      mobile: mobile ?? "",
      address: address ?? "",
      dob: dob ?? undefined,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/dentists");
        if (!response.ok) {
          toast.error("Something went wrong");
        }

        const result = await response.json();
        setDentistData(result);
      } catch (error) {
        console.log(error);
        toast.error("Error occurred when data fetching");
      }
    };

    fetchData();
  }, []);

  const [appointmentDate, setAppointmentDate] = useState(Date);

  function onSubmit(values: z.infer<typeof AppointmentSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="w-full">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "EEEE, d MMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <= new Date() || date <= new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Time</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the appointment time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-40">
                    {appointmentTimes.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dentist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dentist</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the dentist" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dentistData.map((item) => (
                      <SelectItem key={item.userId} value={item.userId.toString()}>
                        {item.firstName +" "+ item.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="regFeeStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Fee Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the Registration Fee Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="0714567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="No. 1, example, example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "EEEE, d MMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="w-full font-bold text-md" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentFormNew;
