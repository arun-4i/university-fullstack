import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  } 
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
