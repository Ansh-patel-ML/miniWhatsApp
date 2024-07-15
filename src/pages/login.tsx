import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Enter valid email",
      required_error: "Email is required.",
    })
    .email({
      message: "Enter a valid email.",
    }),
  password: z
    .string({
      required_error: "Password id required.",
      invalid_type_error: "Enter valid password.",
    })
    .min(8, {
      message: "Password is too short minimum 8 character is required.",
    })
    .max(10, {
      message: "Password is too long maximum 10 character is allowed.",
    }),
});

interface loginFormI {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormI>({
    resolver: zodResolver(loginFormSchema),
  });

  console.log("errors", errors);

  return (
    <div className="flex justify-center items-center grow">
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl text-center">Login an account</h2>
          <p className="text-gray-400 text-center">
            Enter below information to login into your account.
          </p>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            console.log("data", data);
          })}
        >
          <div className="flex flex-col gap-3 justify-start">
            <div className="flex flex-col gap-2 justify-start max-w-lg">
              <Label htmlFor="email" className="text-neutral-400">
                Email
              </Label>
              <Input
                type="text"
                id="email"
                placeholder="Enter your email."
                {...register("email")}
                className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:border-0 ${!errors?.email ? "border-emerald-400 focus-visible:ring-emerald-400" : "border-rose-400 focus-visible:ring-rose-400"}`}
              />
              {errors?.email && (
                <p className="text-sm text-rose-400">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 justify-start max-w-lg">
              <Label htmlFor="password" className="text-neutral-400">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password."
                {...register("password")}
                className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:border-0 ${!errors?.password ? "border-emerald-400 focus-visible:ring-emerald-400" : "border-rose-400 focus-visible:ring-rose-400"}`}
              />
              {errors?.password && (
                <p className="text-sm text-rose-400">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
