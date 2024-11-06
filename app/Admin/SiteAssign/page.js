import SiteAssign from "./SiteAssign";
import MainWrapper from "@/app/(Main)/Main";

const page = () => {
  return (
    <MainWrapper>
      <div className="h-full w-full sm:mt-20 mt-12 relative overflow-y-auto lg:ml-64">
        <SiteAssign />
      </div>
    </MainWrapper>
  );
};

export default page;
