import SiteProject from "./siteProject";
import MainWrapper from "@/app/(Main)/Main";

const page = () => {
  return (
    <MainWrapper>
      <div className="h-full w-full sm:mt-16 mt-12 bg-gray-50 relative overflow-y-auto lg:ml-64">
        <SiteProject />
      </div>
    </MainWrapper>
  );
};

export default page;
