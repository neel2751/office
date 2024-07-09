"use client";
import React, { useRef, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { handleRequestDocument } from "@/actions/documentUploadAction/documentUploadAction";
import Button from "../Button/button";
import { toast } from "react-toastify";
import EmployeDetail from "../EmployeDetail/EmployeDetail";

const FilterTableLine = () => {
  const formRef = useRef();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const allowedFileTypes = ["application/pdf"];

  const onChangeImages = async (e) => {
    try {
      let files = e.target.files;
      setUploading(true);

      if (
        [...allowedFileTypes.map((type) => type.toLowerCase())].indexOf(
          files[0]?.type.toLowerCase()
        ) == -1
      ) {
        return toast.error(`Only ${allowedFileTypes.join(", ")} are supported`);
      }

      if (images.length > 0) {
        const data = images.filter(({ name }) =>
          [...files].some((file) => file.name !== name)
        );
        console.log(data);
        if (data.length < 0) {
          toast.warn("Same File will be replaced."); // warning toast
        }
        setImages(data);
      }

      if ([...images, ...Array.from(files)].length > 3) {
        // add first  3 images
        setImages([...images, ...Array.from(files)].slice(0, 3));
        toast.error("You can only upload up to 3 images.");
      } else {
        const newFiles = [...files].filter((file) => {
          if (file.size < 1024 * 1024 * 5) {
            return file;
          } else {
            toast.error("File size should be less than 5MB"); // error toast
          }
        });
        setImages((prev) => [...newFiles, ...prev]);
        formRef.current.reset();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setUploading(false);
    }
  };
  async function handleDeleteImage(index) {
    const newFiles = images.filter((_, i) => i != index);
    setImages(newFiles);
  }

  const handleuploadUrl = () => {
    const url = prompt("Enter Image Url"); // prompt for image url
    if (url) {
      // if url is not empty
      // download the file
      fetch(url) // fetch the file
        .then((res) => res.blob()) // convert the response to blob
        .then((blob) => {
          // create a new file
          const file = new File([blob], "uploadUrl12345", {
            type: blob.type,
            size: blob.size, // size of the file
          }); // create a new file
          console.log(file); // log the file
          setImages((prev) => [...prev, file]); // add the file to the list of images
        }) // add the file to the list of images
        .catch((err) => console.error(err)); // catch any errors
    } else {
      // if url is empty
      toast.error("Please enter a valid URL"); // show error toast
    }
  };

  const handleSubmitDocuments = async () => {
    if (!images.length) return toast.error("Atleast one file select...");

    const bodyFormData = new FormData();
    images.forEach((file) => {
      bodyFormData.append("images", file);
    });
    // const res = await addProductLogo({ variables: { logos: images } });
    try {
      const employeId = 12345678; // dummy  employee id
      const response = await handleRequestDocument(bodyFormData, employeId);
      console.log("this is the response of data to chcek ", response.success);
      if (response.success === true) {
        toast.success("Document Uploaded Successfully"); // success toast
        // setLogoImages(response.data); // success toast
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="shadow-sm p-5 border-gray-200 border rounded-xl flex-col flex">
        {/* Nav Tab */}
        <nav className="flex relative">
          <button className=" text-neutral-800 text-sm py-1.5 px-2.5 rounded-lg gap-x-2 justify-center items-center inline-flex mb-2 relative after:bg-neutral-800 after:h-0.5 after:z-10 after:-bottom-2 after:inset-x-0 after:absolute after:pointer-events-none">
            All
          </button>
          <button className="space-x-1 text-neutral-600 text-sm py-1.5 px-2.5 rounded-lg gap-x-2 justify-center items-center inline-flex mb-2 relative after:bg-neutral-600 after:h-auto after:z-10 after:-bottom-0.5 after:inset-x-0 after:absolute after:pointer-events-none">
            Valid accounts
          </button>
          <button className="space-x-1 text-neutral-600 text-sm py-1.5 px-2.5 rounded-lg gap-x-2 justify-center items-center inline-flex mb-2 relative after:bg-neutral-600 after:h-auto after:z-10 after:-bottom-0.5 after:inset-x-0 after:absolute after:pointer-events-none">
            Invalid accounts
          </button>
        </nav>
        {/* Filter Group  */}
        <div className="space-y-4 md:gap-y-0 md:gap-x-5 md:grid-cols-2 gap-y-2 grid">
          {/* Search */}
          <div>
            <div className="relative">
              <div className="ps-3.5 items-center flex z-20 start-0 inset-y-0 absolute pointer-events-none">
                <svg
                  className="text-neutral-400 shrink-0 size-4"
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="text-sm ps-10 py-2 px-3 bg-gray-100 border-transparent rounded-lg w-full block"
                placeholder="Search"
              />
            </div>
          </div>
          {/*  Filter */}
          <div className=" gap-x-2 justify-end items-center flex">
            {/* Filter DropDown */}
            <div className="relative inline-flex group">
              <button
                type="button"
                className=" shadow-sm text-neutral-900 text-xs py-2 px-2.5 bg-white border-neutral-200 border rounded-lg gap-x-1.5 items-center inline-flex"
              >
                <svg
                  className="shrink-0 size-3.5 mt-0.5"
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
                  <path d="m3 16 4 4 4-4"></path>
                  <path d="M7 20V4"></path>
                  <path d="m21 8-4-4-4 4"></path>
                  <path d="M17 4v16"></path>
                </svg>
                Import/Export
                <svg
                  className="shrink-0 size-3.5"
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
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              {/* Dropdown start */}
              <div className="shadow-sm group-hover:opacity-100 opacity-0 rounded-xl w-40 hidden z-[80] transition-[opacity,margin] duration-300 group-hover:fixed group-hover:margin-0 group-hover:translate-y-9 group-hover:shadow-lg group-hover:block bg-white">
                <div className="p-1 bg-white rounded-xl">
                  <button
                    type="button"
                    className="text-neutral-900 text-sm py-1.5 px-2 rounded-lg gap-x-3 w-full flex hover:bg-neutral-200"
                  >
                    <svg
                      className="shrink-0 size-3.5 mt-0.5"
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                    Import
                  </button>
                  <button
                    type="button"
                    className="text-neutral-900 text-sm py-1.5 px-2 rounded-lg gap-x-3 w-full flex hover:bg-neutral-200"
                  >
                    <svg
                      className="shrink-0 size-3.5 mt-0.5"
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>
                    Export
                  </button>
                </div>
              </div>
            </div>
            {/* Download Dropdown */}
            <div className="relative inline-flex group">
              <button className=" shadow-sm text-neutral-800 text-xs py-2 px-2.5 bg-white border-neutral-200 border rounded-lg gap-x-1.5  items-center inline-flex">
                <svg
                  className="shrink-0 size-3.5"
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
                  <line x1="21" x2="14" y1="4" y2="4"></line>
                  <line x1="10" x2="3" y1="4" y2="4"></line>
                  <line x1="21" x2="12" y1="12" y2="12"></line>
                  <line x1="8" x2="3" y1="12" y2="12"></line>
                  <line x1="21" x2="16" y1="20" y2="20"></line>
                  <line x1="12" x2="3" y1="20" y2="20"></line>
                  <line x1="14" x2="14" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="10" y2="14"></line>
                  <line x1="16" x2="16" y1="18" y2="22"></line>
                </svg>
                Filter
                <span className="text-white leading-3 font-semibold text-xs py-0.5 px-1 bg-neutral-900 rounded-full">
                  5
                </span>
              </button>
              <div className="shadow-sm group-hover:opacity-100 opacity-0 rounded-xl w-40 hidden z-[80] transition-[opacity,margin] duration-300 group-hover:fixed group-hover:margin-0 group-hover:translate-y-9 -translate-x-6 group-hover:shadow-lg group-hover:block bg-white">
                <div className="p-1">
                  {[1, 2, 3, 4, 5, 6].map((key) => (
                    <button
                      key={key}
                      type="button"
                      className="text-neutral-800 text-sm py-2 px-3 rounded-lg gap-x-3 w-full flex hover:bg-neutral-200"
                    >
                      <UserCircleIcon className="shrink-0 size-4 mt-0.5" />
                      Name
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Table */}
        <div>
          {/* Start Table Tab Content */}
          <div role="tabpanel" className="pt-4">
            <div className="overflow-x-auto">
              <div className="min-w-full align-middle inline-flex">
                <table className="min-w-full divide-neutral-200 divide-x divide-y">
                  <thead>
                    <tr className="border-neutral-200 border-t divide-neutral-200 divide-x">
                      <th scope="col" className="text-start py-2.5 px-3">
                        <input
                          type="checkbox"
                          className="text-cyan-600 rounded-md bg-neutral-800 border-neutral-600 checked:bg-cyan-500 checked:border-cyan-500 focus:ring-offset-gray-800"
                        />
                      </th>
                      <th
                        scope="col"
                        className=" divide-x divide-neutral-200 min-w-64"
                      >
                        <div className="w-full inline-flex">
                          <p className="text-neutral-500 font-normal text-sm text-start py-2.5 px-5 gap-x-1 items-center w-full flex">
                            Name
                          </p>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className=" divide-x divide-neutral-200 min-w-64"
                      >
                        <div className="w-full inline-flex">
                          <p className="text-neutral-500 font-normal text-sm text-start py-2.5 px-5 gap-x-1 items-center w-full flex">
                            Address
                          </p>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className=" divide-x divide-neutral-200 min-w-64"
                      >
                        <div className="w-full inline-flex">
                          <p className="text-neutral-500 font-normal text-sm text-start py-2.5 px-5 gap-x-1 items-center w-full flex">
                            Address
                          </p>
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          {/* End Table Tab Content */}
        </div>
      </div>
      {/* Image Upload */}
      <form ref={formRef}>
        <div className="max-w-3xl w-full mx-auto p-4 pt-6">
          {/* <!-- Media Card --> */}
          <div className="flex shadow-sm rounded-xl overflow-hidden flex-col dark:bg-neutral-800 dark:border-neutral-700">
            {/* <!-- Header --> */}
            <div className="flex items-center py-3 px-5 border-b gap-x-5 justify-between dark:border-neutral-700">
              <h2 className="font-semibold inline-block dark:text-neutral-200">
                Media
              </h2>

              <div className="flex items-center gap-x-2 justify-end">
                <button
                  onClick={handleuploadUrl}
                  type="button"
                  className="shadow-sm text-neutral-200 font-medium text-sm py-2 px-2.5 bg-white border-neutral-200 border rounded-lg gap-x1.5  items-center inline-flex dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <svg
                    className="shrink-0 size-3.5"
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
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                    <path d="M12 12v9"></path>
                    <path d="m16 16-4-4-4 4"></path>
                  </svg>
                  Upload from URL
                </button>
              </div>
            </div>
            {/* <!-- End Header --> */}

            {/* <!-- Body --> */}
            <div className="p-5">
              {/* <!-- Grid --> */}
              <div className="md:grid-cols-4 grid grid-cols-2 gap-3">
                {/* <!-- Card --> */}
                {images.length > 0 &&
                  images.map((image, index) => (
                    <PhotoCard
                      key={index}
                      imgSrc={URL.createObjectURL(image)}
                      imgAlt={image.name}
                      removeImage={() => handleDeleteImage(index)}
                    />
                  ))}
                {/* <!-- End Card --> */}
              </div>
              {/* <!-- End Grid --> */}
              <input type="hidden" name="employeId" value="123456789" />
              {/* <!-- Drag 'n Drop --> */}
              <div className="space-y-4">
                <label className="hidden font-medium text-sm mb-2 dark:text-neutral-200">
                  Upload images
                </label>
                <div className="space-y-2 p-12 bg-white border-neutral-200 border-dashed border rounded-xl justify-center h-56 flex dark:bg-neutral-800 dark:border-neutral-600">
                  <div className="text-center">
                    <svg
                      className="text-neutral-300 w-16 mx-auto dark:text-neutral-400"
                      width="70"
                      height="46"
                      viewBox="0 0 70 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.05172 9.36853L17.2131 7.5083V41.3608L12.3018 42.3947C9.01306 43.0871 5.79705 40.9434 5.17081 37.6414L1.14319 16.4049C0.515988 13.0978 2.73148 9.92191 6.05172 9.36853Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="atub8 vkgpm dark:fill-neutral-800 dark:stroke-neutral-500"
                      ></path>
                      <path
                        d="M63.9483 9.36853L52.7869 7.5083V41.3608L57.6982 42.3947C60.9869 43.0871 64.203 40.9434 64.8292 37.6414L68.8568 16.4049C69.484 13.0978 67.2685 9.92191 63.9483 9.36853Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="atub8 vkgpm dark:fill-neutral-800 dark:stroke-neutral-500"
                      ></path>
                      <rect
                        x="17.0656"
                        y="1.62305"
                        width="35.8689"
                        height="42.7541"
                        rx="5"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="atub8 vkgpm dark:fill-neutral-800 dark:stroke-neutral-500"
                      ></rect>
                      <path
                        d="M47.9344 44.3772H22.0655C19.3041 44.3772 17.0656 42.1386 17.0656 39.3772L17.0656 35.9161L29.4724 22.7682L38.9825 33.7121C39.7832 34.6335 41.2154 34.629 42.0102 33.7025L47.2456 27.5996L52.9344 33.7209V39.3772C52.9344 42.1386 50.6958 44.3772 47.9344 44.3772Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="vkgpm dark:stroke-neutral-500"
                      ></path>
                      <circle
                        cx="39.5902"
                        cy="14.9672"
                        r="4.16393"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="vkgpm dark:stroke-neutral-500"
                      ></circle>
                    </svg>

                    <div className="text-neutral-800 leading-6 text-sm justify-center mt-4 flex flex-wrap">
                      <span className="text-neutral-900 font-medium pe-1 dark:text-neutral-200">
                        Drop your files here or
                      </span>
                      <label
                        htmlFor="image"
                        className=" decoration-2 font-semibold bg-white rounded-lg relative cursor-pointer  dark:bg-neutral-800 dark:text-cyan-500 dark:hover:text-cyan-600"
                      >
                        <span>browse</span>
                        <input
                          id="image"
                          type="file"
                          className=" sr-only"
                          name="image"
                          multiple
                          onChange={onChangeImages}
                          // all file type
                          //   accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .rar, .7z"
                          accept=".pdf"
                        />
                      </label>
                    </div>

                    <p className="text-neutral-700 text-xs mt-1 dark:text-neutral-400">
                      only pdfs files are allowed
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- End Drag 'n Drop --> */}

              <p className="space-y-4 text-neutral-600 text-sm dark:text-neutral-500">
                Add up to 10 documents . Each file should be no larger than
                10MB. You can also drag and drop files into this area.
              </p>

              <Button
                text={"Submit"}
                onclick={handleSubmitDocuments}
                cls={
                  "px-3 py-2 rounded-md bg-cyan-600 text-white font-semibold text-sm"
                }
              />
            </div>
            {/* <!-- End Body --> */}
          </div>
          {/* <!-- End Media Card --> */}
        </div>
      </form>

      <EmployeDetail />
    </>
  );
};

const PhotoCard = ({ imgSrc, imgAlt, index, removeImage }) => {
  return (
    <div id={index} className="relative">
      <div className="rounded-xl overflow-hidden shrink-0 w-full h-44 relative">
        <iframe src={imgSrc} width="100%" height="100%" />
        {/* <img
          className="object-cover rounded-xl size-full top-0 start-0 absolute"
          src={imgSrc}
          alt={imgAlt}
        /> */}
      </div>
      <div className="absolute z-10 top-2 end-2">
        <button
          onClick={removeImage}
          type="button"
          className=" shadow-sm text-neutral-800 font-medium text-sm bg-white border-neutral-200 border rounded-full gap-x-1.5 justify-center items-center size-7 inline-flex dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          <svg
            className="shrink-0 size-4 "
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
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FilterTableLine;
