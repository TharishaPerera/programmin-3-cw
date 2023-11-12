import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginSchema = z.object({
  email: z.string().min(1, "Please enter your email address").email(),
  password: z.string().min(1, "Please enter your password"),
});

type  LoginSchemaType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
    // TODO: pass data to API

    window.location.href = '/home';
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="text"
          id="email"
          placeholder="username@example.com"
          {...register("email")}
        />
        {errors?.email?.message && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
      </div>
      <div>
        <Input
          type="password"
          id="password"
          placeholder="**********"
          {...register("password")}
        />
        {errors?.password?.message && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}
      </div>
      <Button className="w-full font-bold text-md" type="submit">Submit</Button>
    </form>
  );
};

export default LoginForm;
