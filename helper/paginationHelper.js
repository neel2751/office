import React from "react";

const PaginationHelper = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/10
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return (
    <div className="sticky bottom-0 right-0 flex items-center justify-between border-y border-gray-200  bg-white px-4 py-3 sm:px-6">
      {/*  */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center justify-between w-full">
        <div>
          <p className="text-sm text-gray-700">
            {/* Showing <span className="font-medium">{currentPage}</span> to{" "} */}
            {/* <span className="font-medium">{pages}</span> of{" "} */}
            <span className="font-medium">{items}</span> results
          </p>
        </div>

        {/* <!-- Pagination --> */}
        <nav class="flex items-center gap-x-1" aria-label="Pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
            class={`min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${
              currentPage === 1 && "cursor-not-allowed"
            }`}
            aria-label="Previous"
          >
            <svg
              class="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            <span class="sr-only">Previous</span>
          </button>
          <div class="flex items-center gap-x-1">
            {pages.map((page, index) => (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                type="button"
                class={`min-h-[38px] min-w-[38px] flex justify-center items-center  ${
                  page === currentPage
                    ? "border border-gray-200"
                    : "hover:bg-gray-100"
                } text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none`}
                aria-current="page"
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            type="button"
            class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            aria-label="Next"
            disabled={currentPage === pagesCount}
          >
            <span class="sr-only">Next</span>
            <svg
              class="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </nav>
        {/* <!-- End Pagination --> */}
      </div>
    </div>
  );
};

export default PaginationHelper;

//old working pagination
// {
//   <div className="flex flex-1 justify-between mb-4 sm:mb-0 sm:hidden">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => onPageChange(currentPage - 1)}
//           className="relative inline-flex items-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === pagesCount}
//           className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Next
//         </button>
//       </div>
/* <div className="rounded-md outline-none">
<nav
  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
  aria-label="Pagination"
>
  <button
    onClick={() => onPageChange(currentPage - 1)}
    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 border border-neutral-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 outline-none ${
      currentPage === 1 && "cursor-not-allowed opacity-50"
    }`}
    disabled={currentPage === 1}
  >
    <span className="sr-only">Previous</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  </button>
  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */
// }
// {pages.map((page, index) => (
//   <a
//     key={index}
//     onClick={() => onPageChange(page)}
//     //   href="#"
//     aria-current="page"
//     className={`relative z-10 inline-flex items-center hover:cursor-pointer
//     ${
//       page === currentPage
//         ? "bg-cyan-600 text-white"
//         : "text-neutral-600"
//     }
//       px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
//   >
//     {page}
//   </a>
// ))}
// <button
//   onClick={() => onPageChange(currentPage + 1)}
//   className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
//     currentPage === pagesCount && "cursor-not-allowed opacity-50"
//   }`}
//   disabled={currentPage === pagesCount}
// >
//   <span className="sr-only">Next</span>
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth="1.5"
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="m8.25 4.5 7.5 7.5-7.5 7.5"
//     />
//   </svg>
// </button>
// </nav>
// </div> */}
