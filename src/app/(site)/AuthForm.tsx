"use client";

import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input";
import AuthSocialButton from "@/app/(site)/AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Button from "@/components/Button";

type Variant = "Login" | "Register";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
  name: z.string().min(4), // only for register
});

type AuthSchema = z.infer<typeof authSchema>;

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>("Login");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(
      variant === "Register"
        ? authSchema
        : authSchema.pick({ email: true, password: true })
    ),
  });

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "Login" ? "Register" : "Login"));
  }, []);

  const onSubmit: SubmitHandler<AuthSchema> = useCallback(
    async (data) => {
      setIsLoading(true);

      alert(`${variant} 요청`);

      try {
        if (variant === "Register") {
          console.log("Register: ", data);
        } else if (variant === "Login") {
          console.log("Login: ", data);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    [variant]
  );

  const socialAction = useCallback((action: "google" | "github") => {
    setIsLoading(true);

    alert(`${action} 로그인`);

    //   TODO: 소셜 로그인 구현하기
  }, []);

  return (
    <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md`}>
      <div className={`bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10`}>
        <form className={`space-y-6`} onSubmit={handleSubmit(onSubmit)}>
          {variant === "Register" && (
            <Input
              register={register("name", {
                required: true,
              })}
              disabled={isLoading}
              id={`name`}
              label={`이름`}
              error={errors.name}
            />
          )}
          <Input
            register={register("email", {
              required: true,
            })}
            disabled={isLoading}
            id={`email`}
            label={`이메일`}
            error={errors.email}
          />
          <Input
            register={register("password", {
              required: true,
            })}
            disabled={isLoading}
            id={`password`}
            label={`비밀번호`}
            type={`password`}
            error={errors.password}
          />

          <div>
            <Button disabled={isLoading} fullWidth>
              {variant === "Login" ? "로그인" : "회원가입"}
            </Button>
          </div>
        </form>

        <div className={`mt-6`}>
          <div className={`relative`}>
            <div className={`absolute inset-0 flex items-center`}>
              <div className={`w-full border-t border-gray-300`}></div>
            </div>
            <div className={`relative flex justify-center text-sm`}>
              <span className={`bg-white px-2 text-gray-500`}>
                다른 방법으로 로그인하기
              </span>
            </div>
          </div>

          <div className={`mt-6 flex gap-2`}>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
          <div>
            {variant === "Register"
              ? "이미 계정이 있으신가요?"
              : "계정이 없으신가요?"}
          </div>
          <div onClick={toggleVariant} className="cursor-pointer underline">
            {variant === "Register" ? "로그인" : "회원가입"}
          </div>
        </div>
      </div>
    </div>
  );
}
