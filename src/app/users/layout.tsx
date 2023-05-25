import getUsers from "@/actions/getUsers";
import UserList from "@/app/users/(components)/UserList";
import Wrapper from "@/components/wrapper/Wrapper";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //? 로그인한 유저를 제외한 모든 유저를 가져옴
  const users = await getUsers();

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Wrapper>
        <div className={`h-full`}>
          <UserList users={users} />
          {children}
        </div>
      </Wrapper>
    </>
  );
}
