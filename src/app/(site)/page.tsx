import Image from "next/image";

export default function Home() {
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
      {/*  Auth Form Component  */}
    </main>
  );
}
