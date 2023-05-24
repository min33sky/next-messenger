import Sidebar from "@/components/sidebar/Sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Sidebar />
      {children}
    </>
  );
}
