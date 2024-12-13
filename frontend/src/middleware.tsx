import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  // if(!token && (req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/")) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  if (token &&(req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/")) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  return NextResponse.next();
};

export default middleware;
