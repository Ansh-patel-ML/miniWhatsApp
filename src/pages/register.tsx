import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import cx from "classnames";
import { registerAction } from "@/firebase/actions/register";

const registerFormSchema = z.object({
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
  name: z
    .string({
      invalid_type_error: "Enter valid name,",
      required_error: "Name is required.",
    })
    .min(8, {
      message: "Name is too short minimum 8 character is required.",
    })
    .max(10, {
      message: "Name is too long maximum 10 character is allowed.",
    }),
});

interface registerFormI {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<registerFormI>({
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <div className="flex justify-center items-center grow">
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl text-center">Create an account</h2>
          <p className="text-gray-400 text-center">
            Enter below information to create your account.
          </p>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            registerAction({
              email: data.email,
              password: data.password,
              username: data.name,
            });
          })}
        >
          <div className="flex flex-col gap-3 justify-start">
            <div className="flex flex-col gap-2 justify-start max-w-lg">
              <Label htmlFor="name" className="text-neutral-400">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name."
                {...register("name")}
                className={cx(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:border-0",
                  errors?.name && "border-rose-400 focus-visible:ring-rose-400",
                  !errors?.name &&
                    touchedFields?.name === true &&
                    "border-emerald-400 focus-visible:ring-emerald-400",
                )}
              />
              {errors?.name && (
                <p className="text-sm text-rose-400">{errors?.name?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 justify-start max-w-lg">
              <Label htmlFor="email" className="text-neutral-400">
                Email
              </Label>
              <Input
                type="text"
                id="email"
                placeholder="Enter your email."
                {...register("email")}
                className={cx(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:border-0",
                  errors?.email &&
                    "border-rose-400 focus-visible:ring-rose-400",
                  !errors?.email &&
                    touchedFields?.email === true &&
                    "border-emerald-400 focus-visible:ring-emerald-400",
                )}
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
                className={cx(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:border-0",
                  errors?.password &&
                    "border-rose-400 focus-visible:ring-rose-400",
                  !errors?.password &&
                    touchedFields?.password === true &&
                    "border-emerald-400 focus-visible:ring-emerald-400",
                )}
              />
              {errors?.password && (
                <p className="text-sm text-rose-400">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <Button type="submit" className="mt-3">
              Register your account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
