import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/home");
  } else {
    redirect("/login");
  }

  return null;
}
