import Image from "next/image";
import AuthForm from "@/app/(site)/AuthForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  // TODO: 인증 상태에 따라 로그인/회원가입 페이지를 보여주거나, 메인 페이지로 이동시키기

  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/users");
  }

  return (
    <main
      className={`flex min-h-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8`}
    >
      <div className={`sm:mx-auto sm:w-full sm:max-w-md`}>
        <Image
          src={`/images/logo.png`}
          alt={"Logo"}
          width={48}
          height={48}
          className={`mx-auto w-auto`}
        />
        <h2
          className={`mt-6 text-center text-3xl font-bold tracking-tight text-gray-900`}
        >
          로그인 후 이용해주세요.
        </h2>
      </div>
      <AuthForm />
    </main>
  );
}
