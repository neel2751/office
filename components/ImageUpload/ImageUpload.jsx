import React, { useState } from "react";
import { toast } from "react-toastify";

const ImageUpload = ({ images, setImages, formRef }) => {
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
          [...files].some((file) => file.name === name)
        );
        if (data.length > 0) {
          return toast.warn("File already exists");
        } else {
          setImages((prev) => [...prev, ...data]); // add new files
        }
        // toast.warn("Same File will be replaced."); // warning toast
        // setImages(data);
      }

      if ([...images, ...Array.from(files)].length > 5) {
        // add first  3 images
        setImages([...images, ...Array.from(files)].slice(0, 5));
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
        // formRef.current.reset();
      }
    } catch (e) {
      toast.error("Something went wrong"); // error toast
      console.log(e);
    } finally {
      setUploading(false);
    }
  };
  async function handleDeleteImage(index) {
    const newFiles = images.filter((_, i) => i != index);
    setImages(newFiles);
  }
  return (
    <>
      <div className="w-full mx-auto p-4 pt-6">
        {/* <!-- Media Card --> */}
        <div className="flex shadow-sm rounded-xl overflow-hidden flex-col bg-white border-neutral-200 border">
          {/* <!-- Header --> */}
          <div className="flex items-center py-3 px-5 border-b gap-x-5 justify-between border-neutral-200">
            <h2 className="font-semibold inline-block text-neutral-800">
              Media
            </h2>

            <div className="flex items-center gap-x-2 justify-end"></div>
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
              <span className="hidden font-medium text-sm mb-2 text-neutral-600">
                Upload images
              </span>
              <div className="space-y-2 p-12 bg-white border-neutral-300 border-dashed border rounded-xl justify-center h-56 flex">
                <div className="text-center">
                  <svg
                    className="text-neutral-300 w-16 mx-auto"
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
                      className="dark:stroke-neutral-500"
                    ></path>
                    <path
                      d="M63.9483 9.36853L52.7869 7.5083V41.3608L57.6982 42.3947C60.9869 43.0871 64.203 40.9434 64.8292 37.6414L68.8568 16.4049C69.484 13.0978 67.2685 9.92191 63.9483 9.36853Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      className=" dark:stroke-neutral-500"
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
                      className=" dark:stroke-neutral-500"
                    ></rect>
                    <path
                      d="M47.9344 44.3772H22.0655C19.3041 44.3772 17.0656 42.1386 17.0656 39.3772L17.0656 35.9161L29.4724 22.7682L38.9825 33.7121C39.7832 34.6335 41.2154 34.629 42.0102 33.7025L47.2456 27.5996L52.9344 33.7209V39.3772C52.9344 42.1386 50.6958 44.3772 47.9344 44.3772Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="dark:stroke-neutral-500"
                    ></path>
                    <circle
                      cx="39.5902"
                      cy="14.9672"
                      r="4.16393"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="dark:stroke-neutral-500"
                    ></circle>
                  </svg>

                  <div className="text-neutral-800 leading-6 text-sm justify-center mt-4 flex flex-wrap">
                    <span className="text-neutral-900 font-medium pe-1">
                      Drop your files here or
                    </span>
                    <label
                      htmlFor="image"
                      className=" decoration-2 font-semibold bg-white text-cyan-600 rounded-lg relative cursor-pointer"
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

                  <p className="text-neutral-700 text-xs mt-1">
                    only pdfs files are allowed
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- End Drag 'n Drop --> */}
            <p className="space-y-4 text-neutral-500 text-xs pt-2">
              Add up to 5 documents .Each file should be no larger than 5MB. You
              can't drag and drop files into this area.
            </p>
          </div>
          {/* <!-- End Body --> */}
        </div>
        {/* <!-- End Media Card --> */}
      </div>
    </>
  );
};

const PhotoCard = ({ imgSrc, imgAlt, index, removeImage }) => {
  return (
    <div id={index} className="relative">
      <div className="rounded-xl overflow-hidden shrink-0 w-40 h-40 relative">
        <iframe
          style={{ border: "0px" }}
          src={imgSrc}
          width="100%"
          height="100%"
        />
        {/* <img
            className="object-cover rounded-xl size-full top-0 start-0 absolute"
            src={imgSrc}
            alt={imgAlt}
          /> */}
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
    </div>
  );
};

export default ImageUpload;
