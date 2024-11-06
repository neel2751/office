import { XCircle } from "lucide-react";
import React from "react";

const Model = ({ isOpen, setIsOpen, cls, children }) => {
  return (
    // <div
    //   className={`${
    //     isOpen
    //       ? "flex items-center shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)]"
    //       : "hidden opacity-0"
    //   } overflow-x-hidden overflow-y-auto drop-shadow-2xl fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full`}
    //   id="add-user-modal"
    // >
    //   <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
    //     {/* <!-- Modal content --> */}
    //     <div className="bg-white rounded-lg shadow relative">
    //       <div className="flex items-center justify-between py-2 px-4 border-b rounded-t">
    //         <h3 className=" text-base text-black font-semibold">
    //           {id ? `Edit ${title.split(" ")[2]}` : `${title}` || "Title"}
    //         </h3>
    //         <button
    //           onClick={() => setIsOpen(false)}
    //           type="button"
    //           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
    //           data-modal-toggle="add-user-modal"
    //         >
    //           <svg
    //             className="w-5 h-5"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               fillRule="evenodd"
    //               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //               clipRule="evenodd"
    //             ></path>
    //           </svg>
    //         </button>
    //       </div>
    //       <div className="p-6 space-y-6">{children}</div>
    //     </div>
    //   </div>
    // </div>
    <div
      id="st-modal"
      className={`${
        isOpen ? "block shadow-2xl bg-gray-800/70 transition-all" : "hidden"
      } size-full fixed top-0 start-0 z-50 overflow-x-hidden overflow-y-auto `}
    >
      <div
        className={`duration-500 ease-out transition-all ${
          cls ? cls : "sm:max-w-lg"
        } sm:w-full m-3 sm:mx-auto ${
          isOpen
            ? "mt-20 opacity-100 duration-500"
            : "duration-500 opacity-0 mt-0"
        }`}
      >
        <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-visible">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute top-2 end-2"
          >
            <button
              type="button"
              className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
              data-hs-overlay="#hs-danger-alert"
            >
              <span className="sr-only">Close</span>
              <XCircle className="shrink-0 size-5 text-neutral-600" />
            </button>
          </div>
          {children}
          {/* <EmployeeCard employeeData={data} /> */}
        </div>
      </div>
    </div>
  );
};

export default Model;
