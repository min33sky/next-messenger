import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileFooter from "@/components/sidebar/MobileFooter";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Sidebar() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
    </>
  );
}
