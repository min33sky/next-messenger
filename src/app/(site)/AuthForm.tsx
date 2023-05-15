"use client";

import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input";
import AuthSocialButton from "@/app/(site)/AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Button from "@/components/Button";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Variant = "Login" | "Register";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
  name: z.string().min(4), //? only for register
});

type AuthSchema = z.infer<typeof authSchema>;

export default function AuthForm() {
  const router = useRouter();
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
      try {
        setIsLoading(true);

        if (variant === "Register") {
          // 회원가입 요청
          await axios.post(`/api/register`, data);

          // 로그인 요청
          const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });

          if (res?.error) {
            alert(res.error);
          }

          if (res?.ok) {
            router.push(`/conversations`);
          }
        } else if (variant === "Login") {
          // 로그인 요청
          const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });

          if (res?.error) {
            toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
          }

          if (res?.ok) {
            router.push(`/conversations`);
          }
        }
      } catch (error: any) {
        console.log("Error: ", error.response.data.error);
        // TODO: 에러 처리 확실하게
        toast.error("같은 이메일이 존재합니다.");
      } finally {
        setIsLoading(false);
      }
    },
    [router, variant]
  );

  const socialAction = useCallback(
    async (action: "google" | "github") => {
      try {
        setIsLoading(true);

        const res = await signIn(action, {
          callbackUrl: "/conversations",
        });

        // TODO: 아래 코드 필요 없는듯???????????????????????????????????????????????????????????

        console.log("소셜 로그인 결과: ", res);

        if (res?.error) {
          toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
        }

        if (res?.ok) {
          router.push(`/conversations`);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

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
