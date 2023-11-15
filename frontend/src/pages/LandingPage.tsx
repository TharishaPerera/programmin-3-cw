import { Button } from "@/components/ui/button";
import { API_URL, scheduleData, treatmentTypes } from "@/config/config";
import { toast } from "sonner";

const handleGetStarted = async () => {

  // set dentist data
  const dentistResponse = await fetch(API_URL + "/dentists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: "A.D.",
      lastName: "Ranasinghe",
      email: "dentist@toothcare.com",
      mobile: 712345678,
      userType: "DENTIST",
      specialization: "",
      qualification: "",
      password: "Toothcare@1234",
    }),
  });
  if (!dentistResponse.ok) {
    toast.error("Something went wrong while setting dentist data");
  }

  const dentist = await dentistResponse.json();

  // set schedule data
  scheduleData.map(async (item) => {
    item.dentist = dentist;
    const scheduleResponse = await fetch(API_URL + "/schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!scheduleResponse.ok) {
      toast.error("Something went wrong while setting schedule data");
    }
  });

  // set receptionist data
  const receptionistResponse = await fetch(API_URL + "/receptionists", {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: "Gayani",
      lastName: "Fernando",
      email: "reception@toothcare.com",
      mobile: 712345678,
      userType: "RECEPTIONIST",
      password: "Toothcare@1234"
    }),
  });
  if (!receptionistResponse.ok) {
    toast.error("Something went wrong while setting receptionist data");
  }

  // set treatment types data
  treatmentTypes.map(async (item) => {
    const treatmentTypeResponse = await fetch(API_URL + "/treatment-types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!treatmentTypeResponse.ok) {
      toast.error("Something went wrong while setting treatment types data");
    }
  });

  window.location.href = '/login';
};

const LandingPage = () => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl uppercase font-semibold">
        Create Initial Data and Login
      </h2>
      <Button
        onClick={handleGetStarted}
        className="py-6 px-10 text-lg uppercase font-semibold"
      >
        Get Started
      </Button>
    </div>
  );
};

export default LandingPage;
