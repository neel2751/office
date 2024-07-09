import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavCard = () => {
  const { data } = useSession();
  return (
    data && (
      <Link href={"/Admin/Profile"}>
        <div className="inline-block sm:[--placement:right] hover:cursor-pointer">
          <div className="max-w-xs p-2 flex items-center gap-x-3 bg-white border border-gray-200 rounded-xl">
            <div className="bg-slate-200 text-slate-800 font-semibold text-sm inline-flex size-9 rounded-full items-center justify-center">
              <span>
                {data?.user?.name?.slice(0, 2).toLocaleUpperCase() || "AN"}
              </span>
            </div>

            {/* <!-- User Content --> */}
            <div className="grow">
              <h4 className="font-semibold text-sm text-gray-800">
                {data?.user?.name || "Anonymous"}
              </h4>
            </div>
          </div>
        </div>
      </Link>
    )
  );
};

export default NavCard;
