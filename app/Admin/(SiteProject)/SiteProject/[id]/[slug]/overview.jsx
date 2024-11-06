"use client";
import { usePathname } from "next/navigation";
import SiteDetail from "../SiteDetail";
const Overview = () => {
  const pathName = usePathname();
  const segment = pathName.split("/");
  const id = segment[3];

  return (
    <div>
      <SiteDetail id={id} />
    </div>
  );
};

export default Overview;
