import getCurrentUser from "@/actions/getCurrentUser";
import DesktopSidebar from "@/components/wrapper/DesktopSidebar";
import MobileFooter from "@/components/wrapper/MobileFooter";

export default async function Wrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className={`h-full`}>
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className={`h-full lg:pl-20`}>{children}</main>
    </div>
  );
}
