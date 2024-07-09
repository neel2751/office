import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextUrl.pathname);
    // console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/Admin") &&
      req.nextauth.token.role != "superAdmin"
    ) {
      //   return NextResponse.rewrite(new URL("/Denied", req.url));
      return NextResponse.json({
        status: 401,
        message: "Not Allow",
      });
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// set all  routes to private by default and check the role in the callbacks section
/*
Example of how to redirect user based on roles

callbacks: {
  signIn: async (user, account, profile) => { return true },
  redirect: async (url, basePath, _session, _oidcResolver) => {
    if (_session.user.role === 'admin') { return '/admin' }
    if (_session.user.role === 'customer') { return '/customer' }
    return '/'
  },
}*/
// for all path is for admin no one can access is

export const config = { matcher: ["/Admin/:path*"] };
