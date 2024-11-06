import OfficeEmployee from "./OfficeEmployee";
import MainWrapper from "@/app/(Main)/Main";

const page = () => {
  return (
    <MainWrapper>
      <div className="h-full w-full sm:mt-16 mt-12 bg-gray-50 relative overflow-y-auto lg:ml-64 ">
        <OfficeEmployee />
      </div>
    </MainWrapper>
    // <AuthProvider>
    //   <NavBar />
    //   <div className="flex overflow-hidden bg-white pt-10">
    //     <SideBar />
    //     <div className="h-full w-full mt-5 bg-gray-50 relative overflow-y-auto lg:ml-64">
    //       <OfficeEmployee />
    //     </div>
    //   </div>
    // </AuthProvider>
  );
};

export default page;
