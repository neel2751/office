import DashBoard from "./Admin/(DashBoard)/DashBoard";
import Main from "./(Main)/Main";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import ChnagePassword from "@/components/ChangePassword/ChnagePassword";
import RoleTypeProvider from "@/context/RoleTypeProvider";
import EmptyState from "@/components/EmptyState/EmptyState";
import { AdminProvider } from "@/context/UserContext";

export default async function Home() {
  const session = await getServerSession(options);
  // console.log("this is come from home page main", session);
  if (!session) redirect(`/auth`);

  return (
    <Main>
      <div className="h-full w-full mt-16 bg-gray-50 relative overflow-y-auto lg:ml-64">
        <DashBoard />
        {/* <ChnagePassword /> */}
      </div>
    </Main>
    // <AuthProvider>
    //   <PageContent />
    // </AuthProvider>
  );
}

const PageContent = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/auth?callbackUrl=${process.env.NEXTAUTH_URL}`);
    },
  });
  return (
    <Main>
      <div className="h-full w-full mt-16 bg-gray-50 relative overflow-y-auto lg:ml-64">
        <DashBoard />
      </div>
    </Main>
  );
};
