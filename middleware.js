import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { MENU } from "./data/data";

// export default withAuth(
//   function middleware(req) {
//     if (
//       req.nextUrl.pathname.startsWith("/Admin") &&
//       req.nextauth.token.role !== "superAdmin"
//     ) {
//       //   return NextResponse.rewrite(new URL("/Denied", req.url));

//       return NextResponse.json({
//         status: 401,
//         message: "Not Allow",
//       });
//     }
//   },

//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

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

// export const config = { matcher: ["/Admin/:path*"] };

function checkRoleMiddleware(req) {
  const userRole = req.nextauth.token?.role;
  const requestedPath = req.nextUrl.pathname;

  // Allow superAdmin role to access everything
  if (userRole === "superAdmin") {
    return NextResponse.next();
  }

  // Find the exact menu item matching the requested path
  const menuItem = MENU.find(
    (item) =>
      (requestedPath.startsWith(item.path) && requestedPath === item.path) ||
      requestedPath.startsWith(`${item.path}/`)
  );
  // If no menu item is found for the requested path, return 401 Unauthorized response
  if (!menuItem) {
    return NextResponse.json(
      {
        status: 401,
        message: "Not Allow - Path not found",
      },
      { status: 401 }
    );
  }

  // If the user's role is not authorized for the menu item, return 401 Unauthorized response

  if (!menuItem.role.includes(userRole)) {
    return NextResponse.json(
      {
        status: 401,
        message: "Not Allow - Unauthorized role",
      },
      { status: 401 }
    );
  }

  // If the user is authorized, allow the request to continue
  return NextResponse.next();
}

export default withAuth(checkRoleMiddleware, {
  callbacks: {
    authorized: ({ token }) =>
      // Authorize if the user's role is present in any of the roles in MENU
      MENU.some((item) => item.role.includes(token?.role)),
  },
});

export const config = { matcher: ["/Admin/:path*"] };
