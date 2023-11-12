import LoginForm from "@/components/forms/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <>
      <Card className="py-6" >
        <CardHeader className="flex justify-center text-center">
          <CardTitle>LOGIN</CardTitle>
          <CardDescription>Enter your email and password to login to ToothCare Application</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
