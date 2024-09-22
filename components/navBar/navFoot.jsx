import { signOut } from "next-auth/react";
import React from "react";

const NavFoot = ({ isOpen, data, setIsOpen }) => {
  return (
    <footer
      onClick={() => setIsOpen(!isOpen)}
      className="block border-gray-200 bg-white border-t bottom-0 left-0 right-0 absolute"
    >
      {/* <!-- Project Dropdown --> */}
      <div className="hs-dropdown relative flex [--auto-close:inside] ">
        {/* <!-- Project Button --> */}
        <button
          id="hs-pro-dnwpd"
          type="button"
          className="w-full items-center text-gray-800 align-middle text-start py-3 px-7 inline-flex focus:outline-none focus:bg-gray-100"
        >
          <svg
            className="flex-shrink-0 size-8"
            width="284"
            height="144"
            viewBox="0 0 284 144"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_468_359)">
              <path
                d="M103.343 143.494C111.263 138.787 118.629 133.525 124.832 126.824C130.979 120.234 136.13 112.812 139.84 104.228C140.893 104.173 141.945 104.062 142.942 104.007C149.975 103.896 157.064 104.339 164.042 103.563C182.042 101.625 194.447 83.349 190.404 65.2943C187.303 51.5596 174.897 41.0369 161.162 40.7046C154.406 40.5385 147.705 40.6493 140.726 40.6493C133.527 23.9238 122.173 11.0198 106.279 1.71555C107.22 1.49402 107.608 1.32788 107.995 1.32788C126.77 1.32788 145.489 0.829436 164.208 1.49402C183.094 2.15861 198.933 10.4659 211.726 24.8099C213.942 27.3021 215.88 30.0713 217.985 32.6742C211.173 45.1906 207.517 58.15 207.517 72.2725C207.517 86.395 211.062 99.3544 218.04 112.092C215.437 115.305 212.834 118.683 210.01 121.784C201.315 131.31 190.57 137.679 178.386 141.002C172.294 142.663 165.815 143.328 159.501 143.439C141.502 143.771 123.503 143.549 105.503 143.549C104.783 143.66 104.063 143.549 103.343 143.494Z"
                fill="#DD2428"
              />
              <path
                d="M284 1.16113V40.6487C274.53 41.1471 266.61 44.9131 260.574 52.2235C256.088 57.651 253.928 64.0199 253.485 71.2196C252.598 85.2867 263.453 103.286 283.945 104.283V143.272C267.109 144.324 242.408 135.297 227.51 113.476C210.508 88.665 211.449 56.6541 225.572 34.4458C239.196 12.9575 258.801 2.15801 284 1.16113Z"
                fill="#444750"
              />
              <path
                d="M137.957 63.9097H99.245C96.642 54.1625 90.8269 47.1289 82.0211 42.8091C75.6521 39.7077 68.8955 39.32 62.0281 40.8154C49.0133 43.6398 38.6568 57.0977 38.4353 71.3863C38.2138 85.1765 47.9056 98.3575 61.3081 102.013C69.3386 104.173 77.2582 103.342 84.5133 98.9667C91.6022 94.7023 96.4758 88.4994 98.968 80.4136H137.736C136.573 104.671 115.14 137.568 77.6459 142.165C37.6046 147.094 1.99379 116.301 0.110798 75.0416C-1.88296 33.2834 30.4049 -0.499785 71.3877 0.497095C110.432 1.49398 136.296 34.5572 137.957 63.9097Z"
                fill="#444750"
              />
            </g>
            <defs>
              <clipPath id="clip0_468_359">
                <rect
                  width="284"
                  height="143.218"
                  fill="white"
                  transform="translate(0 0.496094)"
                />
              </clipPath>
            </defs>
          </svg>
          <span className="block ms-3">
            <span className="block text-gray-800 font-medium text-sm">
              {data?.user?.name}
            </span>
            <span className="block text-gray-500 text-sm">
              cdc.construction
            </span>
          </span>
          <svg
            className="flex-shrink-0 size-3 ms-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 15 5 5 5-5"></path>
            <path d="m7 9 5-5 5 5"></path>
          </svg>
        </button>
        {/* <!-- End Project Button --> */}

        {/* <!-- Dropdown --> */}
        <div
          className={`${
            isOpen ? "opacity-100 block" : "opacity-0 hidden"
          } transition-[opacity,margin] duration block bg-white rounded-xl z-[80] shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)]`}
          style={{
            position: "fixed",
            inset: "auto auto 0px 0px",
            margin: "0px",
            transform: "translate3d(15px,-70px,0px)",
          }}
        >
          <div className="p-1 space-y-0.5">
            {/* <!-- Item --> */}
            <a
              className="py-2 block w-full text-start bg-gray-100 hover:bg-gray-200 rounded-lg px-2 focus:outline-none focus:bg-gray-100"
              href="#"
            >
              <div className="flex gap-x-2">
                <div className="self-center">
                  <svg
                    className="flex-shrink-0 items-center text-gray-500 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                  </svg>
                </div>
                <div className=" self-center -ms-1">
                  <svg
                    className="flex-shrink-0 items-center size-8"
                    width="284"
                    height="144"
                    viewBox="0 0 284 144"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_468_359)">
                      <path
                        d="M103.343 143.494C111.263 138.787 118.629 133.525 124.832 126.824C130.979 120.234 136.13 112.812 139.84 104.228C140.893 104.173 141.945 104.062 142.942 104.007C149.975 103.896 157.064 104.339 164.042 103.563C182.042 101.625 194.447 83.349 190.404 65.2943C187.303 51.5596 174.897 41.0369 161.162 40.7046C154.406 40.5385 147.705 40.6493 140.726 40.6493C133.527 23.9238 122.173 11.0198 106.279 1.71555C107.22 1.49402 107.608 1.32788 107.995 1.32788C126.77 1.32788 145.489 0.829436 164.208 1.49402C183.094 2.15861 198.933 10.4659 211.726 24.8099C213.942 27.3021 215.88 30.0713 217.985 32.6742C211.173 45.1906 207.517 58.15 207.517 72.2725C207.517 86.395 211.062 99.3544 218.04 112.092C215.437 115.305 212.834 118.683 210.01 121.784C201.315 131.31 190.57 137.679 178.386 141.002C172.294 142.663 165.815 143.328 159.501 143.439C141.502 143.771 123.503 143.549 105.503 143.549C104.783 143.66 104.063 143.549 103.343 143.494Z"
                        fill="#DD2428"
                      />
                      <path
                        d="M284 1.16113V40.6487C274.53 41.1471 266.61 44.9131 260.574 52.2235C256.088 57.651 253.928 64.0199 253.485 71.2196C252.598 85.2867 263.453 103.286 283.945 104.283V143.272C267.109 144.324 242.408 135.297 227.51 113.476C210.508 88.665 211.449 56.6541 225.572 34.4458C239.196 12.9575 258.801 2.15801 284 1.16113Z"
                        fill="#444750"
                      />
                      <path
                        d="M137.957 63.9097H99.245C96.642 54.1625 90.8269 47.1289 82.0211 42.8091C75.6521 39.7077 68.8955 39.32 62.0281 40.8154C49.0133 43.6398 38.6568 57.0977 38.4353 71.3863C38.2138 85.1765 47.9056 98.3575 61.3081 102.013C69.3386 104.173 77.2582 103.342 84.5133 98.9667C91.6022 94.7023 96.4758 88.4994 98.968 80.4136H137.736C136.573 104.671 115.14 137.568 77.6459 142.165C37.6046 147.094 1.99379 116.301 0.110798 75.0416C-1.88296 33.2834 30.4049 -0.499785 71.3877 0.497095C110.432 1.49398 136.296 34.5572 137.957 63.9097Z"
                        fill="#444750"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_468_359">
                        <rect
                          width="284"
                          height="143.218"
                          fill="white"
                          transform="translate(0 0.496094)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div className="grow">
                  <p className="text-sm text-gray-800 font-medium">
                    {data?.user?.role.toLowerCase() || "Admin"}
                  </p>
                  <p className="text-sm text-gray-500 ">cdc.construction</p>
                </div>
                <div className="ms-auto self-center">
                  <svg
                    className="flex-shrink-0 text-gray-800 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </a>
            {/* <!-- End Item --> */}
          </div>

          <div className="p-1 border-gray-200 border-t">
            <button
              type="button"
              className="w-full flex items-center hover:bg-gray-200 text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-3"
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              Add another project
            </button>
          </div>

          <div className="p-1 border-gray-200 border-t">
            <button
              onClick={() => signOut()}
              type="button"
              className="w-full flex items-center text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-2 hover:bg-gray-200"
            >
              Sign out
              <span className="ms-auto text-gray-500 text-xs">
                {data?.user?.email}
              </span>
            </button>
          </div>
        </div>
        {/* <!-- End Dropdown --> */}
      </div>
      {/* <!-- End Project Dropdown --> */}
    </footer>
  );
};

const FooterNav = ({ isOpen, setIsOpen, data }) => {
  return (
    <footer
      onClick={() => setIsOpen(!isOpen)}
      className="block border-gray-200 bg-white border-t bottom-0 left-0 right-0 absolute"
    >
      {/* <!-- Project Dropdown --> */}
      <div className="hs-dropdown relative flex [--auto-close:inside] ">
        {/* <!-- Project Button --> */}
        <button
          id="hs-pro-dnwpd"
          type="button"
          className="w-full items-center text-gray-800 align-middle text-start py-3 px-7 inline-flex focus:outline-none focus:bg-gray-100"
        >
          <svg
            className="flex-shrink-0 size-8"
            width="284"
            height="144"
            viewBox="0 0 284 144"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_468_359)">
              <path
                d="M103.343 143.494C111.263 138.787 118.629 133.525 124.832 126.824C130.979 120.234 136.13 112.812 139.84 104.228C140.893 104.173 141.945 104.062 142.942 104.007C149.975 103.896 157.064 104.339 164.042 103.563C182.042 101.625 194.447 83.349 190.404 65.2943C187.303 51.5596 174.897 41.0369 161.162 40.7046C154.406 40.5385 147.705 40.6493 140.726 40.6493C133.527 23.9238 122.173 11.0198 106.279 1.71555C107.22 1.49402 107.608 1.32788 107.995 1.32788C126.77 1.32788 145.489 0.829436 164.208 1.49402C183.094 2.15861 198.933 10.4659 211.726 24.8099C213.942 27.3021 215.88 30.0713 217.985 32.6742C211.173 45.1906 207.517 58.15 207.517 72.2725C207.517 86.395 211.062 99.3544 218.04 112.092C215.437 115.305 212.834 118.683 210.01 121.784C201.315 131.31 190.57 137.679 178.386 141.002C172.294 142.663 165.815 143.328 159.501 143.439C141.502 143.771 123.503 143.549 105.503 143.549C104.783 143.66 104.063 143.549 103.343 143.494Z"
                fill="#DD2428"
              />
              <path
                d="M284 1.16113V40.6487C274.53 41.1471 266.61 44.9131 260.574 52.2235C256.088 57.651 253.928 64.0199 253.485 71.2196C252.598 85.2867 263.453 103.286 283.945 104.283V143.272C267.109 144.324 242.408 135.297 227.51 113.476C210.508 88.665 211.449 56.6541 225.572 34.4458C239.196 12.9575 258.801 2.15801 284 1.16113Z"
                fill="#444750"
              />
              <path
                d="M137.957 63.9097H99.245C96.642 54.1625 90.8269 47.1289 82.0211 42.8091C75.6521 39.7077 68.8955 39.32 62.0281 40.8154C49.0133 43.6398 38.6568 57.0977 38.4353 71.3863C38.2138 85.1765 47.9056 98.3575 61.3081 102.013C69.3386 104.173 77.2582 103.342 84.5133 98.9667C91.6022 94.7023 96.4758 88.4994 98.968 80.4136H137.736C136.573 104.671 115.14 137.568 77.6459 142.165C37.6046 147.094 1.99379 116.301 0.110798 75.0416C-1.88296 33.2834 30.4049 -0.499785 71.3877 0.497095C110.432 1.49398 136.296 34.5572 137.957 63.9097Z"
                fill="#444750"
              />
            </g>
            <defs>
              <clipPath id="clip0_468_359">
                <rect
                  width="284"
                  height="143.218"
                  fill="white"
                  transform="translate(0 0.496094)"
                />
              </clipPath>
            </defs>
          </svg>
          <span className="block ms-3">
            <span className="block text-gray-800 font-medium text-sm">
              {data?.user?.name}
            </span>
            <span className="block text-gray-500 text-sm">
              cdc.construction
            </span>
          </span>
          <svg
            className="flex-shrink-0 size-3 ms-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 15 5 5 5-5"></path>
            <path d="m7 9 5-5 5 5"></path>
          </svg>
        </button>
        {/* <!-- End Project Button --> */}

        {/* <!-- Dropdown --> */}
        <div
          className={`${
            isOpen ? "opacity-100 block" : "opacity-0 hidden"
          } transition-[opacity,margin] duration block bg-white rounded-xl z-[80] shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)]`}
          style={{
            position: "fixed",
            inset: "auto auto 0px 0px",
            margin: "0px",
            transform: "translate3d(15px,-70px,0px)",
          }}
        >
          <div className="p-1 space-y-0.5">
            {/* <!-- Item --> */}
            <a
              className="py-2 block w-full text-start bg-gray-100 hover:bg-gray-200 rounded-lg px-2 focus:outline-none focus:bg-gray-100"
              href="#"
            >
              <div className="flex gap-x-2">
                <div className="self-center">
                  <svg
                    className="flex-shrink-0 items-center text-gray-500 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                  </svg>
                </div>
                <div className=" self-center -ms-1">
                  <svg
                    className="flex-shrink-0 items-center size-8"
                    width="284"
                    height="144"
                    viewBox="0 0 284 144"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_468_359)">
                      <path
                        d="M103.343 143.494C111.263 138.787 118.629 133.525 124.832 126.824C130.979 120.234 136.13 112.812 139.84 104.228C140.893 104.173 141.945 104.062 142.942 104.007C149.975 103.896 157.064 104.339 164.042 103.563C182.042 101.625 194.447 83.349 190.404 65.2943C187.303 51.5596 174.897 41.0369 161.162 40.7046C154.406 40.5385 147.705 40.6493 140.726 40.6493C133.527 23.9238 122.173 11.0198 106.279 1.71555C107.22 1.49402 107.608 1.32788 107.995 1.32788C126.77 1.32788 145.489 0.829436 164.208 1.49402C183.094 2.15861 198.933 10.4659 211.726 24.8099C213.942 27.3021 215.88 30.0713 217.985 32.6742C211.173 45.1906 207.517 58.15 207.517 72.2725C207.517 86.395 211.062 99.3544 218.04 112.092C215.437 115.305 212.834 118.683 210.01 121.784C201.315 131.31 190.57 137.679 178.386 141.002C172.294 142.663 165.815 143.328 159.501 143.439C141.502 143.771 123.503 143.549 105.503 143.549C104.783 143.66 104.063 143.549 103.343 143.494Z"
                        fill="#DD2428"
                      />
                      <path
                        d="M284 1.16113V40.6487C274.53 41.1471 266.61 44.9131 260.574 52.2235C256.088 57.651 253.928 64.0199 253.485 71.2196C252.598 85.2867 263.453 103.286 283.945 104.283V143.272C267.109 144.324 242.408 135.297 227.51 113.476C210.508 88.665 211.449 56.6541 225.572 34.4458C239.196 12.9575 258.801 2.15801 284 1.16113Z"
                        fill="#444750"
                      />
                      <path
                        d="M137.957 63.9097H99.245C96.642 54.1625 90.8269 47.1289 82.0211 42.8091C75.6521 39.7077 68.8955 39.32 62.0281 40.8154C49.0133 43.6398 38.6568 57.0977 38.4353 71.3863C38.2138 85.1765 47.9056 98.3575 61.3081 102.013C69.3386 104.173 77.2582 103.342 84.5133 98.9667C91.6022 94.7023 96.4758 88.4994 98.968 80.4136H137.736C136.573 104.671 115.14 137.568 77.6459 142.165C37.6046 147.094 1.99379 116.301 0.110798 75.0416C-1.88296 33.2834 30.4049 -0.499785 71.3877 0.497095C110.432 1.49398 136.296 34.5572 137.957 63.9097Z"
                        fill="#444750"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_468_359">
                        <rect
                          width="284"
                          height="143.218"
                          fill="white"
                          transform="translate(0 0.496094)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div className="grow">
                  <p className="text-sm text-gray-800 font-medium">
                    {data?.user?.role.toLowerCase() || "Admin"}
                  </p>
                  <p className="text-sm text-gray-500 ">cdc.construction</p>
                </div>
                <div className="ms-auto self-center">
                  <svg
                    className="flex-shrink-0 text-gray-800 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </a>
            {/* <!-- End Item --> */}
          </div>

          <div className="p-1 border-gray-200 border-t">
            <button
              type="button"
              className="w-full flex items-center hover:bg-gray-200 text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-3"
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              Add another project
            </button>
          </div>

          <div className="p-1 border-gray-200 border-t">
            <button
              type="button"
              className="w-full flex items-center text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-2 hover:bg-gray-200"
            >
              Sign out
              <span className="ms-auto text-gray-500 text-xs">
                {data?.user?.email}
              </span>
            </button>
          </div>
        </div>
        {/* <!-- End Dropdown --> */}
      </div>
      {/* <!-- End Project Dropdown --> */}
    </footer>
  );
};

export default NavFoot;
