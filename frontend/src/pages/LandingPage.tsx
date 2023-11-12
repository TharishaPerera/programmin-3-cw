import { Button } from "@/components/ui/button";

const handleGetStarted = () => {
    // TODO: create initial data
    window.location.href = '/login';
}

const LandingPage = () => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl uppercase font-semibold">Create Initial Data and Login</h2>
      <Button onClick={handleGetStarted} className="py-6 px-10 text-lg uppercase font-semibold">Get Started</Button>
    </div>
  );
};

export default LandingPage;
