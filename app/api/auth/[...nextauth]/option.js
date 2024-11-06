import { LoginData, storeSession } from "@/actions/authAction.js/authAction";
import { connect } from "@/dbConfig/dbConfig";
import RoleModel from "@/models/roleModel";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g., 'Sign in with ...')
      id: "credentials",
      name: "Custom Sign In",
      credentials: {},
      async authorize(credentials, req) {
        // const ip = req.headers["x-forwarded-for"];
        // const device = req.headers["user-agent"] || "";
        const platform = req.headers["sec-ch-ua-platform"] || "";
        const isMobile = req.headers["sec-ch-ua-mobile"] === '"?1"';
        const browser = req.headers["sec-ch-ua"];

        try {
          if (!credentials || !credentials.email || !credentials.password) {
            return null; // Return null if credentials are invalid
          }
          const callbackUrl = req.query.callbackUrl || "/"; // Default to homepage if callbackUrl is not provided

          // const ip = req?.socket?.remoteAddress ?? "";
          // const ip = req.connection.remoteAddress;
          const { email, password } = credentials;
          // console.log(req.headers["user-agent"] || "");
          const response = await LoginData(email, password);
          if (response.status) {
            const newip = await axios.get("http://ip-api.com/json/");
            if (newip.status === 200) {
              const data = await storeSession({
                ...newip.data,
                ...response.data,
                platform,
                browser,
                device: isMobile ? "Mobile" : "Desktop",
              });
              if (!data.status) throw new Error(data.message);
              return { ...response.data, callbackUrl };
            }
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          throw new Error(error.message);
          // throw Error(error.message);
          // throw error;
        }
        // such as a user's IP address or location
        /* const ip = req.connection.remoteAddress;*/
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        (token.name = user.name),
          (token.email = user.email),
          (token.role = user.role);
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user._id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
};

async function login(credentials) {
  try {
    await connect();
    const user = await RoleModel.findOne({ roleEmail: credentials.email });
    if (!user) throw new Error("Email not found...");
    if (user.isActive === false)
      throw new Error("Your account has been deactivated");
    if (credentials.password !== user.rolePassword)
      throw new Error("Wrong password");
    delete user.rolePassword;
    user.isAdmin ? (user["role"] = "admin") : (user["role"] = "user");
    return user;
  } catch (err) {
    throw new Error("Invalid credentials");
  }
}
